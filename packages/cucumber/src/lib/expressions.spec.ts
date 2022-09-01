import {
  CucumberExpression,
  ParameterTypeRegistry,
} from '@cucumber/cucumber-expressions';
import { PreparedStepGroup, StepData } from './types';
import {
  findMatchingExpression,
} from './expressions';
test('exr', () => {
  const stepExpression = 'a {int} step';
  const cucumberExpression = new CucumberExpression(
    stepExpression,
    new ParameterTypeRegistry()
  );
  const [res] = cucumberExpression.match('a 2 step');
  console.log(res.parameterType.transform(res, [res.group.value]))

  // const {transform} = res.parameterType;
  // console.log(transform(undefined, ['0']));
});
describe('findMatchingExpression', () => {
  it('should match an expression', () => {
    const stepExpression = 'a {word} step';
    const group = {
      __keyword__: 'Given',
      [stepExpression]: new StepData('a {word} step', undefined, jest.fn()),
    };

    const { expression, args } = findMatchingExpression(
      'a giant step',
      group as unknown as PreparedStepGroup
    );
    const [argument] = args;
    expect(expression).toBe(stepExpression);
    expect(argument).toBe('giant');
  });
});