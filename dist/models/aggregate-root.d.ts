/**
 * Aggregate Root Model
 */
export declare class AggregateRoot {
    events: any[];
    apply(evt: any): void;
    commit(): void;
}
