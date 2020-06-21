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
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const value_object_1 = require("./value-object");
const console_1 = require("console");
/**
 * Manages Service API Server
 */
class Service extends value_object_1.ValueObject {
    constructor(props) {
        super(props);
        this.app.use((ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = `Hi from ${this.name} Service`;
        }));
        this.app.on("error", (err) => {
            console_1.log("server error", err);
        });
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