import { Feature } from "@jest-automation/cucumber";

Feature(({ ScenarioOutline }) => {
  const counts = [1, 2];
  const animalNames = ['dogs', 'cats'];
  ScenarioOutline('An Outline Is a Thing', ({ Given }) => {
    Given(/(\d*) (\w*)/, (numberOf: string, animals: string) => {
      expect(numberOf).toBe(counts.shift()?.toFixed());
      expect(animals).toBe(animalNames.shift());
    });
  });
}, './basic-scenario-outline.feature');
