import {
  Argument,
  CucumberExpression,
  ParameterTypeRegistry,
} from '@cucumber/cucumber-expressions';
import { PreparedStepGroup } from './types';

export type ExpressionMatch = {
    expression: string,
    args: readonly Argument[]
}

export function findMatchingExpression(
  text: string,
  group: PreparedStepGroup
): ExpressionMatch | null {
  for (const stepName in group) {
    const cucumberExpression = new CucumberExpression(
      stepName,
      new ParameterTypeRegistry()
    );
    const match = cucumberExpression.match(text);
    if(match){
        return {expression: stepName, args: match}
    }
  }
  return null;
}

export function getExpressionVariables({expression, args}: ExpressionMatch) {
  let replacedText = expression;
  const variables = [];
  for (const { group, parameterType } of args) {
    const { value, values } = group;
    const { name } = parameterType;
    replacedText = replacedText.replace(`{${name}}`, value);
    variables.push(value);
    variables.concat(values)
  }
  return { text: replacedText, variables };
}
