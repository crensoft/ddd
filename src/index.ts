import { shallowEqual } from "shallow-equal-object";

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

export class Identifier<T> {
  constructor(private value: T) {}

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return this.value === (id as any);
    }
    return id.toValue() === this.value;
  }

  toString() {
    return this.value;
    // const constructorName = this.constructor.name;
    // return `${constructorName}(${String(this.value)})`;
  }

  toJSON() {
    return this.value;
  }

  /**
   * Return raw value of identifier
   */
  toValue(): T {
    return this.value;
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

export interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, vo.props);
  }
}
