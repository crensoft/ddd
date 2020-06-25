"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SvcAction = void 0;
const path_1 = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const await_to_js_1 = __importDefault(require("await-to-js"));
const chalk_1 = __importDefault(require("chalk"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const value_object_1 = require("../value-object");
const svc_name_1 = require("../../utils/svc-name");
class SvcAction extends value_object_1.ValueObject {
    constructor(props) {
        super(props);
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
    register(router) {
        if (/^(get|post|delete|put)$/i.test(this.method)) {
            router[this.method](`/${this.name}`, this.handler);
        }
        else {
            throw new Error(`Unknown action method: "${this.method}"`);
        }
    }
    static create(conf) {
        SvcAction.assertValid(conf);
        return new SvcAction({
            name: conf.name,
            handler: conf.handler,
            method: conf.method,
        });
    }
    static _generateName(filePath) {
        return `${svc_name_1.svcName()}/${path_1.basename(filePath).split(".action.js")[0]}`;
    }
}
exports.SvcAction = SvcAction;
SvcAction.ACTION_DIR = process.env.NODE_ENV === "test"
    ? path_1.default.join(__dirname, "actions")
    : path_1.default.join(app_root_path_1.default.toString(), path_1.basename(path_1.default.join(require.main.filename, "..")), "actions");
SvcAction.assertValid = (action) => {
    if (action.method === undefined) {
        throw new Error('Expected actionMethod to be set when using actionType of "route"');
    }
};
SvcAction.registerSvcActions = (router) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield fs_extra_1.default.pathExists(SvcAction.ACTION_DIR).catch((e) => {
        throw e;
    }))) {
        console.log(chalk_1.default.cyan(`ACTIONS directory not found at "${SvcAction.ACTION_DIR}". Skipping...`));
        return false;
    }
    const [filesErr, files] = yield await_to_js_1.default(fs_extra_1.default.readdir(SvcAction.ACTION_DIR));
    if (filesErr) {
        throw filesErr;
    }
    if (!files || !files.length) {
        console.log(chalk_1.default.cyan("No actions found. Skipping..."));
        return false;
    }
    files
        .filter((fileName) => /^[\w|-]+\.action\.js$/.test(fileName))
        .forEach((file) => {
        const filePath = path_1.default.join(SvcAction.ACTION_DIR, file);
        const action = SvcAction.create(Object.assign({ name: SvcAction._generateName(filePath) }, require(filePath)));
        action.register(router);
    });
    return true;
});
//# sourceMappingURL=svc-action.js.map