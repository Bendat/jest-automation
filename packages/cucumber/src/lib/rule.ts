import Category from './category';
import { GherkinRule, GherkinTest } from './parsing/gherkin-objects';
import TestTrackingEvents from './tracking/test-tracker';
import {
  CategoryCallbackObject,
  RuleInnerCallback,
} from './types';

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
    testGrouping: Describe,
    testFn: It | undefined,
    isSkipped: boolean,
    after = afterAll
  ): void {
    const callbackObject: CategoryCallbackObject = {
      Scenario: this.getScenarioCallback,
      ScenarioOutline: this.getOutlineCallback,
      Background: this.getBackgroundCallback,
    };
    this.#callback(callbackObject);
    testGrouping(`Rule: ${this.title}`, () => {
      const { scenarios, outlines } = this._base;
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
