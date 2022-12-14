# DTO & Builder Pattern

This is a simple library for defining DTO (data transfer object) classes with decorators, and automatically generating builder classes
to simplify defining a DTO's data.

[NPM](https://www.npmjs.com/package/@jest-automation/dto)
## Installing

```
npm i -s @jest-automation/dto
```
## DTOs

A DTO is a class with the `@Property` decorator applied to at least one property.

For example:

```ts
import { Property } from '@jest-automation/dto';

export class CreateUserDto {
  @Property
  username!: string;

  @Property
  password!: string;

  @Property
  email?: string;
}
```

## Builders

Now it's possible to generate a builder for this DTO. By passing a
DTO Class to the `Builder` function, a new class will be created with
builder functions corresponding to the DTO properties.

```ts
import { CreateUserDto } from './somewhere';
import { Builder } from '@jest-automation/dto';

const CreateUserBuilder = Builder(CreateUserDTO);

const builder = new CreateUserBuilder();
```

The builder will share property names with the underlying DTO, which
will be methods that take a value to fill in the DTO, and which return the builder instance to allow for chaining.

```ts
builder.username('fredici').password('1234');
```

Type information is generated preventing the wrong type being used for a
param unless explicitly bypassed

```ts
builder.username(1); // tsc error
builder.username(1 as unknown as string); // ok
```

To retrieve the underlying DTO, call the `build` method.

```ts
const result = builder.build();
```

If the package `class-validators` is being used, then their validation
will be executed by the build method. To disable validation, pass `false` to the `build` method.

```ts
const result = builder.build(false);
```