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
