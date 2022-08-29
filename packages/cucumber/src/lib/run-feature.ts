import callerSites from 'callsites';
import {
  FeatureCallback,
  ScenarioInnerCallback,
} from './types';
import { FeatureRun } from './feature-run';
import TestTrackingEvents from './tracking/test-tracker';
import TestTrackingSubscribers from './tracking/test-subscribers';
import { readFeatureRelative } from './utils';


function runFeatureFile(featureCallback: FeatureCallback, featurePath: string) {
  const parsedGherkin = getFeature(featurePath);
  const tracker = new TestTrackingEvents(new TestTrackingSubscribers());
  tracker.featureStarted(parsedGherkin.feature.title);

  const feature = new FeatureRun(parsedGherkin, tracker);
  const callbackObject = {
    Scenario: scenarioCallback(feature),
    ScenarioOutline: scenarioOutlineCallback(feature),
    Background: backgroundCallback(feature),
    All: topLevelCallback(feature),
  };
  featureCallback(callbackObject);
  feature.execute(describe);
}

function scenarioCallback(feature: FeatureRun) {
  return (title: string, steps: ScenarioInnerCallback) => {
    feature.registerScenario(title).loadDefinedSteps(steps);
  };
}

function scenarioOutlineCallback(feature: FeatureRun) {
  return (title: string, steps: ScenarioInnerCallback) => {
    feature.registerScenarioOutline(title).loadDefinedSteps(steps);
  };
}

function backgroundCallback(feature: FeatureRun) {
  return (
    title: string | undefined | ScenarioInnerCallback,
    steps?: ScenarioInnerCallback,
  ) => {
    if (
      (typeof title === typeof 'string' || title === undefined) &&
      steps !== undefined
    ) {
      feature.registerBackground(title as unknown as string, steps);
      return;
    }
    feature.registerBackground(
      undefined,
      title as unknown as ScenarioInnerCallback,
    );
  };
}

function topLevelCallback(feature: FeatureRun) {
  return (steps: ScenarioInnerCallback) => {
    feature.registerTopLevelRun(steps);
  };
}

function getFeature(file: string) {
  const caller = callerSites.default()[2].getFileName() ?? '';
  return readFeatureRelative(file, caller)
}

const Feature = runFeatureFile

export default Feature;
