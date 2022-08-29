import { to } from 'cli-color/move';
import {
  GherkinExample,
  GherkinScenario,
  GherkinScenarioOutline,
  GherkinStep,
} from './parsing/gherkin-objects';
import Scenario from './scenario';
import ScenarioOutline from './scenario-outline';
import TestTrackingSubscribers from './tracking/test-subscribers';
import TestTrackingEvents from './tracking/test-tracker';

describe('scenario outline', () => {
  describe('scenario', () => {
    describe('execute', () => {
      jest.mock('./scenario', () => {
        return jest.fn().mockImplementation(() => {
          return {
            execute: jest.fn((testFn: Function) => testFn()),
          };
        });
      });
      it('should run the scenarios associated with an outline', async () => {
        const subscribers = new TestTrackingSubscribers();
        const events = new TestTrackingEvents(subscribers);
        const outlineScenario = new GherkinScenario('test', [
          new GherkinStep('Given', 'a test', []),
        ], undefined, []);
        const parsedOutline = new GherkinScenarioOutline(
          'test',
          [
            {
              keyword: 'Given',
              text: 'a test',
            },
          ],
          [
            new GherkinExample(['a', 'b'], [['1', '2']]),
          ],
          [outlineScenario, outlineScenario],
        );
        const sut = new ScenarioOutline('test', parsedOutline, [], [], events);
        const group = jest.fn((...args: any) =>
          args[1](),
        ) as unknown as jest.Describe;
        const testFn = jest.fn() as unknown as jest.It;
        const afterAll = jest.fn()
        sut.execute(group, testFn, afterAll);
        expect(group).toHaveBeenCalled();
        expect(afterAll).toHaveBeenCalled();
        expect(testFn).toHaveBeenCalledTimes(2);
      });
    });
  });
  describe('loadDefinedSteps', ()=>{})
});
