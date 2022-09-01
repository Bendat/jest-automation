import * as dotenv from 'dotenv'
dotenv.config()
const env = {
  loggingGroups: parseBoolOrUndefined(process.env.USE_LOGGING_GROUPS),
  filterQuery: process.env.CUCUMBER_FILTER
};
interface FlagOptions {
  loggingGroups: boolean;
}
const flags: FlagOptions = {
  loggingGroups: env.loggingGroups ?? true,
};

class FlagToggles {
  constructor(private _values: FlagOptions) {}

  get values() {
    return this._values;
  }

  enableLoggingGroups = () => {
    flags.loggingGroups = true;
    return this;
  };

}

const flagToggles = new FlagToggles(flags);

export const Flags = flagToggles;
export const Env = env;

export function parseBoolOrUndefined(
  value: string | undefined
): boolean | undefined {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  return undefined;
}
