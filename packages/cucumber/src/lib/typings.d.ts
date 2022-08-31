declare interface Describe {
  // tslint:disable-next-line ban-types
  (
    name: number | string | ((...args) => unknown) | FunctionLike,
    fn: EmptyFunction
  ): void;
  /** Only runs the tests inside this `describe` for the current file */
  only: Describe;
  /** Skips running the tests inside this `describe` for the current file */
  skip: Describe;
  each: Each;
}

declare interface It {
  (name: string, fn?: ProvidesCallback, timeout?: number): void;
  only: It;
  skip: It;
  todo: It;
  concurrent: It;
  each: Each;
}

declare const describe: Describe;
declare const test: It;
declare const afterAll: (...args) => void;
declare const beforeAll: (...args) => void;
