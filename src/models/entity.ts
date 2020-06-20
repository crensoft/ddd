import { shallowEqual } from "shallow-equal-object";
import { Identifier } from "./identifier";

export const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export class Entity<Props extends EntityLikeProps<Identifier<any>>>
  implements EntityLike<Props> {
  props: Readonly<Props>;

  protected constructor(props: Props) {
    this.props = Object.freeze(props);
  }

  /*
   * Check equality by identifier
   */
  equals(object?: Entity<Props>): boolean {
    if (object == null || object == undefined) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }
    return this.props.id.equals(object.props.id);
  }
}

export interface EntityLikeProps<Id extends Identifier<any>> {
  id: Id;
  [index: string]: any;
}

export interface EntityLike<Props extends EntityLikeProps<Identifier<any>>> {
  props: Props;

  equals(object?: EntityLike<Props>): boolean;
}
