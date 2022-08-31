import {
  Argument,
  Group,
  ParameterType,
} from '@cucumber/cucumber-expressions';
import { PreparedStepGroup, StepData } from './types';
import {
  ExpressionMatch,
  findMatchingExpression,
  getExpressionVariables,
} from './expressions';

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
    const { group: argGroup, parameterType } = argument;
    const { value } = argGroup;
    const { name } = parameterType;
    expect(expression).toBe(stepExpression);
    expect(name).toBe('word');
    expect(value).toBe('giant');
  });
});

describe('getExpressionVariables', () => {
  it('should get the variables from a step expression', () => {
    const match: ExpressionMatch = {
      expression: 'a {word} step',
      args: [
        new Argument(
          new Group('giant', 0, 0, []),
          new ParameterType<string>(
            'word',
            / /,
            jest.fn(),
            jest.fn(),
            false,
            false
          )
        ),
      ],
    };
    const {text, variables} = getExpressionVariables(match)
    expect(text).toBe('a giant step')
    expect(variables).toStrictEqual(['giant'])
  });
});
