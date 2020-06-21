/// <reference types="koa__router" />
import Koa from "koa";
import Router from "@koa/router";
import { ValueObject } from "./value-object";
interface IService {
    readonly name: string;
    readonly app: Koa;
    readonly router: Router;
}
/**
 * Manages Service API Server
 */
export declare class Service extends ValueObject<IService> {
    static PORT: number;
    private constructor();
    toValue(): string;
    get name(): string;
    get app(): Koa<Koa.DefaultState, Koa.DefaultContext>;
    get router(): Router<any, {}>;
    toString(): string;
    toJSON(): string;
    useRoutes(): void;
    listen(): void;
    static create(conf: Pick<IService, "name"> & Partial<IService>): Service;
}
export {};
