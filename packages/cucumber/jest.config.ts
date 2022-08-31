/* eslint-disable */
export default {
  displayName: 'cucumber',
  preset: '../../jest.preset.js',
  testMatch: ['**/*.steps.ts', '**/*.spec.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/cucumber',
};
