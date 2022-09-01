import { ScenarioInnerCallback } from './types';

export default class Background {
  constructor(
    public readonly title: string | undefined,
    public readonly stepCallbacks: ScenarioInnerCallback,
  ) {}
}
