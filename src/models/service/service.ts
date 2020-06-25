import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";
import logger from "koa-pino-logger";
import { ValueObject } from "../value-object";
import { SvcAction } from "./svc-action";
// import { log } from "console";

export interface IService {
  readonly name: string;
  readonly app: Koa;
  readonly router: Router;
}

/**
 * Manages Service API Server
 * ```
 * const mySvc = Service.create({
 *  name: 'myDomain/mySvc'
 * })
 *
 * // Wait for dependencies to be set up:
 * await mySvc.ready();
 *
 * // Use registered routes
 * mySvc.useRoutes();
 *
 * // Listen for requests
 * mySvc.listen();
 *
 * ```
 */
export class Service extends ValueObject<IService> {
  static PORT = 4000;
  dependencies: Promise<boolean>[] = [];

  private constructor(props: Partial<IService>) {
    super(props as any);

    // this.app.use(async (ctx) => {
    //   ctx.body = `Hi from ${this.name} Service`;
    // });

    // this.app.on("error", (err) => {
    //   log("server error", err);
    // });
    this.app.use(koaBody());
    this.app.use(logger());
    this.dependencies.push(SvcAction.registerSvcActions(this.router));
  }

  public ready() {
    return Promise.all(this.dependencies);
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
    this.app.use(this.router.allowedMethods());
  }

  listen(port?: number | string) {
    return this.app.listen({ port: port || Service.PORT }, () =>
      console.log(
        `🚀 ${this.name} Service ready at http://localhost:${
          port || Service.PORT
        }`
      )
    );
  }

  /**
   * Starts service.
   * Alias for
   * ```
   * await mySvc.ready();
   * mySvc.useRoutes();
   * mySvc.listen();
   * ```
   */
  async start({ port }: { port?: number | string } = {}) {
    await this.ready();
    this.useRoutes();
    return this.listen(port);
  }

  public static create(conf: Pick<IService, "name"> & Partial<IService>) {
    return new Service({
      name: conf.name,
      app: conf.app || new Koa(),
      router: conf.router || new Router(),
    });
  }
}
