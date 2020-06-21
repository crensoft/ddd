"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const value_object_1 = require("./value-object");
/**
 * Manages Service API Server
 */
class Service extends value_object_1.ValueObject {
    constructor(props) {
        super(props);
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
        this.app.listen({ port: Service.PORT }, () => console.log(`🚀 ${this.name} Service ready at http://localhost:4000`));
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