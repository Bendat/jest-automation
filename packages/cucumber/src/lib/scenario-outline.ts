import Background from './background';
import { GherkinBackground, GherkinScenarioOutline } from './parsing/gherkin-objects';
import Scenario from './scenario';
import TestTrackingEvents from './tracking/test-tracker';
import { ScenarioInnerCallback } from './types';

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
    events: TestTrackingEvents,
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

  execute(group: jest.Describe, testFn: jest.It, after = afterAll) {
    group(`Scenario Outline: ${this.title}`, () => {
      this.#events.scenarioOutlineStarted(this.title);
      after(() => {
        this.#events.scenarioOutlineEnded();
      });
      console.log(this.#scenarios)
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
          new Scenario(it.title ?? '', it, this.#backgrounds, bg, this.#events),
      )
      .forEach((it) => this.#scenarios.push(it));
  }
}
