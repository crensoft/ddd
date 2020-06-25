"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureId = void 0;
const identifier_1 = require("../models/identifier");
/**
 * Ensure value is an Identifier object
 */
function ensureId(val) {
    if (val === undefined || val === null) {
        // return undefined
        return val;
    }
    return val instanceof identifier_1.Identifier ? val : new identifier_1.Identifier(val);
}
exports.ensureId = ensureId;
//# sourceMappingURL=ensure-id.js.map