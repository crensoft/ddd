import { eventService } from "../services/event-service";

/**
 * Aggregate Root Model
 */
export class AggregateRoot {
  events: any[] = [];

  apply(evt: any) {
    this.events.push(evt);
  }

  commit() {
    this.events.forEach((evt: any) => {
      eventService.emit(evt);
    });
    this.events = [];
  }
}
