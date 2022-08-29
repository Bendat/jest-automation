/**
 * Declares a type to be an uninstantiated class.
 * I.E. for the `Foo` rather than `new Foo()`
 */
export interface Class<T> extends Function {
  // tslint:disable-next-line: callable-types
  new (...args: any[]): T;
}

/**
 * Declares a type to have a constructor. Applies
 * to class instances.
 */
export interface Constructable<T> {
  constructor(...args: any[]): T;
}

/**
 * Coerces typescript classes to expose their
 * internal members, like the constructor,
 * as well as its original public fields.
 */
export type Instance<T> = Constructable<T> & T;

export type Dict = {[key: string]: any}