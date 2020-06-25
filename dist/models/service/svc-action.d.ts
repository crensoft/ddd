/// <reference types="koa__router" />
import Router from "@koa/router";
import { ValueObject } from "../value-object";
interface ISvcAction {
    name: string;
    method: "get" | "post" | "delete" | "put" | "event";
    handler: (ctx: any) => void;
}
export declare class SvcAction extends ValueObject<ISvcAction> {
    static ACTION_DIR: string;
    private constructor();
    get method(): "get" | "post" | "delete" | "put" | "event";
    get handler(): (ctx: any) => void;
    get name(): string;
    /**
     * Register Action to either Router or Events depending on "method"
     */
    register(router: Router): void;
    private static assertValid;
    static create(conf: Pick<ISvcAction, "handler" | "method" | "name"> & Partial<ISvcAction>): SvcAction;
    protected static _generateName(filePath: string): string;
    static registerSvcActions: (router: Router) => Promise<boolean>;
}
export {};
