import { GherkinTable } from '../../../cucumber/src/lib/parsing/gherkin-objects';
import Feature from '../../../cucumber/src/lib/run-feature';

class UserDriver {
  setPassword(pw: string) {}
  setUsername(us: string) {}
  async performRegistration() {}
  verifyProfile() {}
  verifyError(table: GherkinTable) {}
}
const User = new UserDriver();
Feature(({ Background, Scenario, Rule }) => {
  let user: UserDriver;
  beforeEach(() => {
    user = new UserDriver();
  });

  Background(({ Given, When }) => {
    Given('a provided password {string}', (password: string) => {
      user.setPassword(password);
    });

    // steps can be run in background even if not defined so
    // in gherkin. This way we can take advantage of cucumber
    // expressions and/or regex
    Given('a provided username {string}', (username: string) => {
      user.setUsername(username);
    });

    When('the user registers', async () => {
      await user.performRegistration();
    });
  });

  Scenario('A user registers', ({ Then }) => {
    Then('they are shown their profile', () => {
      user.verifyProfile();
    });
  });

  Rule(
    'A username cannot contain special characters',
    ({ ScenarioOutline }) => {
      ScenarioOutline(
        'A user cannot register with a special character',
        ({ Then }) => {
          Then('they are displayed an error', (table: GherkinTable) => {
            user.verifyError(table);
          });
        }
      );
    }
  );
}, './sample.feature');
