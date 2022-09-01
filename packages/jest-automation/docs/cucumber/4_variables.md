# Variables, Regex and Expressions

Variables can be extracted from a Gherkin step using either
Regex or [Cucumber Expressions](https://github.com/cucumber/cucumber-expressions#readme).

Once extracted, the variable will be passed to the argument list
of the Step function being executed.

> N.b while the expression or regex might match a non-string value, a string value may still be returned. In most cases expression strings should transform the type of the data. Custom parameter transformers are not currently supported.

## Cucumber Expressions Example

Cucumber Expressions match a `{keyword}` from the step definition string, to a piece of text in the feature file step string.

E.g to match an alphanumeric word as a string, `{string}` is used, other options include `{int}`, `{float}`, and others.

Take the following step:

```gherkin
Scenario Outline: A Scenario Outline
    Given a <object> with <count> crabs inside

    Examples:
      | object | count |
      | bucket | 50    |
      | bowl   | 3     |
...
```

> N.b expressions work with normal scenarios, or outlines with variables inject, even on steps with no variables.

The step definition would then be

```ts
...
Given('a {word} with {int} crabs inside', ()=>{})
...
```

The values extracted can be taken from the args list

```ts
...
Given('a {word} with {int} crabs inside', (obj: string, count: number)=>{
    console.log(obj) // prints 'bucket' then 'bowl'
    console.log(count) // prints 1 then 2
})
...
```
