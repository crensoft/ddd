/// <reference types="koa__router" />
/// <reference types="node" />
/// <reference types="pino-http" />
import Koa from "koa";
import Router from "@koa/router";
import { ValueObject } from "../value-object";
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
export declare class Service extends ValueObject<IService> {
    static PORT: number;
    dependencies: Promise<boolean>[];
    private constructor();
    ready(): Promise<boolean[]>;
    toValue(): string;
    get name(): string;
    get app(): Koa<Koa.DefaultState, Koa.DefaultContext>;
    get router(): Router<any, {}>;
    toString(): string;
    toJSON(): string;
    useRoutes(): void;
    listen(port?: number | string): import("http").Server;
    /**
     * Starts service.
     * Alias for
     * ```
     * await mySvc.ready();
     * mySvc.useRoutes();
     * mySvc.listen();
     * ```
     */
    start({ port }?: {
        port?: number | string;
    }): Promise<import("http").Server>;
    static create(conf: Pick<IService, "name"> & Partial<IService>): Service;
}
