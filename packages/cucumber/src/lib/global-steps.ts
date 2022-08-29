import { Appendable } from '@utilities/data-utilities';
import { GherkinStep } from './gherkin-objects';
import {
  PreparedStepCallback,
  PreparedStepData,
  PreparedStepGroup,
  PreparedSteps,
  ScenarioSteps,
} from './types';

const steps: PreparedSteps = new ScenarioSteps();

class StepCache {
  Given: PreparedStepData[] = [];
  When: PreparedStepData[] = [];
  Then: PreparedStepData[] = [];

  FindStep = (groupName: string, step: GherkinStep) => {
    const group = (this as unknown as Appendable)[
      groupName
    ] as unknown as PreparedStepGroup[];
    group.forEach(({ __keyword__: _, ...stepData }) => {
        // make special case for and/but - should map to when/then
      for (const data in stepData) {
        const loadedStep = stepData[data];
        if (loadedStep.regex) {
          continue;
        }
        if (step.text === loadedStep.text) {
          return loadedStep;
        }
      }
      for (const data in stepData) {
        const loadedStep = stepData[data];
        const { text, regex } = loadedStep;
        if (!regex) {
          continue;
        }

        if (regex.test(step.text)) {
          return loadedStep;
        }
      }
    });
  };
}

const  globalCache = new StepCache();

function Given(stepString: string | RegExp, action: PreparedStepCallback) {
  let text: string;
  let regex: RegExp | undefined;
  if (stepString instanceof RegExp) {
    text = stepString.source;
    regex = stepString;
  } else {
    text = stepString;
  }
  const step: PreparedStepData = {
    text,
    regex,
    action,
  };
  globalCache.Given.push(step);
}

Given('', ()=>{}
)