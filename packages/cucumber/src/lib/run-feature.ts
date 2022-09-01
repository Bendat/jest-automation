import { FeatureCallback, FeatureCallbackObject } from './types';
import FeatureRun from './feature-run';
import TestTrackingEvents from './tracking/test-tracker';
import TestTrackingSubscribers from './tracking/test-subscribers';
import { readFeatureRelative } from './utils';
import { Flags } from '../setup';
import { useConsoleGroups } from '@jest-automation/console';
import { describe } from '@jest/globals';
function runFeatureFile(featureCallback: FeatureCallback, featurePath: string) {
  if (Flags.values.loggingGroups) {
    useConsoleGroups();
  }
  const parsedGherkin = getFeature(featurePath);
  const tracker = new TestTrackingEvents(new TestTrackingSubscribers());
  tracker.featureStarted(parsedGherkin.feature.title);

  const feature = new FeatureRun(parsedGherkin, tracker);
  const callbackObject: FeatureCallbackObject = {
    Scenario: feature.getScenarioCallback,
    ScenarioOutline: feature.getOutlineCallback,
    Background: feature.getBackgroundCallback,
    All: feature.getTopLevelRunCallback,
    Rule: feature.getRuleCallback,
  };
  featureCallback(callbackObject);
  feature.execute(describe);
}

function callSites(): CallSite[] {
  const _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _prepareStackTrace;
  return stack as unknown as CallSite[];
}

interface CallSite {
  /**
	Returns the value of `this`.
	*/
  getThis(): unknown | undefined;

  /**
	Returns the type of `this` as a string. This is the name of the function stored in the constructor field of `this`, if available, otherwise the object's `[[Class]]` internal property.
	*/
  getTypeName(): string | null;

  /**
	Returns the current function.
	*/
  getFunction(): (...args: unknown[]) => void | undefined;

  /**
	Returns the name of the current function, typically its `name` property. If a name property is not available an attempt will be made to try to infer a name from the function's context.
	*/
  getFunctionName(): string | null;

  /**
	Returns the name of the property of `this` or one of its prototypes that holds the current function.
	*/
  getMethodName(): string | undefined;

  /**
	Returns the name of the script if this function was defined in a script.
	*/
  getFileName(): string | null;

  /**
	Returns the current line number if this function was defined in a script.
	*/
  getLineNumber(): number | null;

  /**
	Returns the current column number if this function was defined in a script.
	*/
  getColumnNumber(): number | null;

  /**
	Returns a string representing the location where `eval` was called if this function was created using a call to `eval`.
	*/
  getEvalOrigin(): string | undefined;

  /**
	Returns `true` if this is a top-level invocation, that is, if it's a global object.
	*/
  isToplevel(): boolean;

  /**
	Returns `true` if this call takes place in code defined by a call to `eval`.
	*/
  isEval(): boolean;

  /**
	Returns `true` if this call is in native V8 code.
	*/
  isNative(): boolean;

  /**
	Returns `true` if this is a constructor call.
	*/
  isConstructor(): boolean;
}

function getFeature(file: string) {
  const caller = callSites()[2].getFileName() ?? '';
  return readFeatureRelative(file, caller);
}

const Feature = runFeatureFile;

export default Feature;
