# Intro

Jest-Automation is a runner for [Cucumber](https://cucumber.io/) which runs on [Jest](https://jestjs.io/).

It replaces Cucumber with a callback style of test using `Scenarios`, `Scenario Outlines` and `Given` `When` `Then` etc steps.

This library was inspired by [jest-cucumber](https://github.com/bencompton/jest-cucumber)

# Getting Started

```bash title="Install Jest-Automation"
npm i -D @jest-automation/cucumber
```

```json title="Add test pattern to jest config"
"testMatch": [
    "**/*.steps.js"
],
```

```gherkin title="Add a Feature File"
Feature: Search For Houses
    Scenario: I Can Search For A House In London
        Given I am looking for a house in 'London'
        When I search for houses
        Then I receive a list of results
```

```ts title="Create a Steps file"
import { Feature } from '@jest-automation/cucumber';

Feature(() => {}, './features/SearchHouses.feature');
```
:::info
 The path to the feature file can be specified relative to the current
 file position by starting with `./`, `../` or no prefix.
 The prefix `~/` will attempt to load the file relative to the root
 of the running project, while an absolute path will be used as is.
:::
The `Feature` function takes a callback which provides as an argument an object containing the following test functions:

- `Scenario`
- `ScenarioOutline`
- `All`

Also provided is a shared step `Background` function which will be applied to all relevant scenarios, and a `Rule`, which behaves like
a `Feature` and provides `Scenario` and `ScenarioOutline`.

```ts title="Add a Scenario"
import { Feature } from '@jest-automation/cucumber';

Feature(({ Scenario }) => {
  Scenario('I Can Search For A House In London', () => {});
}, './features/SearchHouses.feature');
```

> N.b ensure that scenarios have complete, unique names.

The callback objects like `Scenario` also take a callback, which
provides the step functions.

```ts title="Add Steps"
import { Feature } from '@jest-automation/cucumber';
import { Searcher } from '../src/test-actions';

Feature(({ Scenario }) => {
  Scenario('I Can Search For A House In London', ({ Given, When, Then }) => {
    Given('I am looking for a house in London', () => {
      Searcher.setLocation('London');
    });

    When('I search for houses', () => {
      Searcher.executeSearch();
    });

    Then('I receive a list of results', () => {
      const expected = [
        { address: '1 Pilsbury Lane', bedrooms: 2, bathrooms: 'cost extra' },
      ];
      expect(Searcher.result).toStrictEqual(expected);
    });
  });
}, './features/SearchHouses.feature');
```

## Backgrounds

Backgrounds are another test callback. Steps in a Background
will be reused across any scenarios within scope of that Background - i.e a Background inside a rule is not relevant to a Scenario outside a rule.

Backgrounds in Jest-Automation do not have to match the Background blocks in a Feature file - They can be ignored entirely or used to reduce initialization steps that don't have a Background in Feature.

### Background In Feature File

```gherkin
Feature: A Feature
    Background:
        Given a setup step

    Scenario: A Scenario
        When a when step
```

The steps for this can be:

```ts
Feature(({ Background, Scenario }) => {
  Background(({ Given }) => {
    Given('a setup step', () => {});
  });

  Scenario('A Scenario', () => {
    When('a when step', () => {});
  });
});
```

or

```ts
Feature(({ Scenario }) => {
  Scenario('A Scenario', () => {
    Given('a setup step', () => {});
    When('a when step', () => {});
  });
});
```

As the Background is optional.

### Background in Steps Only

```gherkin
Feature: A Feature
    Scenario: A Scenario
        Given a setup step
        When a when step

    Scenario: Another Scenario
        Given a setup step
        When another when step
```

The steps for this can be:

```ts
Feature(({ Background, Scenario }) => {
  Background(({ Given }) => {
    Given('a setup step', () => {});
  });

  Scenario('A Scenario', ({ When }) => {
    When('a when step', () => {});
  });

  Scenario('Another Scenario', ({ Then }) => {
    When('a when step', () => {});
  });
});
```

## Rules

Rules behave similarly to the `Feature` function. It is a function
provided by the `Feature` and which provides it's own copy of `Scenario`, `ScenarioOutline` and `Background` which map to a
Rule in the Feature File

```gherkin
Feature: A User Can Log In
    Background:
        Given a user

    Scenario: A User Successfully Logs In
        Given they enter their credentials
        When they log in
        The they are presented with their profile

    Rule: If a username is invalid, then the log in will fail
        Scenario: A User Cannot Log In Without A Username
            Given they do not provide a username
            When they log in
            Then log in fails

        Scenario: A User Cannot Log In With The Wrong Username
            Given they provide the wrong username
            When they log in
            Then log in fails

```

Which can be expressed as

```ts
Feature(({ Background, Scenario, Rule })=>{
    Background(({ Given })=>{
        Given('a user', ()=>{})
    });

    Scenario(' A User Successfully Logs In', ({ Given, When, Then })=>{
        Given('they enter their credentials', ()=>{})
        When('they log in', ()=>{})
        Then('they are presented with their profile', ()=>{})
    });

    Rule('If a username is invalid, then the log in will fail', ({ Scenario })=>{
        Scenario('A User Cannot Log In Without A Username', ()=>{...})
        Scenario('A User Cannot Log In With The Wrong Username', ()=>{...})
    })
}, './file.feature')

```

> note: Rules can also have a Background
