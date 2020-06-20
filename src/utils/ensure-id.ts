import { Identifier } from "../models/identifier";

/**
 * Ensure value is an Identifier object
 */
export function ensureId(
  val: string | number | undefined | Identifier<any>
): Identifier<any> {
  if (val === undefined || val === null) {
    // return undefined
    return val as any;
  }
  return val instanceof Identifier ? val : new Identifier(val);
}
