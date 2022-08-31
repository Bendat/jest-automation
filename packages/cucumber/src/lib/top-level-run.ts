import { GherkinFeature } from './parsing/gherkin-objects';
import Scenario from './scenario';
import { TestGroup } from './test-group';
import TestTrackingEvents from './tracking/test-tracker';
import { ScenarioInnerCallback } from './types';

export class TopLevelRun extends TestGroup {
  readonly callbacks: ScenarioInnerCallback[] = [];
  readonly feature: GherkinFeature;
  readonly scenarios: Scenario[] = [];
  readonly #steps: ScenarioInnerCallback[] = [];
  readonly #events: TestTrackingEvents;

  constructor(
    feature: GherkinFeature,
    step: ScenarioInnerCallback,
    events: TestTrackingEvents,
  ) {
    super(undefined);
    this.feature = feature;
    this.#steps.push(step);
    this.#events = events;
  }

  loadDefinedSteps(...callbacks: ScenarioInnerCallback[]): void {
    callbacks.forEach((it) => this.callbacks.push(it));
  }

  assembleScenarios() {
    const { backgrounds, scenarios } = this.feature;
    scenarios.forEach((scenario) => {
      const scen = new Scenario(
        scenario.title,
        scenario,
        [],
        backgrounds,
        this.#events,
      );
      this.scenarios.push(scen);
    });
  }

  execute(testFn: It) {
    for (const scenario of this.scenarios) {
      scenario.loadDefinedSteps(...this.#steps);
      this.callbacks.forEach((callback) => {
        callback(scenario);
      });
    }
    return this.scenarios.map((scenario) => {
      scenario.execute(testFn);
    }).length;
  }

  protected _findMatch = (..._: unknown[]) => {
    throw new Error(
      'TopLevelRun should not search for a match. Use a scenario. Also you should never see this.',
    );
  };
}
