"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
class Identifier {
    constructor(value) {
        this.value = value;
    }
    equals(id) {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return this.value === id;
        }
        return id.toValue() === this.value;
    }
    toString() {
        return this.value;
        // const constructorName = this.constructor.name;
        // return `${constructorName}(${String(this.value)})`;
    }
    toJSON() {
        return this.value;
    }
    /**
     * Return raw value of identifier
     */
    toValue() {
        return this.value;
    }
}
exports.Identifier = Identifier;
//# sourceMappingURL=identifier.js.map