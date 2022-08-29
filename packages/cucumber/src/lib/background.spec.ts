import Background from './background';
import {
  StepCallbackProvider,
  ScenarioCallbackObject,
} from './types';

describe('background', () => {
  describe('steps', () => {
    const mockScenarioCallbackObject: ScenarioCallbackObject = {
      Given: jest.fn(),
      When: jest.fn() ,
      Then: jest.fn(),
      And: jest.fn(),
      But: jest.fn(),
      Shared: jest.fn(),
    };
    it('should add a Given step', () => {
      const callback = ({ Given }: { Given: StepCallbackProvider }) =>
        Given('test', jest.fn());
      const sut = new Background('', callback);
      sut.stepCallbacks(mockScenarioCallbackObject);
      expect(mockScenarioCallbackObject.Given).toHaveBeenCalledTimes(1);
    });
    it('should add a When step', () => {
      const callback = ({ When }: { When: StepCallbackProvider }) =>
        When('test', jest.fn());
      const sut = new Background('', callback);
      sut.stepCallbacks(mockScenarioCallbackObject);
      expect(mockScenarioCallbackObject.When).toHaveBeenCalledTimes(1);
    });
    it('should add a Then step', () => {
      const callback = ({ Then }: { Then: StepCallbackProvider }) =>
        Then('test', jest.fn());
      const sut = new Background('', callback);
      sut.stepCallbacks(mockScenarioCallbackObject);
      expect(mockScenarioCallbackObject.Then).toHaveBeenCalledTimes(1);
    });
    it('should add a And step', () => {
      const callback = ({ And }: { And: StepCallbackProvider }) =>
      And('test', jest.fn());
      const sut = new Background('', callback);
      sut.stepCallbacks(mockScenarioCallbackObject);
      expect(mockScenarioCallbackObject.And).toHaveBeenCalledTimes(1);
    });
    it('should add a But step', () => {
      const callback = ({ But }: { But: StepCallbackProvider }) =>
      But('test', jest.fn());
      const sut = new Background('', callback);
      sut.stepCallbacks(mockScenarioCallbackObject);
      expect(mockScenarioCallbackObject.But).toHaveBeenCalledTimes(1);
    });
  });
});
