"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shallow_equal_object_1 = require("shallow-equal-object");
exports.isEntity = (v) => {
    return v instanceof Entity;
};
class Entity {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    /*
     * Check equality by identifier
     */
    equals(object) {
        if (object == null || object == undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!exports.isEntity(object)) {
            return false;
        }
        return this.props.id.equals(object.props.id);
    }
}
exports.Entity = Entity;
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
/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */
class ValueObject {
    constructor(props) {
        this.props = Object.freeze(props);
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return shallow_equal_object_1.shallowEqual(this.props, vo.props);
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=index.js.map