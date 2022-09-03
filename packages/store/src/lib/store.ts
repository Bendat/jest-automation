import {injectable} from 'tsyringe'

export enum TestContextAction {
  PUT = 'PUT',
  READ = 'READ',
}

// @injectable()
// export class TestContext {
//   private _history: History = {};
//   private _data: Cache = {};

//   constructor(container: Depen
//   ) {}

//   get data() {
//     return { ...this._data };
//   }

//   put(name: string, value: any, throwIfNullOrUndefined = true) {
//     this._checkHistory(name);
//     if (isUndefined(value)) {
//       throwIfConfigured(name, TestContextAction.PUT, throwIfNullOrUndefined);
//       this._markFailure(name, value);
//     } else {
//       this._data[name] = value;
//       this._markSuccess(name, value);
//     }
//   }

//   read<TReturn>(name: string, throwIfNullOrUndefined: boolean = true): TReturn {
//     const value = this._data[name];
//     if (isUndefined(value)) {
//       throwIfConfigured(name, TestContextAction.READ, throwIfNullOrUndefined);
//       logReadFailure(this._tracker, name, value);
//     }

//     return value;
//   }

//   generateReport(forInput: string | undefined = undefined) {
//     const history = this._history;
//     if (isUndefined(forInput)) {
//       return sanitizeHistoryObjects(history);
//     }

//     const name: string = forInput as any;
//     const currentValue = history[name];

//     if (isUndefined(currentValue)) {
//       return noHistoryError(forInput);
//     }
//     const { successes, failures, values } = history[name];
//     return { name: forInput, successes, failures, values };
//   }

//   private _checkHistory(name: string) {
//     const itemHistory = this._history[name];
//     if (isUndefined(itemHistory)) {
//       this._history[name] = {
//         successes: 0,
//         failures: 0,
//         values: [],
//         accessed: function () {
//           return this.successes + this.failures > 0;
//         },
//       };
//     }
//   }

//   private _markFailure(name: string, value: null | undefined) {
//     const history = this._history[name];
//     logPutFailure(this._tracker, history, name, value);
//     this._history[name].failures++;
//     this._history[name].values.push(value);
//   }

//   private _markSuccess(name: string, value: any) {
//     this._history[name].successes++;
//     this._history[name].values.push(value);
//   }
// }

// function sanitizeHistoryObjects(history: History) {
//   const filtered: any = {};
//   for (const entry in history) {
//     const { successes, failures, values } = history[entry];
//     filtered[entry] = { successes, failures, values };
//   }
//   return filtered;
// }

// function noHistoryError(forInput: string | undefined) {
//   return {
//     error: {
//       message: `${forInput} has no history in this test context instance. No attempt has been made to add it.`,
//     },
//   };
// }

// function logPutFailure(
//   tracker: TestTracker | undefined,
//   history: HistoricalItem,
//   name: string,
//   value: null | undefined,
// ) {
//   const overwrites = history.accessed()
//     ? history.values.slice(-1)
//     : 'Nothing (no prior values for this name)';
//   const message: ExpressiveLog = {
//     testStep: tracker?.stepTitle,
//     context: 'Test Context Cached an Empty Value',
//     description:
//       'Test Context has been provided a value which is null or undefined.',
//     details: [
//       ['name', name],
//       ['value', value],
//       ['overwrites', overwrites],
//     ],
//   };
//   console.warn(compose(message));
// }

// function logReadFailure(
//   tracker: TestTracker | undefined,
//   name: string,
//   value: null | undefined,
// ) {
//   const message: ExpressiveLog = {
//     testStep: tracker?.stepTitle,
//     context: 'Test Context Cached an Empty Value',
//     description:
//       'Test Context attempted to read a value which is null or undefined.',
//     details: [
//       ['name', name],
//       ['value', value],
//     ],
//   };
//   console.warn(compose(message));
// }

// function throwIfConfigured(
//   name: string,
//   action: TestContextAction,
//   shouldThrow: boolean,
// ) {
//   if (shouldThrow) {
//     throw new Error(`Cannot ${action} a null or undefined value for ${name}`);
//   }
// }

// interface HistoricalItem {
//   successes: number;
//   failures: number;
//   values: any[];
//   accessed: () => boolean;
// }

// interface History {
//   [id: string]: HistoricalItem;
// }

// interface Cache {
//   [id: string]: any;
// }
