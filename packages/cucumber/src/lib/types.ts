import {Builder, Property} from '@jest-automation/dto' 
export type StepCallbackProvider = (
  text: string | RegExp,
  callback: PreparedStepCallback,
) => void;
export type PreparedStepCallback = (...args: any) => void | Promise<void>;

export interface PreparedStepData {
  text?: string;
  regex: RegExp | undefined;
  action: PreparedStepCallback;
}

interface NamedStepGroup {
  __keyword__: string;
}
interface StepGroupData {
  [text: string]: PreparedStepData;
}

export type PreparedStepGroup = NamedStepGroup & StepGroupData;

export interface PreparedSteps {
  [key: string]: PreparedStepGroup;
  Given: PreparedStepGroup;
  When: PreparedStepGroup;
  Then: PreparedStepGroup;
  And: PreparedStepGroup;
  But: PreparedStepGroup;
}

export class StepData implements PreparedStepData {
  constructor(
    public text: string,
    public regex: RegExp | undefined,
    public action: PreparedStepCallback,
  ) {}
}

export class ScenarioSteps implements PreparedSteps {
  [key: string]: PreparedStepGroup;
  Given = attachName('Given');
  When = attachName('When');
  Then = attachName('Then');
  And = attachName('And');
  But = attachName('But');
}

function attachName(name: string): PreparedStepGroup {
  return { __keyword__: name } as unknown as PreparedStepGroup;
}

export interface ScenarioCallbackObject {
  Given: StepCallbackProvider;
  When: StepCallbackProvider;
  Then: StepCallbackProvider;
  And: StepCallbackProvider;
  But: StepCallbackProvider;
  Shared: (...steps: ScenarioInnerCallback[]) => void;
}

export type ScenarioInnerCallback = (
  callbacks: ScenarioCallbackObject,
) => void | Promise<void>;

export type ScenarioCallback = (
  title: string,
  callbacks: ScenarioInnerCallback,
) => void | Promise<void>;

export type BackgroundCallbackObject = ScenarioCallbackObject;

export type BackgroundInnerCallback = (
  callbacks: BackgroundCallbackObject,
) => void | Promise<void>;

export type BackgroundCallback = (
  title: string | undefined | ScenarioInnerCallback,
  callbacks?: ScenarioInnerCallback,
) => void | Promise<void>;

export interface FeatureCallbackObject {
  Scenario: ScenarioCallback;
  ScenarioOutline: ScenarioCallback;
  Background: BackgroundCallback;
  All: (...steps: ScenarioInnerCallback[]) => void;
}

export type FeatureCallback = (callbacks: FeatureCallbackObject) => void;
