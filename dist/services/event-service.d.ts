/// <reference types="node" />
import { EventEmitter } from "events";
export interface IDomainEvent {
    type: string;
    payload?: any;
    meta?: any;
}
export declare class DomainEvent {
    private props;
    constructor(props: IDomainEvent);
    get type(): string;
    get payload(): any;
    get meta(): any;
    toValue(): IDomainEvent;
}
export declare class EventService {
    private readonly eventEmitter;
    constructor(eventEmitter?: EventEmitter);
    emit(evt: any, ...args: any[]): boolean;
    on(type: string, fn: (...args: any[]) => void): void;
    once(type: string, fn: (...args: any[]) => void): void;
    create(evtData: any): DomainEvent;
}
export declare const eventService: EventService;
