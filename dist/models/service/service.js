"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_pino_logger_1 = __importDefault(require("koa-pino-logger"));
const value_object_1 = require("../value-object");
const svc_action_1 = require("./svc-action");
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
class Service extends value_object_1.ValueObject {
    constructor(props) {
        super(props);
        this.dependencies = [];
        // this.app.use(async (ctx) => {
        //   ctx.body = `Hi from ${this.name} Service`;
        // });
        // this.app.on("error", (err) => {
        //   log("server error", err);
        // });
        this.app.use(koa_body_1.default());
        this.app.use(koa_pino_logger_1.default());
        this.dependencies.push(svc_action_1.SvcAction.registerSvcActions(this.router));
    }
    ready() {
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
    listen(port) {
        return this.app.listen({ port: port || Service.PORT }, () => console.log(`🚀 ${this.name} Service ready at http://localhost:${port || Service.PORT}`));
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
    start({ port } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ready();
            this.useRoutes();
            return this.listen(port);
        });
    }
    static create(conf) {
        return new Service({
            name: conf.name,
            app: conf.app || new koa_1.default(),
            router: conf.router || new router_1.default(),
        });
    }
}
exports.Service = Service;
Service.PORT = 4000;
//# sourceMappingURL=service.js.map