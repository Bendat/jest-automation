import Category from './category';
import {
  GherkinRule,
  GherkinTest,
} from './parsing/gherkin-objects';
import TestTrackingEvents from './tracking/test-tracker';
import {
  CategoryCallbackObject,
  RuleInnerCallback,
  ScenarioInnerCallback,
} from './types';
import { afterAll, beforeAll } from '@jest/globals';
import { Global } from '@jest/types';
import ScenarioOutline from './scenario-outline';
import Scenario from './scenario';

export default class Rule extends Category {
  readonly title: string;
  #callback: RuleInnerCallback;
  constructor(
    test: GherkinTest,
    parsedRule: GherkinRule,
    callback: RuleInnerCallback,
    events: TestTrackingEvents
  ) {
    super(test, parsedRule, events);
    this.title = parsedRule.title;
    this.#callback = callback;
  }

  execute(
    testGrouping: Global.DescribeBase,
    testFn: Global.ItBase | undefined,
    isSkipped: boolean,
    after = afterAll
  ): void {
    const callbackObject: CategoryCallbackObject = {
      Scenario: this.getScenarioCallback,
      ScenarioOutline: this.getOutlineCallback,
      Background: this.getBackgroundCallback,
    };
    this.#callback(callbackObject);
    const { scenarios, outlines } = this._base;
    testGrouping(`Rule: ${this.title}`, () => {
      if (!isSkipped) {
        beforeAll(() => {
          this._events.ruleStarted(this.title);
        });
        after(() => {
          this._events.ruleEnded();
        });
      }

      this.runScenarios(scenarios, testFn);
      this.runOutlines(outlines, testGrouping, testFn);
    });
  }
}
export class PassiveRule extends Category {
  readonly title: string;
  readonly #steps: ScenarioInnerCallback[];
  public readonly scenarios: Scenario[] = [];
  public readonly outlines: ScenarioOutline[] = [];

  constructor(
    title: string,
    steps: ScenarioInnerCallback[],
    events: TestTrackingEvents
  ) {
    super(undefined, undefined, events);
    this.title = title;
    this.#steps = steps;
  }

  execute(
    testGroupFn: Global.DescribeBase,
    testFn: Global.ItBase,
    isSkipped = false,
    before = beforeAll,
    after = afterAll
  ) {
    for (const scenario of this.scenarios) {
      scenario.loadDefinedSteps(...this.#steps);
    }

    for (const outline of this.outlines) {
      outline.loadDefinedSteps(...this.#steps);
    }
    testGroupFn(`Rule: ${this.title}`, () => {
      if (!isSkipped) {
        before(() => {
          this._events.ruleStarted(this.title);
        });
        after(() => {
          this._events.ruleEnded();
        });
        this.scenarios.map((scenario) => {
          scenario.execute(testFn);
        });
        this.outlines.map((outline) => {
          outline.execute(testGroupFn, testFn);
        });
      }
    });
  }
}
