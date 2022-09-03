import { injectable } from 'tsyringe';

export enum StoreAction {
  PUT = 'PUT',
  READ = 'READ',
}

/**
 * A Storage model for sharing data in tests.
 *
 * Values can be written to the Store with `.put(name, value)` and
 * they can be read with `.read<Foo>(name)`.
 *
 * By default the store will validate against null and undefined values and
 * will throw an error if an empty value is provided for storage,
 * or read from storage. This can be configured with the `validateValuesNotEmpty`
 * constructor parameter.
 *
 * When enabled, `put` and `read` can also be individually configured to throw
 * an exception, or simply print an error.
 */
@injectable()
export default class Store {
  #history: History = {};
  #data: Cache = {};
  #validateValuesNotEmpty: boolean;

  /**
   * Constructs a new Store.
   * @param validateValuesNotEmpty If enabled, values will be checked for emptiness and errors/warnings will be thrown/shown during read or put
   */
  constructor(validateValuesNotEmpty = true) {
    this.#validateValuesNotEmpty = validateValuesNotEmpty;
  }

  /**
   * Adds a new item to the Store. If validation
   * is enabled, empty (null, undefined) values will throw an error or display a warning.
   *
   * @param name The name to store this value under
   * @param value The value to be stored
   * @param throwIfNullOrUndefined if enabled, throws an error on null or undefined values. Defaults to true.
   */
  put<T>(name: string, value: T, throwIfNullOrUndefined = true) {
    this._checkHistory(name);
    if (this.#validateValuesNotEmpty && isUndefined(value)) {
      throwIfConfigured(name, StoreAction.PUT, throwIfNullOrUndefined);
      this._markFailure(name, value as undefined);
    } else {
      this.#data[name] = value;
      this._markSuccess(name, value);
    }
  }

  /**
   * Reads a value from the Store. If validation
   * is enabled, empty (null, undefined) values will throw an error or display a warning.
   *
   * @param name The name the value is stored under for retrieval.
   * @param throwIfNullOrUndefined
   * @returns if enabled, throws an error on null or undefined values. Defaults to true.
   */
  read<TReturn>(name: string, throwIfNullOrUndefined = true): TReturn {
    const value = this.#data[name];
    if (this.#validateValuesNotEmpty && isUndefined(value)) {
      throwIfConfigured(name, StoreAction.READ, throwIfNullOrUndefined);
      logReadFailure(name, value as undefined);
    }

    return value as TReturn;
  }

  /**
   * Generates an object detailing all the values in the test context,
   * their name, and the number of successfully or unsuccessful (null, undefined)
   * attempts to add a value with that name.
   * 
   * @param forInput Filter the report to a single named entry
   * @returns An object representing the report.
   */
  generateReport(forInput: string | undefined = undefined) {
    const history = this.#history;

    if (isUndefined(forInput)) {
      return sanitizeHistoryObjects(history);
    }

    const name: string = forInput as unknown as string;
    const currentValue = history[name];

    if (isUndefined(currentValue)) {
      return noHistoryError(forInput);
    }
    const { successes, failures, values } = history[name];
    return { name: forInput, successes, failures, values };
  }

  private _checkHistory(name: string) {
    const itemHistory = this.#history[name];
    if (isUndefined(itemHistory)) {
      this.#history[name] = {
        successes: 0,
        failures: 0,
        values: [],
        accessed: function () {
          return this.successes + this.failures > 0;
        },
      };
    }
  }

  private _markFailure(name: string, value: null | undefined) {
    const history = this.#history[name];
    logPutFailure(history, name, value);
    this.#history[name].failures++;
    this.#history[name].values.push(value);
  }

  private _markSuccess(name: string, value: unknown) {
    this.#history[name].successes++;
    this.#history[name].values.push(value);
  }
}

function sanitizeHistoryObjects(history: History) {
  const filtered: unknown = {};
  for (const entry in history) {
    const { successes, failures, values } = history[entry];
    filtered[entry] = { successes, failures, values };
  }
  return filtered;
}

function noHistoryError(forInput: string | undefined) {
  return {
    error: {
      message: `${forInput} has no history in this Store instance. No attempt has been made to add it.`,
    },
  };
}

function logPutFailure(
  history: HistoricalItem,
  name: string,
  value: null | undefined
) {
  const overwrites = history.accessed()
    ? history.values.slice(-1)
    : 'Nothing (no prior values for this name)';
  console.warn(`Store has been provided a value which is null or undefined
  name: ${name}
  value: ${value}
  overwrites: ${overwrites}
`);
}

function isUndefined(value?: unknown) {
  return value === null || typeof value === 'undefined';
}

function logReadFailure(name: string, value: null | undefined) {
  console.warn(`Store attempted to read a value that was null or undefined
  name: ${name}
  value: ${value}
`);
}

function throwIfConfigured(
  name: string,
  action: StoreAction,
  shouldThrow: boolean
) {
  if (shouldThrow) {
    throw new Error(`Cannot ${action} a null or undefined value for ${name}`);
  }
}

interface HistoricalItem {
  successes: number;
  failures: number;
  values: unknown[];
  accessed: () => boolean;
}

interface History {
  [id: string]: HistoricalItem;
}

interface Cache {
  [id: string]: unknown;
}
