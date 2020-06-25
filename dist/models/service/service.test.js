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
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const get_port_1 = __importDefault(require("get-port"));
const service_1 = require("./service");
const mockSvc = {
    name: "MyTestSvc",
};
const actionDir = path_1.default.join(__dirname, "actions");
// remove Action Directory
const cleanUp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_extra_1.default.emptyDir(actionDir);
    return fs_extra_1.default.rmdir(actionDir);
});
describe("Service Model", () => {
    it("should create service", () => __awaiter(void 0, void 0, void 0, function* () {
        const svc = service_1.Service.create({
            name: mockSvc.name,
        });
        yield svc.ready();
        expect(svc.name).toBe(mockSvc.name);
    }));
});
describe("Service Action", () => {
    it("should create service actions", () => __awaiter(void 0, void 0, void 0, function* () {
        // set up a test "actions" directory
        yield fs_extra_1.default.ensureDir(actionDir);
        yield fs_extra_1.default
            .writeFile(path_1.default.join(actionDir, "mytest.action.js"), `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = "get";
exports.handler = (ctx) => {
  return new Promise((res) => {
    ctx.status = 202;
    ctx.body = { msg: "testing!" };
    res();
  });
};
`)
            .catch(cleanUp);
        // create and start service
        const svc = service_1.Service.create({
            name: mockSvc.name,
        });
        const port = yield get_port_1.default();
        const server = yield svc.start({ port });
        // start testing
        const res = yield supertest_1.default(server).get("/ddd/mytest").expect(202);
        if (!res) {
            throw new Error("Expected res");
        }
        expect(res.body.msg).toBe("testing!");
    }));
});
afterAll(() => {
    return cleanUp();
});
//# sourceMappingURL=service.test.js.map