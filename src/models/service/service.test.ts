import fse from "fs-extra";
import path from "path";
import request from "supertest";
import getPort from "get-port";
import { Service } from "./service";

const mockSvc = {
  name: "MyTestSvc",
};

const actionDir = path.join(__dirname, "actions");

// remove Action Directory
const cleanUp = async () => {
  await fse.emptyDir(actionDir);
  return fse.rmdir(actionDir);
};

describe("Service Model", () => {
  it("should create service", async () => {
    const svc = Service.create({
      name: mockSvc.name,
    });

    await svc.ready();

    expect(svc.name).toBe(mockSvc.name);
  });
});

describe("Service Action", () => {
  it("should create service actions", async () => {
    // set up a test "actions" directory
    await fse.ensureDir(actionDir);
    await fse
      .writeFile(
        path.join(actionDir, "mytest.action.js"),
        `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = "get";
exports.handler = (ctx) => {
  return new Promise((res) => {
    ctx.status = 202;
    ctx.body = { msg: "testing!" };
    res();
  });
};
`
      )
      .catch(cleanUp);

    // create and start service
    const svc = Service.create({
      name: mockSvc.name,
    });

    const port = await getPort();
    const server = await svc.start({ port });

    // start testing
    const res = await request(server).get("/ddd/mytest").expect(202);
    if (!res) {
      throw new Error("Expected res");
    }
    expect(res.body.msg).toBe("testing!");
  });
});

afterAll(() => {
  return cleanUp();
});
