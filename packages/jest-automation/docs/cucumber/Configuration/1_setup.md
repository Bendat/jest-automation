# Setup & Configuration

To start configuring `jest-automation`, create a file near the root of your project called `jest-automation.setup.ts` and add it to `jest.config.[j|t]s` as a setup file.

```ts title='jest.config.ts'
export default {
  setupFilesAfterEnv: ['reflect-metadata', './jest-automation.setup.ts'],
}
```
:::info
If a flag has a corresponding environment variable,
the environment variable when set will be prioritized.

E.g. if something is enabled in setup but "false" in a env variable, the flag will not be enabled
:::
From this new setup file you can configure the framework:

## [- Flags](./flags)
