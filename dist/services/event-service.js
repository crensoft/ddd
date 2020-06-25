"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = exports.EventService = exports.DomainEvent = void 0;
const events_1 = require("events");
class DomainEvent {
    constructor(props) {
        this.props = props;
    }
    get type() {
        return this.props.type;
    }
    get payload() {
        return this.props.payload;
    }
    get meta() {
        return this.props.meta;
    }
    toValue() {
        return this.props;
    }
}
exports.DomainEvent = DomainEvent;
class EventService {
    constructor(eventEmitter = new events_1.EventEmitter()) {
        this.eventEmitter = eventEmitter;
    }
    emit(evt, ...args) {
        return this.eventEmitter.emit(evt.type, evt, ...args);
    }
    on(type, fn) {
        this.eventEmitter.on(type, fn);
    }
    once(type, fn) {
        this.eventEmitter.once(type, fn);
    }
    create(evtData) {
        return new DomainEvent(evtData);
    }
}
exports.EventService = EventService;
exports.eventService = new EventService();
//# sourceMappingURL=event-service.js.map