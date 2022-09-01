/* eslint-disable */
export default {
  displayName: 'e2e',
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
  coverageDirectory: '../../coverage/packages/e2e',
  moduleNameMapper: {
    '^@workspace/*$': '"dist/packages/*"',
  },
};
