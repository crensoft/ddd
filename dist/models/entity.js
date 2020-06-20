"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=entity.js.map