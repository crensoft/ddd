import { EventEmitter } from "events";

export interface IDomainEvent {
  type: string;
  payload?: any;
  meta?: any;
}

export class DomainEvent {
  constructor(private props: IDomainEvent) {}

  get type() {
    return this.props.type;
  }

  get payload() {
    return this.props.payload;
  }

  get meta() {
    return this.props.meta;
  }

  public toValue() {
    return this.props;
  }
}

export class EventService {
  constructor(private readonly eventEmitter = new EventEmitter()) {}

  emit(evt: any, ...args: any[]) {
    return this.eventEmitter.emit(evt.type, evt, ...args);
  }

  on(type: string, fn: (...args: any[]) => void) {
    this.eventEmitter.on(type, fn);
  }

  once(type: string, fn: (...args: any[]) => void) {
    this.eventEmitter.once(type, fn);
  }

  create(evtData: any) {
    return new DomainEvent(evtData);
  }
}

export const eventService = new EventService();
