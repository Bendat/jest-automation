import { Feature } from "../../../cucumber/src";

/**
 * The Background callback can extend into the opening
 * shared steps of a scenario, provided they are consistent
 * across scenarios and not already in a background.
 */
Feature(({ Background, Scenario, ScenarioOutline }) => {
  afterAll(() => {
    expect.assertions(4);
  });

  Background('A Named Background', ({ Given, When }) => {
    Given('a holly', () => {
      expect(1).toBe(1);
    });
    Given('a jolly', () => {
      expect(1).toBe(1);
    });
    When('a Christmas', () => {
      expect(1).toBe(1);
    });
  });

  Scenario('Cheers', ({ Then }) => {
    Then('everybody gives a cheer', () => {
      expect(1).toBe(1);
    });
  });
}, './basic-backgrounds.feature');
