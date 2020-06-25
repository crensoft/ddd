import path, { basename } from "path";
import Router from "@koa/router";
import fse from "fs-extra";
import to from "await-to-js";
import chalk from "chalk";
import appRoot from "app-root-path";
import { ValueObject } from "../value-object";
import { svcName } from "../../utils/svc-name";

interface ISvcAction {
  name: string;
  method: "get" | "post" | "delete" | "put" | "event";
  handler: (ctx: any) => void;
}

export class SvcAction extends ValueObject<ISvcAction> {
  static ACTION_DIR =
    process.env.NODE_ENV === "test"
      ? path.join(__dirname, "actions")
      : path.join(
          appRoot.toString(),
          basename(path.join((require as any).main.filename, "..")),
          "actions"
        );

  private constructor(props: Partial<ISvcAction>) {
    super(props as any);
  }

  get method() {
    return this.props.method;
  }

  get handler() {
    return this.props.handler;
  }

  get name() {
    return this.props.name;
  }

  /**
   * Register Action to either Router or Events depending on "method"
   */
  public register(router: Router) {
    if (/^(get|post|delete|put)$/i.test(this.method)) {
      router[this.method as "get" | "post" | "delete" | "put"](
        `/${this.name}`,
        this.handler
      );
    } else {
      throw new Error(`Unknown action method: "${this.method}"`);
    }
  }
  private static assertValid = (action: Partial<ISvcAction>) => {
    if (action.method === undefined) {
      throw new Error(
        'Expected actionMethod to be set when using actionType of "route"'
      );
    }
  };

  public static create(
    conf: Pick<ISvcAction, "handler" | "method" | "name"> & Partial<ISvcAction>
  ) {
    SvcAction.assertValid(conf);

    return new SvcAction({
      name: conf.name,
      handler: conf.handler,
      method: conf.method,
    });
  }

  protected static _generateName(filePath: string) {
    return `${svcName()}/${basename(filePath).split(".action.js")[0]}`;
  }

  public static registerSvcActions = async (router: Router) => {
    if (
      !(await fse.pathExists(SvcAction.ACTION_DIR).catch((e) => {
        throw e;
      }))
    ) {
      console.log(
        chalk.cyan(
          `ACTIONS directory not found at "${SvcAction.ACTION_DIR}". Skipping...`
        )
      );
      return false;
    }

    const [filesErr, files] = await to(fse.readdir(SvcAction.ACTION_DIR));

    if (filesErr) {
      throw filesErr;
    }

    if (!files || !files.length) {
      console.log(chalk.cyan("No actions found. Skipping..."));
      return false;
    }

    files
      .filter((fileName) => /^[\w|-]+\.action\.js$/.test(fileName))
      .forEach((file) => {
        const filePath = path.join(SvcAction.ACTION_DIR, file);
        const action = SvcAction.create({
          name: SvcAction._generateName(filePath),
          ...require(filePath),
        });
        action.register(router);
      });

    return true;
  };
}
