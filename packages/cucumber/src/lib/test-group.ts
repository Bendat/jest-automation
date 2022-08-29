import {
  PreparedStepCallback,
  StepData,
  PreparedStepGroup,
  PreparedSteps,
  ScenarioSteps,
  StepCallbackProvider,
  ScenarioInnerCallback,
} from './types';
import { assignTextStep, assignRegexStep } from './utils';
export type StepMatcher = (
  regex: RegExp,
  group: string,
  callback: PreparedStepCallback,
) => StepData | undefined;

export abstract class TestGroup {
  public readonly title: string | undefined;
  protected _steps: PreparedSteps = new ScenarioSteps();
  constructor(title: string | undefined) {
    this.title = title;
  }
  get steps() {
    return this._steps;
  }
  abstract loadDefinedSteps(...callbacks: ScenarioInnerCallback[]): void;
  protected abstract _findMatch: StepMatcher;

  protected _step = (group: PreparedStepGroup) => {
    return (text: string | RegExp, callback: PreparedStepCallback) => {
      if (text instanceof RegExp) {
        assignRegexStep(text, callback, group, this._findMatch);
        return;
      }
      assignTextStep(text, group, callback);
    };
  };

  Given: StepCallbackProvider = this._step(this._steps.Given);

  When: StepCallbackProvider = this._step(this._steps.When);

  Then: StepCallbackProvider = this._step(this._steps.Then);

  And: StepCallbackProvider = this._step(this._steps.And);

  But: StepCallbackProvider = this._step(this._steps.But);

  Shared = (...steps: ScenarioInnerCallback[]) => {
    this.loadDefinedSteps(...steps);
  };
}
