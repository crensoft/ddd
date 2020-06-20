export interface ValueObjectProps {
    [index: string]: any;
}
/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */
export declare abstract class ValueObject<T extends ValueObjectProps> {
    readonly props: T;
    constructor(props: T);
    equals(vo?: ValueObject<T>): boolean;
}
