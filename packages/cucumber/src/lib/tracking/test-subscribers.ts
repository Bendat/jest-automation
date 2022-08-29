import {
  group,
  ConsoleGroupToken,
  endGroup,
} from '../../../modules/logging/custom-console';
import Bag from './bag';

export default class TestTrackingSubscribers {
  readonly featureStarted = new Bag((title: string) =>
    group(ConsoleGroupToken.FeatureToken, title),
  );

  readonly featureEnded = new Bag(() =>
    endGroup(ConsoleGroupToken.FeatureToken),
  );
  readonly scenarioOutlineStarted = new Bag((title: string) =>
    group(ConsoleGroupToken.ScenarioOutlineToken, title),
  );
  readonly scenarioOutlineEnded = new Bag(() =>
    endGroup(ConsoleGroupToken.ScenarioOutlineToken),
  );
  readonly scenarioStarted = new Bag((title: string) =>
    group(ConsoleGroupToken.ScenarioToken, title),
  );
  readonly scenarioEnded = new Bag(() =>
    endGroup(ConsoleGroupToken.ScenarioToken),
  );
  readonly stepStarted = new Bag(
    (keyword: string, sentence: string, ..._: any[]) =>
      group(ConsoleGroupToken.StepToken, keyword, sentence),
  );
  readonly stepEnded = new Bag(() => endGroup(ConsoleGroupToken.StepToken));
}
