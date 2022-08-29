import * as path from 'path';
import * as fs from 'fs';

import {
  PreparedStepGroup,
  PreparedStepCallback,
  StepData,
  PreparedStepData,
} from './types';
import { parseCucumber } from './parsing/parser';

export function assignTextStep(
  text: string | RegExp,
  group: PreparedStepGroup,
  callback: PreparedStepCallback,
) {
  const value = text as unknown as string;
  group[value] = new StepData(value, undefined, callback);
}

export function throwErrorIfNoMatch(
  matchingStep: PreparedStepData,
  keyword: string,
  text: string,
) {
  if (!matchingStep) {
    throw new Error(
      `No matching step found in feature file for ${keyword} ${text}`,
    );
  }
}

export function assignRegexStep(
  text: RegExp,
  callback: PreparedStepCallback,
  group: PreparedStepGroup,
  matcher: (
    regex: RegExp,
    group: string,
    callback: PreparedStepCallback,
  ) => StepData | undefined,
) {
  const step = matcher(text, group.__keyword__, callback);
  if (step) {
    group[step.text] = step;
  }
}

export function readFeatureRelative(file: string, callerFile: string) {
  const callerDirectory = path.dirname(callerFile || '');
  const absolutePath = path.resolve(callerDirectory, file);
  const text = fs.readFileSync(absolutePath, 'utf-8');
  return parseCucumber(text);
}
