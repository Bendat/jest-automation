import { Feature } from "@jest-automation/cucumber";

Feature(({ Scenario, ScenarioOutline }) => {
  Scenario('First Scenario', ({Given}) => {
    Given('{int} dingo',(number: string)=>{
        expect(number).toBe(1)
    })
  });
  
  Scenario('Second Scenario', ({Given}) => {
    Given('{int} dingos',(number: number)=>{
        expect(number).toBe(2)
    })
  });

  const things = ['road', 'track'];
  ScenarioOutline('An Outline', ({ Given }) => {
    Given("a {word}", (thing: string) => {
      expect(thing).toBe(things.shift());
    });
  });
}, './multiple-scenarios.feature');
