import { loadFeature } from 'jest-cucumber';
import { Feature } from '../run-feature';
jest.setTimeout(11000);
Feature(({ Scenario, ScenarioOutline, Background }) => {
  const animals = ['dog', 'cat'];
  const objects = ['hammer', 'rope'];

  Scenario('A Scenario', ({ Given, When, Then }) => {
    Given(/a (.*)/, (animal) => {
      expect(animal).toBe('dog');
    });
    When(/a (.+)/, (animal) => {
      expect(animal).toBe('jaguar');
    });

    Then('a jog', () => {});
  });

  ScenarioOutline('An outline', ({ Given, When, Then }) => {
    Given(/a (.*) with an (.*)/, (animal, object) => {
      expect(animal).toBe(animals.shift());
      expect(object).toBe(objects.shift());
    });
    When(/a (.*)/, (object) => {
      expect(object).toBe('whale');
    });
    Then('a jog', () => {});
  });
}, './sample.feature');
