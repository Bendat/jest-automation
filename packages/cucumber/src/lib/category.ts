import { Env } from '../setup';
import Background from './background';
import { GherkinTestValidationError } from './errors/validation-errors';
import {
  GherkinFeature,
  GherkinRule,
  GherkinScenario,
  GherkinScenarioOutline,
  GherkinTest,
} from './parsing/gherkin-objects';
import Scenario from './scenario';
import ScenarioOutline from './scenario-outline';
import { matchesFilter } from './tag-filtering';
import TestTrackingEvents from './tracking/test-tracker';
import { ScenarioInnerCallback } from './types';

interface Group<T> {
  [key: string]: T;
}

export default abstract class Category {
  protected _test: GherkinTest;
  protected _base: GherkinFeature | GherkinRule;
  protected _scenarios: Group<Scenario> = {};
  protected _outlines: Group<ScenarioOutline> = {};
  protected _rules: Group<Category> = {};
  protected _backgrounds: Background[] = [];
  protected _events: TestTrackingEvents;

  constructor(
    test: GherkinTest,
    base: GherkinFeature | GherkinRule,
    events: TestTrackingEvents
  ) {
    this._test = test;
    this._events = events;
    this._base = base;
  }

  registerBackground(title: string | undefined, steps: ScenarioInnerCallback) {
    const background = new Background(title, steps);
    this._backgrounds.push(background);
    return background;
  }


  registerScenario(title: string) {
    const { scenarios, backgrounds } = this._base;
    const search = ({ title: parsed }: GherkinScenario) => parsed === title;
    const found = scenarios.find(search);
    if (!found) {
      throw new GherkinTestValidationError(unknownTitle(title));
    }
    const scenario = new Scenario(
      title,
      found,
      this._backgrounds,
      backgrounds,
      this._events
    );
    this._scenarios[title] = scenario;
    return scenario;
  }

  abstract execute(testGrouping: Describe, ...args: unknown[]): void;

  registerScenarioOutline(title: string) {
    const { outlines, backgrounds } = this._base;
    const search = ({ title: parsed }: GherkinScenarioOutline) =>
      parsed === title;
    const found = outlines.find(search);
    if (!found) {
      throw new GherkinTestValidationError(unknownTitle(title));
    }
    const scenario = new ScenarioOutline(
      title,
      found,
      this._backgrounds,
      backgrounds,
      this._events
    );
    this._outlines[title] = scenario;
    return scenario;
  }

  getScenarioCallback = (title: string, steps: ScenarioInnerCallback) => {
    this.registerScenario(title).loadDefinedSteps(steps);
  };

  getOutlineCallback = (title: string, steps: ScenarioInnerCallback) => {
    this.registerScenarioOutline(title).loadDefinedSteps(steps);
  };

  getBackgroundCallback = (
    title: string | undefined | ScenarioInnerCallback,
    steps?: ScenarioInnerCallback
  ) => {
    if (
      (typeof title === typeof 'string' || title === undefined) &&
      steps !== undefined
    ) {
      this.registerBackground(title as unknown as string, steps);
      return;
    }
    this.registerBackground(
      undefined,
      title as unknown as ScenarioInnerCallback
    );
  };

  protected runOutlines(
    outlines: GherkinScenarioOutline[],
    groupFn?: Describe,
    testFn?: It
  ) {
    for (const { title, tags } of outlines) {
      const matching = this._outlines[title ?? ''];
      if (!matching) {
        throw new GherkinTestValidationError(
          `Could not find a matching Scenario Outline defined for '${title}'`
        );
      }
      const matches = matchesFilter(Env.filterQuery, tags);
      const realGroup = groupFn ?? getGroupFunction(matches);
      const realTest = testFn ?? getTestFunction(matches);
      matching.execute(realGroup, realTest, isSkipped(matches));
    }
  }

  protected runRules(rules: GherkinRule[], groupFn?: Describe, testFn?: It) {
    for (const { title, tags } of rules) {
      const matching = this._rules[title ?? ''];
      if (!matching) {
        throw new GherkinTestValidationError(
          `Could not find a matching Scenario defined for '${title}'`
        );
      }
      const matches = matchesFilter(Env.filterQuery, tags);
      const realTest = testFn ?? getTestFunction(matches);
      const realGroup = groupFn ?? getGroupFunction(matches);
      matching.execute(realGroup, realTest, isSkipped(matches));
    }
  }

  protected runScenarios(scenarios: GherkinScenario[], testFn: It) {
    for (const { title, tags } of scenarios) {
      const matching = this._scenarios[title ?? ''];
      if (!matching) {
        throw new GherkinTestValidationError(
          `Could not find a matching Scenario defined for '${title}'`
        );
      }
      const matches = matchesFilter(Env.filterQuery, tags);
      const realTest = testFn ?? getTestFunction(matches);
      matching.execute(realTest, isSkipped(matches));
    }
  }
}

function getTestFunction(matches: boolean) {
  if (!Env.filterQuery) {
    return test;
  }
  return matches ? test : test.skip;
}

function getGroupFunction(matches: boolean) {
  if (!Env.filterQuery) {
    return describe;
  }
  return matches ? describe : describe.skip;
}

function isSkipped(matches: boolean) {
  if (!Env.filterQuery) {
    return false;
  }
  return !matches;
}
function unknownTitle(title: string): string | undefined {
  return `No scenario found matching title '${title}'`;
}
