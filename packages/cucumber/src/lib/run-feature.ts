import callerSites from 'callsites';
import { FeatureCallback, FeatureCallbackObject } from './types';
import FeatureRun from './feature-run';
import TestTrackingEvents from './tracking/test-tracker';
import TestTrackingSubscribers from './tracking/test-subscribers';
import { readFeatureRelative } from './utils';
import { Flags } from '../setup';
import { useConsoleGroups } from '@jest-automation/console';

function runFeatureFile(
  featureCallback: FeatureCallback ,
  featurePath: string
) {
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

function getFeature(file: string) {
  const caller = callerSites.default()[2].getFileName() ?? '';
  return readFeatureRelative(file, caller);
}

const Feature = runFeatureFile;

export default Feature;
