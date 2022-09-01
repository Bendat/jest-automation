import Background from './background';
import { GherkinTestValidationError } from './errors/validation-errors';
import { findMatchingExpression } from './expressions';
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
import { Global } from '@jest/types';
import { throwErrorIfNoMatch } from './utils';

export default class Scenario extends TestGroup {
  #events: TestTrackingEvents;

  constructor(
    public readonly title: string | undefined,
    public readonly parsedScenario: GherkinScenario,
    public readonly backgrounds: Background[] = [],
    public readonly parsedBackgrounds: GherkinBackground[] = [],
    events: TestTrackingEvents
  ) {
    super(title);
    this.#events = events;
  }

  execute(
    testFunction: Global.ItBase,
    isSkipped = false
  ): void | Promise<void> {
    const scenario = this.parsedScenario;
    this.#loadBackgroundSteps();
    return testFunction(
      'Scenario: ' + scenario.title ?? 'Untitled Scenario',
      async () => {
        if (isSkipped) {
          return;
        }
        this.#events.scenarioStarted(this.title);
        try {
          await this.#runBackgroundSteps();
          await this.#runScenarioSteps();
        } finally {
          this.#events.scenarioEnded();
        }
      }
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
    callback: PreparedStepCallback
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
    callback: PreparedStepCallback
  ) {
    const bg = this.parsedBackgrounds;
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
    for (const { text, keyword } of this.parsedScenario.steps) {
      if (regex.test(text)) {
        if (keyword !== group) {
          continue;
        }
        return new StepData(text, regex, callback);
      }
    }
  }

  async #runBackgroundSteps() {
    for (const { steps } of this.parsedBackgrounds) {
      for (const parsedStep in steps) {
        await this.#runStep(steps[parsedStep]);
      }
    }
  }

  async #runScenarioSteps() {
    for (const step of this.parsedScenario.steps) {
      await this.#runStep(step);
    }
  }

  async #runStep(step: GherkinStep): Promise<void> {
    const { keyword, text, variables } = step;
    let matchingStep = this._steps[keyword][text];
    let actualVars: unknown[] = [...variables];
    ({ matchingStep, actualVars } = this.tryMatchExpression(
      matchingStep,
      keyword,
      text,
      actualVars
    ));
    this.#events.stepStarted(keyword, text, variables);
    try {
      await this.#executeStepCallback(matchingStep, actualVars, step);
    } finally {
      this.#events.stepEnded();
    }
  }

  private tryMatchExpression(
    matchingStep: PreparedStepData,
    keyword: string,
    text: string,
    actualVars: unknown[]
  ) {
    if (!matchingStep) {
      const group = this._steps[keyword];
      const matchingExpression = findMatchingExpression(text, group);
      if (!matchingExpression) {
        throw new GherkinTestValidationError(
          `Could not find a matching step definition implementation for '${keyword} ${text}'`
        );
      }

      actualVars = [...matchingExpression.args];
      matchingStep = group[matchingExpression.expression];
    }
    return { matchingStep, actualVars };
  }

  async #executeStepCallback(
    matchingStep: PreparedStepData,
    variables: unknown[],
    { text, keyword, table }: GherkinStep
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
