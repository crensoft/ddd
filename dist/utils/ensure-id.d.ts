import { Identifier } from "../models/identifier";
/**
 * Ensure value is an Identifier object
 */
export declare function ensureId(val: string | number | undefined | Identifier<any>): Identifier<any>;
