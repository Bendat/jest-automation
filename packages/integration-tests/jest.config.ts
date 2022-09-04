/* eslint-disable */
export default {
  displayName: 'integration-tests',
  preset: '../../jest.preset.js',
  testMatch: ['**/*.steps.ts', '**/*.spec.ts'],
  setupFilesAfterEnv: ['./automation.setup.ts'],
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
  coverageDirectory: '../../coverage/packages/integration-tests',
};
