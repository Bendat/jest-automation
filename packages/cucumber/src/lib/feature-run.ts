import { RuleInnerCallback, ScenarioInnerCallback } from './types';
import TestTrackingEvents from './tracking/test-tracker';
import { TopLevelRun } from './top-level-run';
import Category from './category';
import { GherkinTest } from './parsing/gherkin-objects';
import Rule from './rule';

export default class FeatureRun extends Category {

  #run?: TopLevelRun;
  constructor(test: GherkinTest, events: TestTrackingEvents) {
    super(test, test.feature, events);
  }
  
  registerRule(title: string, callback: RuleInnerCallback): void {
    const rules = this._test.feature.rules;
    const matching = rules.find((it) => it.title == title);
    if (!matching) {
      throw new Error(`Could not find a matching rule for ${title}`);
    }
    const rule = new Rule(this._test, matching, callback, this._events);
    this._rules[title] = rule;
  }

  getTopLevelRunCallback = (steps: ScenarioInnerCallback) => {
    this.registerTopLevelRun(steps);
  };

  getRuleCallback = (title: string, rule: RuleInnerCallback) => {
    this.registerRule(title, rule);
  };

  registerTopLevelRun(steps: ScenarioInnerCallback) {
    this.#run = new TopLevelRun(this._test.feature, steps, this._events);
    this.#run?.assembleScenarios();
  }

  execute(testGrouping: Describe, testFn?: It) {
    testGrouping(`Feature: ${this._test.feature.title}`, () => {
      const { feature } = this._test;
      const { scenarios, outlines, rules } = feature;
      afterAll(() => {
        this._events.featureEnded();
      });
      if (this.#run?.execute(test)) {
        // don't run other tests if all is specified
        return;
      }
      this.runOutlines(outlines, testGrouping, testFn);
      this.runScenarios(scenarios, testFn);
      this.runRules(rules);
      
    });
  }
}
