import Feature from '../run-feature';


Feature(({ Scenario, ScenarioOutline, Rule}) => {
  Rule('a rule', ({ Scenario, Background }) => {
    Background(({ Given }) => {
      Given('a dog', () => {
        console.log('rule bg');
      });
    });
    Scenario('Rule Scenario', ({ When }) => {
      When('a cat', () => {
        console.log('rule cat');
      });
    });
  });

  Scenario('A Scenario', ({ Given, When, Then }) => {
    Given("a {word}", (animal: string) => {
      console.log(animal);
      expect(animal).toBe('dog');
    });
    When(/a (.+)/, (animal) => {
      expect(animal).toBe('jaguar');
    });

    Then('a jog', () => {});
  });

  const animals = ['dog', 'cat'];
  const objects = ['hammer', 'rope'];
  ScenarioOutline('An outline', ({ Given, When, Then }) => {
    Given('a {word} with an {word}', (...args) => {
     console.log(args)
    });
    When(/a (.*)/, (object) => {
      expect(object).toBe('whale');
    });
    Then('a jog', () => {});
  });
}, './sample.feature');
