"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_service_1 = require("../services/event-service");
class AggregateRoot {
    constructor() {
        this.events = [];
    }
    apply(evt) {
        this.events.push(evt);
    }
    commit() {
        this.events.forEach((evt) => {
            event_service_1.eventService.emit(evt);
        });
        this.events = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregate-root.js.map