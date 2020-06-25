"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.svcName = void 0;
const path_1 = require("path");
const app_root_path_1 = __importDefault(require("app-root-path"));
/**
 * Get service name from directory structure
 */
exports.svcName = () => `${path_1.basename(app_root_path_1.default.path).replace("-", "/")}`;
//# sourceMappingURL=svc-name.js.map