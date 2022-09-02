import Feature from '../../../cucumber/src/lib/run-feature';

Feature(({ All }) => {
  All(({ Given, When, Then }) => {
    Given('a 1', () => {});
    Given('a 2', () => {});
    When('a bat', () => {});
    When('a cat', () => {});
    Then('a toyota', () => {});
    Then('a mazda', () => {});
  });
}, './top-level-run.feature');
