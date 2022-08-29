import Background from './background';
import { GherkinTestValidationError } from './errors/validation-errors';
import {
  GherkinBackground,
  GherkinScenario,
  GherkinStep,
} from './parsing/gherkin-objects';
import { TestGroup } from './test-group';
import TestTrackingEvents from './tracking/test-tracker';
import {
  StepData,
  PreparedStepCallback,
  ScenarioInnerCallback,
  PreparedStepData,
} from './types';
import { throwErrorIfNoMatch } from './utils';

export default class Scenario extends TestGroup {
  #parsedScenario: GherkinScenario;
  #parsedBackgrounds: GherkinBackground[];
  #events: TestTrackingEvents;

  constructor(
    title: string | undefined,
    parsedScenario: GherkinScenario,
    public readonly backgrounds: Background[] = [],
    parsedackgrounds: GherkinBackground[] = [],
    events: TestTrackingEvents,
  ) {
    super(title);
    this.#parsedScenario = parsedScenario;
    this.#parsedBackgrounds = parsedackgrounds;
    this.#events = events;
  }

  execute(testFunction: jest.It): void | Promise<void> {
    const scenario = this.#parsedScenario;
    this.#loadBackgroundSteps();
    return testFunction(
      'Scenario: ' + scenario.title ?? 'Untitled Scenario',
      async () => {
        this.#events.scenarioStarted(this.title);
        try {
          await this.#runBackgroundSteps();
          await this.#runScenarioSteps();
        } catch (err) {
          throw err;
        } finally {
          this.#events.scenarioEnded();
        }
      },
    );
  }

  loadDefinedSteps(...callbacks: ScenarioInnerCallback[]) {
    const { Given, When, Then, And, But, Shared } = this;
    const params = { Given, When, Then, And, But, Shared };
    callbacks.forEach((callback) => {
      callback(params);
    });
  }

  protected _findMatch = (
    regex: RegExp,
    group: string,
    callback: PreparedStepCallback,
  ) => {
    const backgroundMatch = this.#checkBackgrounds(regex, group, callback);
    if (backgroundMatch) {
      return backgroundMatch;
    }
    return this.#stepsMatch(regex, group, callback);
  };

  #loadBackgroundSteps() {
    const bgs = this.backgrounds;
    for (const bg of bgs) {
      this.loadDefinedSteps(bg.stepCallbacks);
    }
  }

  #checkBackgrounds(
    regex: RegExp,
    group: string,
    callback: PreparedStepCallback,
  ) {
    const bg = this.#parsedBackgrounds;
    for (const { steps } of bg) {
      for (const parsedStep in steps) {
        const { text, keyword } = steps[parsedStep];
        if (keyword !== group) {
          continue;
        }
        if (regex.test(text)) {
          return new StepData(text, regex, callback);
        }
      }
    }
  }

  #stepsMatch(regex: RegExp, group: string, callback: PreparedStepCallback) {
    for (const { text, keyword } of this.#parsedScenario.steps) {
      if (regex.test(text)) {
        if (keyword !== group) {
          continue;
        }
        return new StepData(text, regex, callback);
      }
    }
  }

  async #runBackgroundSteps() {
    for (const { steps } of this.#parsedBackgrounds) {
      for (const parsedStep in steps) {
        await this.#runStep(steps[parsedStep]);
      }
    }
  }

  async #runScenarioSteps() {
    for (const step of this.#parsedScenario.steps) {
      await this.#runStep(step);
    }
  }

  async #runStep(step: GherkinStep): Promise<void> {
    const { keyword, text, variables, table } = step;
    let matchingStep = this._steps[keyword][text];
    if (!matchingStep) {
      throw new GherkinTestValidationError(
        `Could not find a matching step definition implementation for '${keyword} ${text}'`,
      );
    }
    this.#events.stepStarted(keyword, text, variables);
    try {
      await this.#executeStepCallback(matchingStep, variables, step);
    } catch (err) {
      throw err;
    } finally {
      this.#events.stepEnded();
    }
  }

  async #executeStepCallback(
    matchingStep: PreparedStepData,
    variables: string[],
    { text, keyword, table }: GherkinStep,
  ) {
    const { regex } = matchingStep;
    let args = [...variables];
    if (regex && variables.length === 0) {
      const [_, matchedVariables] = text.match(regex) ?? [];
      args = [...args, matchedVariables];
    }
    throwErrorIfNoMatch(matchingStep, keyword, text);
    const { action } = matchingStep;
    await action(...args, table);
  }
}
