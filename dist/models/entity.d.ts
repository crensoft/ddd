import { Identifier } from "./identifier";
export declare const isEntity: (v: any) => v is Entity<any>;
export declare class Entity<Props extends EntityLikeProps<Identifier<any>>> implements EntityLike<Props> {
    props: Readonly<Props>;
    protected constructor(props: Props);
    equals(object?: Entity<Props>): boolean;
}
export interface EntityLikeProps<Id extends Identifier<any>> {
    id: Id;
    [index: string]: any;
}
export interface EntityLike<Props extends EntityLikeProps<Identifier<any>>> {
    props: Props;
    equals(object?: EntityLike<Props>): boolean;
}
