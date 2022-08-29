import Background from './background';
import {
  GherkinScenario,
  GherkinScenarioOutline,
  GherkinTest,
} from './parsing/gherkin-objects';
import Scenario from './scenario';
import ScenarioOutline from './scenario-outline';
import { ScenarioInnerCallback } from './types';
import { GherkinTestValidationError } from './errors/validation-errors';
import TestTrackingEvents from './tracking/test-tracker';
import { TopLevelRun } from './top-level-run';
interface Group<T> {
  [key: string]: T;
}
export class FeatureRun {
  #test: GherkinTest;
  #scenarios: Group<Scenario> = {};
  #outlines: Group<ScenarioOutline> = {};
  #backgrounds: Background[] = [];
  #events: TestTrackingEvents;
  #run?: TopLevelRun;
  constructor(test: GherkinTest, events: TestTrackingEvents) {
    this.#test = test;
    this.#events = events;
  }

  registerScenario(title: string) {
    const { feature } = this.#test;
    const { scenarios, backgrounds } = feature;
    const search = ({ title: parsed }: GherkinScenario) => parsed === title;
    const found = scenarios.find(search);
    if (!found) {
      throw new GherkinTestValidationError(unknownTitle(title));
    }
    const scenario = new Scenario(
      title,
      found,
      this.#backgrounds,
      backgrounds,
      this.#events,
    );
    this.#scenarios[title] = scenario;
    return scenario;
  }

  registerScenarioOutline(title: string) {
    const { feature } = this.#test;
    const { outlines, backgrounds } = feature;
    const search = ({ title: parsed }: GherkinScenarioOutline) =>
      parsed === title;
    const found = outlines.find(search);
    if (!found) {
      throw new GherkinTestValidationError(unknownTitle(title));
    }
    const scenario = new ScenarioOutline(
      title,
      found,
      this.#backgrounds,
      backgrounds,
      this.#events,
    );
    this.#outlines[title] = scenario;
    return scenario;
  }

  registerTopLevelRun(steps: ScenarioInnerCallback) {
    this.#run = new TopLevelRun(this.#test.feature, steps, this.#events);
    this.#run?.assembleScenarios();
  }

  registerBackground(title: string | undefined, steps: ScenarioInnerCallback) {
    const background = new Background(title, steps);
    this.#backgrounds.push(background);
    return background;
  }

  execute(testGrouping: jest.Describe) {
    testGrouping(`Feature: ${this.#test.feature.title}`, () => {
      const { feature } = this.#test;
      const { scenarios, outlines } = feature;
      afterAll(() => {
        this.#events.featureEnded();
      });
      if (this.#run?.execute(test)) {
        // don't run other tests if all is specified
        return;
      }
      this.runScenarios(scenarios);
      this.runOutlines(outlines);
    });
  }

  private runOutlines(outlines: GherkinScenarioOutline[]) {
    for (const { title } of outlines) {
      const matching = this.#outlines[title ?? ''];
      if (!matching) {
        throw new GherkinTestValidationError(
          `Could not find a matching Scenario Outline defined for '${title}'`,
        );
      }
      matching.execute(describe, test);
    }
  }

  private runScenarios(scenarios: GherkinScenario[]) {
    for (const { title } of scenarios) {
      const matching = this.#scenarios[title ?? ''];
      if (!matching) {
        throw new GherkinTestValidationError(
          `Could not find a matching Scenario defined for '${title}'`,
        );
      }
      const scenarioObject = this.#scenarios[title ?? ''];
      scenarioObject.execute(test);
    }
  }
}
function unknownTitle(title: string): string | undefined {
  return `No scenario found matching title '${title}'`;
}
