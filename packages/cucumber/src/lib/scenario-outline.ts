import Background from './background';
import {
  GherkinBackground,
  GherkinScenarioOutline,
} from './parsing/gherkin-objects';
import Scenario from './scenario';
import TestTrackingEvents from './tracking/test-tracker';
import { ScenarioInnerCallback } from './types';
import {afterAll, beforeAll } from '@jest/globals';
import {Global} from '@jest/types'

export default class ScenarioOutline {
  #parsedScenarioOutline: GherkinScenarioOutline;
  #parsedBackgrounds: GherkinBackground[];
  #scenarios: Scenario[] = [];
  #backgrounds: Background[];
  #events: TestTrackingEvents;

  constructor(
    public title: string,
    parsedScenarioOutline: GherkinScenarioOutline,
    backgrounds: Background[],
    parsedBackgrounds: GherkinBackground[] = [],
    events: TestTrackingEvents
  ) {
    this.#parsedScenarioOutline = parsedScenarioOutline;
    this.#backgrounds = backgrounds;
    this.#parsedBackgrounds = parsedBackgrounds;
    this.#events = events;
    this.#buildScenarios();
  }

  loadDefinedSteps(...callbacks: ScenarioInnerCallback[]) {
    for (const scenario of this.#scenarios) {
      callbacks.forEach((callback) => {
        callback(scenario);
      });
    }
  }

  execute(group: Global.DescribeBase, testFn: Global.ItBase, isSkipped = false, after = afterAll, before = beforeAll) {
    group(`Scenario Outline: ${this.title}`, () => {
      if (!isSkipped) {
        before(()=>{
          this.#events.scenarioOutlineStarted(this.title);
        })
        after(() => {
          this.#events.scenarioOutlineEnded();
        });
      }

      this.#scenarios.map((scenario) => {
        scenario.execute(testFn);
      });
    });
  }

  #buildScenarios() {
    const { scenarios } = this.#parsedScenarioOutline;
    const bg = this.#parsedBackgrounds;
    scenarios
      .map(
        (it) =>
          new Scenario(it.title ?? '', it, this.#backgrounds, bg, this.#events)
      )
      .forEach((it) => this.#scenarios.push(it));
  }
}
