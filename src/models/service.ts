import Koa from "koa";
import Router from "@koa/router";
import { ValueObject } from "./value-object";
// import { log } from "console";

interface IService {
  readonly name: string;
  readonly app: Koa;
  readonly router: Router;
}

/**
 * Manages Service API Server
 */
export class Service extends ValueObject<IService> {
  static PORT = 4000;

  private constructor(props: Partial<IService>) {
    super(props as any);

    // this.app.use(async (ctx) => {
    //   ctx.body = `Hi from ${this.name} Service`;
    // });

    // this.app.on("error", (err) => {
    //   log("server error", err);
    // });
  }

  toValue() {
    return this.props.name;
  }

  get name() {
    return this.props.name;
  }

  get app() {
    return this.props.app;
  }

  get router() {
    return this.props.router;
  }

  toString() {
    return this.props.name;
  }

  toJSON() {
    return this.props.name;
  }

  useRoutes() {
    this.app.use(this.router.routes());
  }

  listen() {
    this.app.listen({ port: Service.PORT }, () =>
      console.log(`🚀 ${this.name} Service ready at http://localhost:4000`)
    );
  }

  public static create(conf: Pick<IService, "name"> & Partial<IService>) {
    return new Service({
      name: conf.name,
      app: conf.app || new Koa(),
      router: conf.router || new Router(),
    });
  }
}
