export type Some = Record<string, unknown>

export interface Class<T> extends Function {
    new (...args: unknown[]): T;
  }
  