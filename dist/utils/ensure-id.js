"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
/**
 * Ensure value is an Identifier object
 */
function ensureId(val) {
    if (val === undefined || val === null) {
        // return undefined
        return val;
    }
    return val instanceof __1.Identifier ? val : new __1.Identifier(val);
}
exports.ensureId = ensureId;
//# sourceMappingURL=ensure-id.js.map