---
id: zero-to-hero
sidebar_position: 1
title: Zero to Hero
description: 'Introducing TypeScript'
draft: true
---

These days, in order to competitive in the frontend/Node.js world, you need to know TypeScript.

While the JavaScript you know and love is great, once things start to get even a little bit complex, you'll start to run into issues keeping everything straight. Consider this example:

```ts
const userColorMap = new Map({
  123: ['red', 'blue', 'green'],
  456: ['yellow', 'purple', 'orange'],
  789: ['pink', 'black', 'white'],
});

const userFavouriteColors = (userId) => {
  return userColorMap.get(userId);
};
```

Seems pretty simple right? Then let's say we use this function like this:

```ts
const favouriteColors = userFavouriteColors('123');
// Add a new color to the user's favourite colors
favouriteColors.push('brown');`
```

Looking good so far right? But what if we did this:

```ts
const favouriteColors = userFavouriteColors('000');
// Add a new color to the user's favourite colors
favouriteColors.push('brown');`
```

What would happen here? We'd get an all-too-familiar error:

`TypeError: Cannot read properties of null (reading 'push')`

What's the issue here? Well, we passed in a string that wasn't in our map (`'000'`), so we got back `null`, and when we tried to call `push` on it, we got an error.

But let's say we are super smart developers, which we all are. Perhaps we would've done something like this:

```ts
const favouriteColors = userFavouriteColors('000') || [];
// Add a new color to the user's favourite colors
favouriteColors.push('brown');
```

Then we'd get no error, which is great. But that does mean we have to really know the internals of the function we're calling so that we can treat its output correctly.

If only there was a way to know ahead of time that `userFavouriteColors` might return `null`, and we should handle that case! Enter TypeScript.

### What is TypeScript?

TypeScript is a programming language that is a superset of JavaScript. This means that any valid JavaScript code is also valid TypeScript code. We'll get more into the details of how it works under the hood later, but for now let's look at some code.

Let's look at some simple JavaScript code:

```ts
let x = 10;
x = 'hello';
console.log(x);
```

This code will run just fine, and we'll get `hello` as the output. With TypeScript, we can add type annotations to our variables to ensure that they are of a certain type. Let's say in the above case we want `x` to always be a number. We can do this:

```ts
let x: number = 10;
x = 'hello';
console.log(x);
```

If this is your first time seeing TypeScript, the `: number` will be new to you! This is a type annotation, and it tells TypeScript that `x` should always be a number. If we try to assign a string to `x`, we'll get an error:

```ts
Type 'string' is not assignable to type 'number'.
```

This is great! Now we know that `x` is always a number, and if we try to assign a string to it, TypeScript will warn us.

### Basic types

There are several basic types in TypeScript:

- `number`: this is for any number, including integers and floating point numbers
- `string`: this is for any string value
- `boolean`: this is for any boolean value (`true` or `false`)
- `symbol`: this is for unique identifiers created via `Symbol()` (often used as object keys—if you haven't really used symbols before, don't worry about it too much)
- `null`: this is for the value `null`
- `undefined`: this is for the value `undefined`

If you're coming from other languages besides JavaScript, you might be used to differentiating between integers and floating point numbers, and between strings and characters. Since TypeScript is a superset of JavaScript, and JavaScript doesn't make this distinction, TypeScript doesn't either. In JavaScript, both `10` and `10.0` are numbers, and there is no concept of a single character string type like there is in other languages.

#### TypeScript playground

Now that we're starting to see some code, let's try running some TypeScript code! Setting up TypeScript in your dev environment is pretty easy, but there can be a couple hiccups that you might run into. There's a ton of articles out there for setting up TypeScript locally, but for this article, open up the TypeScript playground [here](https://www.typescriptlang.org/play). This let's you try writing TypeScript code in your browser without having to set up a dev environment!

Try running the following code in the TypeScript playground:

```ts
let n: number = 10;
let s: string = 'hello';
let b: boolean = true;
let nullValue: null = null;
let undefinedValue: undefined = undefined;
console.log(n.length);
console.log(s.length);
console.log(b.length);
```

You'll see right away that the first and third line are underlined in red, letting you know that there's an issue. Pretty cool right? The errors will say something like `Property 'length' does not exist on type 'number'.` This is an error straight from the TypeScript compiler letting us know that something is going to go wrong before you even run the code. Nice!

#### A quick technical note

We just mentioned "the TypeScript compiler". This is because TypeScript is a compiled language, meaning that the code that's actually run is JavaScript that has been transformed from your TypeScript code. When TypeScript compiles your code, it checks for errors and will let you know if there are any issues just as we saw in the example above. The type annotation that you add to your TypeScript code don't actually change the runtime behaviour of your code—they only exist to help TypeScript know what types your variables are.

#### Two more types: `any` and `unknown`

There are two more types that are worth knowing about: `any` and `unknown`.

`any` is a type that disables all type checking for a variable. This means that if you give the variable `x` the type `any`, TypeScript will not check any type annotations on `x`, and you can set any value to it. You'll see this used in codebases that are slowly transitioning to TypeScript. It's much more difficult to start with `any` and gradually remove type annotations, so I'd highly recommend starting with real types as much as possible.

`unknown` is a type that represents any value. You can think of it as a type-safe version of `any`. If you try do anything with an `unknown` value, you'll have to perform some runtime checks to see if it's safe to do so first. See the "type narrowing" section below for more information about this.

### Arrays

Now that we know the basic types (number, string, boolean), let's look at how to use arrays in TypeScript:

```ts
let numbers: number[] = [1, 2, 3];
let strings: string[] = ['a', 'b', 'c'];
let booleans: boolean[] = [true, false, true];

// This would error:
booleans.push('hello');
```

So far this should look familiar: you're used to using square brackets creating arrays in JavaScript, and now in TypeScript, you create an array type by using the type name followed by square brackets (`[]`).

### Tuples

Tuples are a special type of array that is made possible in TypeScript: they are arrays with a fixed length and a fixed type for each index. Here's an example:

```ts
type ColorCount = [number, string];

let redCount: ColorCount = [1, 'red'];

// This line will error (type mismatch)
let invalidCount: ColorCount = ['hello', 'world'];

// This line will also error (too many elements)
let invalidSizeCount: ColorCount = [1, 'red', 'blue'];
```

This tuple has a length of 2, the first element is a `number` and the second element is a `string`. The `invalidCount` line will error because the first index was given as a `string` instead of a `number`.

### Functions

Functions in TypeScript have a few moving parts. Let's take a look at a complete example and break down each part one by one:

```ts
const isGreaterThan = (a: number, b: number): boolean => {
  return a > b;
};

// or equivalently:
function isGreaterThan(a: number, b: number): boolean {
  return a > b;
}
```

The first thing to note is that since you can create JavaScript functions in two different ways, so we have also have two slightly different syntaxes for annotating functions in TypeScript.

1.  First you have the parameters within the parentheses. You can see that each parameter has its own type.
2.  After the parentheses, you have a colon (`:`) followed by the return type of the function. In this case, we're saying that `isGreaterThan` will return a `boolean` value. Note that for the arrow function syntax, you need to put the arrow (`=>`) after the return type.

### Typing functions as variables

Above you can see how you'd add type annotations to a function. But what if your function is in a variable? Or if it's a parameter of another function? Consider the following JavaScript code:

```ts
const createUser = (id, onComplete) => {
  const newUser = {
    id,
  };
  onComplete(newUser);
};
```

In this example, we're saying that `createUser` takes two parameters: `id` and `onComplete`. `id` is a `string`, and `onComplete` is a function that takes a `User` as a parameter and does something with it. This is how we would type it:

```ts
const createUser = (id: string, onComplete: (user: User) => void) => {
  const newUser = {
    id,
  };
  onComplete(newUser);
};
```

`onComplete` gets the type `(user: User) => void`. It looks a lot like how we would annotate a function as a variable: you have the parameter list within parentheses, followed by an arrow (`=>`) then the return type. You haven't seen `void` yet: it's a type that means that the function doesn't return anything. You could also type it like this:

```ts
type OnComplete = (user: User) => void;

const createUser = (id: string, onComplete: OnComplete) => {
  const newUser = {
    id,
  };
  onComplete(newUser);
};
```

### Default parameters

To properly type functions with default parameters, the syntax looks like this:

```ts
const createUser = (id: string, name: string = 'John Doe') => {
  return {
    id,
    name,
  };
};
```

### Rest parameters

Rest parameters in JavaScript look like this:

```ts
const someFunction = (...args) => {
  console.log(args);
};

// or with objects:
const someFunction = ({ a, ...rest }) => {
  console.log(a, rest);
};
```

To properly type rest parameters, you would write TypeScript like this:

```ts
const someFunction = (...args: number[]) => {
  console.log(args);
};

// or with objects:
const someFunction = ({ a, ...rest }: { a: number; b: number; c: number }) => {
  console.log(a, rest); // `rest` is of type `{ b: number, c: number }`
};
```

### Function overloading

Function overloading is an advanced feature of TypeScript that allows you to define multiple functions with the same name but different parameters. You will likely not need this too often, so I'll cover this in a future article. For your reference though, it'll look something like this:

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
```

If you're just getting started with TypeScript, don't worry about this too much for now!

### Enums

Enums don't have any special notation in TypeScript. The only thing to say about enums is that now that you're using TypeScript, you may end up liking using string union types a lot more (I know I do). Check out the string union type section below!

### Combining types: union and intersection types

Let's revisit our original example of the `userFavouriteColors` function:

```ts
const userColorMap = new Map({
  123: ['red', 'blue', 'green'],
  456: ['yellow', 'purple', 'orange'],
  789: ['pink', 'black', 'white'],
});

const userFavouriteColors = (userId) => {
  return userColorMap.get(userId);
};
```

We know that the map will either return an array of strings _or_ `undefined`. So far we've only seen single types, but in TypeScript you can also combine types using the pipe symbol (`|`):

```ts
const userFavouriteColors = (userId: string): string[] | undefined => {
  return userColorMap.get(userId);
};
```

What this now means is that we're saying that `userFavouriteColors` will return either a `string[]` (an array of strings) or `undefined`. This is called a **union type**. Now let's try and do the `push` we wanted to do originally:

```ts
const userColorMap = new Map<string, string[]>({
  '123': ['red', 'blue', 'green'],
  '456': ['yellow', 'purple', 'orange'],
  '789': ['pink', 'black', 'white'],
});
const userFavouriteColors = (userId: string): string[] | undefined => {
  return userColorMap.get(userId);
};
const favouriteColors = userFavouriteColors('000');
favouriteColors.push('brown');
```

Try plugging this into the TypeScript playground and see what errors you get. You should get something that looks like this:

```ts
'favouriteColors' is possibly 'undefined'.
```

Perfect, that's very useful! While we probably could've recognized that in our heads in JavaScript, TypeScript is helping us out by telling us that `favouriteColors` might be `undefined`. In complex (or even not complex) projects, this will save you so many headaches as your project grows.

To fix the above error, we could write something like this:

```ts
const favouriteColors = userFavouriteColors('000');
if (favouriteColors) {
  favouriteColors.push('brown');
}
```

That's just one option—we could also throw an error if `favouriteColors` is `undefined` or some other behaviour.

Intersection types work similarly, but function like an `and` rather than an `or`, and uses the `&` symbol:

```ts
interface User {
  id: string;
}

type UserWithRole = User & {
  role: string;
};

const someUser: UserWithRole = {
  id: '123',
  role: 'admin',
};
```

### String union types

One of the most common union types you'll see is a string union type. This is when you want to limit the allowed values of a string to a certain set of values. Let's say you were writing a game and you wanted to represent the direction a player could move in. You could do this:

```ts
type Direction = 'up' | 'down' | 'left' | 'right';

const move = (direction: Direction) => {
  console.log(direction); // `direction` is of type `Direction`, so we are certain it will be one of the four values
};
```

### Type narrowing

Take a look at this example again:

```ts
const favouriteColors = userFavouriteColors('000');
if (favouriteColors) {
  favouriteColors.push('brown');
}
```

If you are a keen-eyed reader, you might have wondered to yourself: how does TypeScript know that `favouriteColors` is not `undefined` inside the `if` statement and allow the `push` to compile without errors? This is the topic of type narrowing!

As TypeScript "reads" your code, it can infer information about types depending on the context. In this example, even though the type of `favouriteColors` is `string[] | undefined`, inside the `if` statement, TypeScript knows that since we checked that `favouriteColors` is not `undefined`, it must be a `string[]`.

If you hover over `favouriteColors` inside the `if` statement, you'll see that TypeScript has narrowed the type to `string[]`, and if hover over `favouriteColors` outside the `if` statement, you'll see that TypeScript still thinks the type is `string[] | undefined`.

### Type inference

So far we've seen how to annotate types in TypeScript, but surely we don't want to write out the type of every variable. Thankfully, TypeScript can often infer the type of a variable based on how we use it.

Earlier we saw this example:

```ts
let x: number = 10;
x = 'hello'; // This line has an error because we said that `x` is a `number`
```

But we can actually remove the type annotation on `x` and TypeScript will infer that `x` is a `number`:

```ts
let x = 10;
x = 'hello'; // This line will still error
```

In this case, based on the initial assignment of `10`, TypeScript knows that `x` must be a `number`. The same goes for functions:

```ts
const add = (a: number, b: number) => {
  const result = a + b;
  return result;
};
```

You can't infer the parameter types, but you can see above that there's no return type. That's because TypeScript is inferring the return type based on the `result` variable.

In practice, you'll let TypeScript infer types where possible as it's a big time saver. There are two main reasons why would want to explicitly annotate types.

**1. When the initial value isn't enough to infer the type**

Consider this example:

```ts
let numOrString = 10;
numOrString = 'hello'; // This line will error
```

Here we're saying we want to be able to set the variable `numOrString` to either a `number` or a `string`, but as it stands, TypeScript will infer that `numOrString` is a `number`. Instead, we need to explicitly annotate the type:

```ts
let numOrString: number | string = 10;
numOrString = 'hello'; // This line will no longer error
```

**2. Defensive programming**

Sometimes (most of the time if you're me) you're your own worst enemy. You write some code today, come back to it a few months later, forget a bit about what you were doing, make some changes, and now things are broken. Consider this change to the `add` function from above:

```ts
const add = (a: number, b: number) => {
  const result = a + b;
  return `${result}`;
};
```

Did you notice that I changed the return type to a `string`? With type inference, TypeScript won't throw an error here because it's 100% valid: you have a function that now returns a `string`. Perhaps I'd do this because I forgot that I originally intended this function to return a `number`. To combat this, we can explicitly annotate the return type:

```ts
const add = (a: number, b: number): number => {
  const result = a + b;
  return result;
};
```

Now if I were to change the return type to a `string`, TypeScript would throw an error on the `return` keyword:

```ts
const add = (a: number, b: number): number => {
  const result = a + b;
  return `${result}`; // Type 'string' is not assignable to type 'number'.
};
```

In practice it can be very valuable to explicitly annotate return types despite that TypeScript can often infer them, especially as your codebase grows.

### Type assertions

Type assertions are when you tell TypeScript that a value is of a certain type even if it isn't. This is usually not ideal, but can be useful in certain situations. Most recently I was working with a third party library that was typed in a complex way that was causing errors. Through testing via `console.log` statements, I was able to narrow down the type that was actually being used and then use a type assertion to bypass the type error.

Let's pretend that in the following bit of code, `numFunction` is a function from a third party library that returns a `number`, but instead the developer somehow typed it as returning a `string`. We could fix that in our code by using a type assertion:

```ts
const result = numFunction();
const resultNumber = result as number; // We're telling TypeScript that `result` is actually a `number`
```

### Type aliases

Type aliases are like variables for types. They're useful for when you have complex types that you want to reuse in multiple places.

```ts
type StringOrNumber = string | number;
const someFunction = (value: StringOrNumber): StringOrNumber => {
  return value;
};
```

To create a type alias, you use the `type` keyword followed by the name of the type alias and set it equal to the type you want to alias.

### Types for objects: interfaces

Interfaces are how we create types for objects in TypeScript (well, one way, but we'll get to that!).

```ts
interface User {
  id: string;
  name: string;
}

const someUser: User = {
  id: '123',
  name: 'John Doe',
};

someUser.name = 3; // This line will error since `name` should be a `string`

const anotherUser: User = {
  // This `User` is missing the `name` property, so this line will also error
  id: '123',
};
```

This annotation has a few parts:

1.  The `interface` keyword
2.  The name of the interface, in this case `User`
3.  The properties that the interface has, in this case `id` and `name`, each of which is a `string`

The properties an interface are the keys of the object. The properties can be any type, including other interfaces.

You'll use interfaces everywhere in your TypeScript projects—you'll be seeing these a lot!

### Optional properties

What if we wanted to make the `name` property optional? We can do this by adding a question mark (`?`) after the property name:

```ts
interface User {
  id: string;
  name?: string;
}

// This is equivalent to:
interface User {
  id: string;
  name: string | undefined;
}
```

### Readonly properties

In plain JavaScript, you can change the value of a property on an object at any time. It's not possible to mark properties as read-only and prevent them from being changed. In TypeScript, you can do this by adding the `readonly` modifier to the property:

```ts
interface User {
  readonly id: string;
}

const someUser: User = {
  id: '123',
};

someUser.id = '456'; // This line will error
```

### Extending interfaces

If you're familiar with object-oriented programming, you'll be familiar with the idea of "extending" a class. Interfaces work in a very similar way.

```ts
interface User {
  id: string;
}

interface UserWithRole extends User {
  role: string;
}

const someUser: UserWithRole = {
  id: '123',
  role: 'admin',
};
```

In this example, `UserWithRole` has all the properties of `User` plus an additional `role` property.

Let's try and break it a bit. What happens if we do this:

```ts
const someUser: User = {
  id: '123',
  role: 'admin',
};
```

You'll get an error saying that `User` doesn't have a `role` property. What about this?

```ts
const processUser = (user: User) => {
  console.log(user);
};

const someUser: UserWithRole = {
  id: '123',
  role: 'admin',
};

processUser(someUser);
```

No errors on this one! `processUser` expects a `User` type, and `someUser` is a `UserWithRole` type, and since `UserWithRole` extends `User`, it has the expected properties. Let's try one more:

```ts
const processUser = (user: User) => {
  console.log(user);
};

processUser({ id: '123' });
```

No errors either! That may seem unexpected depending on what you're used to in other programming languages. This highlights that TypeScript checks if the object has the expected properties, not if it has the exact type. So even though the object we're passing in wasn't explicitly typed as a `User`, TypeScript will check if it has the properties that a `User` is expected to have.

### TypeScript trivia: `interface` vs `type`

If there's any one question you'll ask or be asked about TypeScript, it's probably going to be about the difference between `interface` and `type`. This is because both of these are valid:

```ts
interface User {
  id: string;
  name: string;
}

type User = {
  id: string;
  name: string;
};
```

So what's the difference? As they are, they function exactly the same. Extending them however, is a different story. Interfaces can extend other interfaces, but interfaces cannot extend types. Types cannot extend types in the sense of using `extends`, but you can use `|` to combine them as we saw above with union types.

All of these are valid:

```ts
interface User {
  id: string;
  name: string;
}

interface UserWithRole extends User {
  role: string;
}

type UserOrNumber =
  | {
      id: string;
      name: string;
    }
  | number;
```

All of these are invalid:

```ts
interface UserWithRole extends UserOrNumber { // `extends`can only be used with interfaces or the`object` type
role: string;
}

interface User {
id: string;
name: string;
} | number; // `|` can only be used with types
```

### The `object` type

You probably noticed I mentioned the `object` type in the comments in the last example. The `object` type is a type that represents any non-primitive value, including `symbol`s and `null`. You also can't access any properties on it. So even though in name, you might expect it to be the main type that you'd use to represent an object, you won't see it very often if at all.

```ts
const someObject: object = {
  id: '123',
};

someObject.id; // This line will error
```

### Using the type of properties of an interface

Let's say you already have an interface and you want to get the type of a property of that interface. You can do this:

```ts
interface DataResponse {
  data: {
    id: string;
    name: string;
  };
  success: boolean;
}

type Data = DataResponse['data']; // { id: string; name: string; }
```

This can be useful if have an interface that contains a type, but that type itself hasn't been given separately. In this above example (let's say it's from a third party library), even though they didn't provide a type for `data`, you can get the type of `data` by using the syntax above.

### Discriminated unions

Discriminated unions are a fancy way of using TypeScript to represent a set of a few possible objects that share a common key. It's easier to see an example:

```ts
type ApiResponse =
  | {
      type: 'success';
      data: {
        id: string;
        name: string;
      };
    }
  | {
      type: 'error';
      error: {
        code: number;
        message: string;
      };
    };
```

The type `ApiResponse` is a discriminated union of two types. They both have a `type` property, but the value of `type` is different for each. Besides the `type` property, the `success` type has a `data` property and the `error` type has an `error` property.

So why is this interesting? It allows us to do something like this:

```ts
const handleResponse = (response: ApiResponse) => {
  if (response.type === 'success') {
    console.log(response.data.name);
  } else {
    console.log(response.error.message);
  }
};
```

In this example, TypeScript knows that if `response.type` is `'success'`, then `response.data` must exist. If `response.type` is `'error'`, then `response.error` must exist. Without the discriminated union, we'd have to do a type assertion using `as` which is not as nice.

Like I said, discriminated unions are a bit more advanced, but it's a great tool to at least be aware of!

### Typeof

So far we've created types and then created variables that use those types. But what if we have a variable and want the type of that variable? TypeScript comes with a `typeof` operator to get the type of a variable:

```ts
const someString = 'hello';
type SomeStringType = typeof someString; // SomeStringType is `string`
```

### Using typeof with arrays

If you have an array, you can get the type of the elements in the array like this:

```ts
const words = ['hello', 'world'];
type WordsType = (typeof words)[number]; // WordsType is `string`
```

This syntax looks a bit weird at first. Remember how earlier we said you can access the type of a property of an object using `interfaceName['propertyName']`? This is very similar, except instead of an object, you use an array.

Remember that arrays are indexed by numbers (i.e. you can do `words[0]`, `words[1]`, etc.). So `words[number]` is saying "the type of an element in the array that can be indexed by a number" (or at least that's how I think about it). So then `typeof words[number]` is saying "the type of a value that can be an element in the array".

If that explanation doesn't work for you, it's okay to just memorize the syntax as it is!

### as const

There's one more operator I want to mention that can be useful: `as const`. This is a type assertion that tells TypeScript to treat a value as a literal type when it's inferring it.

```ts
const someString = 'hello';
type SomeStringType = typeof someString; // SomeStringType is `string`

type SomeStringLiteralType = typeof someString as const; // SomeStringLiteralType is `'hello'`
```

See the difference? Without using `as const`, TypeScript infers that `someString` is a `string`, but with `as const`, TypeScript infers that `someString` is a `'hello'` string specifically.

The way I see this come up most often is with arrays:

```ts
const dialogOptions = ['confirm', 'cancel'] as const;
type OptionType = typeof dialogOptions[number]; // OptionType is `'confirm' | 'cancel'

type OptionLiteralType = typeof dialogOptions[number] as const; // OptionLiteralType is `'confirm' | 'cancel'`

```

Remember, since TypeScript is a compiler, the types don't exist at runtime. So this means you can't iterate over a list of types in a union with any sort of `.forEach` or `.map`! The above example is a way to use a list of values also as a union type.

### Generics

Generics are a powerful feature of TypeScript that allow you to create reusable functions and types that can work with multiple types. Writing and using TypeScript generics can get as crazy as you want it to be, so I'll cover it in more detail in a future article.

There are however a few generic types you should be very comfortable with. Let's take a look at the syntax:

```ts
const genericFunction = <T>(value: T): T => {
  return value;
};

// or
// function genericFunction<T>(value: T): T {
// return value;
// }

type T1 = genericFunction<string>'hello'; // return type is `string`
type T2 = genericFunction<number>123; // return type is `number`
```

In this example, we're saying that `genericFunction` has a generic type called `T`. Whatever that type is, `genericFunction` requires a single parameter called `value` of that type, and it also returns a value of that type.

### Most important built-in generic types

There are a handful of built-in generic types that you'll use a lot.

- `Record<K, V>`: an object with keys of `K` and values of `V` (i.e. `K` is the key type and `V` is the value type)
- `Partial<T>`: an object in the shape of `T` but with all properties optional
- `Pick<T, K>`: an object in the shape of `T` but with only the properties in `K`, eg. `Pick<{ id: string, name: string }, 'id'>` is an object with an `id` property but no `name` property
- `Omit<T, K>`: does the reverse of `Pick`, omitting the properties in `K` from `T`
- `Promise<T>`: a promise that will resolve to `T`
- `Awaited<T>`: the type of the value a promise will resolve to (eg. if you have a `Promise<string>`, the `Awaited<Promise<string>>` is `string`)
- `Array<T>`: an array of `T`, equivalent to `T[]`
- `Map<K, V>`: a map of `K` to `V` (i.e. `K` is the key type and `V` is the value type)
- `Set<T>`: a set of `T`
- `Nullable<T>`: a type that is `T` or `null`
- `ReturnType<T>`: the return type of a function `T`
- `Parameters<T>`: the parameters of a function `T`

`Record<K, V>` is probably the most important of these. You'll use it all the time to represent objects of various kinds:

```ts
const someObject: Record<string, number> = {
  hello: 1,
  world: 2,
};

someObject.hello; // This line will error since `hello` is not a key on `someObject`
someObject['hello']; // This line will not error, but the result will be `number | undefined` since TypeScript doesn't know what keys are on `someObject`, just that they are of type `string`
someObject['newkey'] = 3; // This line will not error, a new value can be added since the key and value types are correct
someObject[4] = 3; // This line will error since `4` is not of type `string` and the keys must be of type `string`
someObject['hello'] = 'world'; // This line will error since the values must be of type `number` ``
```

Unlike the other ways of representing objects, you can add any keys to a `Record<K, V>` as long as they are of type `K`.

Also, for the "record" (ha, pun intended), there's an equivalent way of writing `Record<K, V>`:

```ts
const someObject: { [key: string]: number } = {
  hello: 1,
  world: 2,
};

// is equivalent to
const someObject: Record<string, number> = {
  hello: 1,
  world: 2,
};
```

### Classes

Classes look quite a bit different in TypeScript compared to how they look in JavaScript.

```ts
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }
}
```

In TypeScript, this class would look like this:

```ts
class User {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello(): void {
    console.log(`Hello, ${this.name}!`);
  }
}
```

There's a few new pieces here:

- The `name` variable is declared with a type of `string` before it can be accessed in the constructor
- The `name` variable has a `public` modifier, which means it can be accessed anywhere (the other options are `private` and `protected`, meaning it can only be accessed within the class or subclasses, respectively)
- The constructor parameters are typed
- The class function `sayHello` has a return type of `void` specified

### Cheat sheet

Give yourself a pat on the back, you've made so much progress in TypeScript! That was a lot though, so here's a cheat sheet for you to reference:

```ts
// -----
// Basic types
// -----
const stringValue: string = 'hello';
const numberValue: number = 123;
const booleanValue: boolean = true;
const nullValue: null = null;
const undefinedValue: undefined = undefined;
// const anyValue: any = 'hello'; // Avoid using `any` if possible

// -----
// Union types
// -----
type StringOrNumber = string | number;

// -----
// Functions
// -----
const add = (a: number, b: number): number => {
  return a + b;
};
// or
function add(a: number, b: number): number {
  return a + b;
}
// Function returning void
const log = (message: string): void => {
  console.log(message);
};
// Function using an object parameter
const processUser = (user: { id: string; name: string }): void => {
  console.log(user);
};
// Function with optional parameter
const logOptional = (message?: string): void => {
  console.log(message);
};
// Function with rest parameter
const logRest = (...messages: string[]): void => {
  console.log(messages);
};
logRest('message1', 'message2');

// -----
// Type assertions
// -----
const result = someThirdPartyFunction();
const typedResult = result as number;

// -----
// Interfaces
// -----
interface User {
  id: string;
  name: string;
}
// Extending interface
interface AdminUser extends User {
  role: string;
}
// Using type for objects
type UserOrNumber = {
  id: string;
  name: string;
};
// Optional properties
interface UserWithOptionalValues {
  id: string;
  name?: string;
  role?: string;
}
// Intersection types
type UserWithRole = User & { role: string };
// Getting types of properties of an interface
type Data = DataResponse['data'];
// Discriminated unions
type ApiResponse =
  | {
      type: 'success';
      data: {
        id: string;
        name: string;
      };
    }
  | {
      type: 'error';
      error: {
        code: number;
        message: string;
      };
  };

// -----
// Using typeof
// -----
const someString = 'hello';
type SomeConstStringType = typeof someString; // SomeConstStringType is `hello`

let someString = 'hello';
type SomeLetStringType = typeof someString; // SomeLetStringType это `string`

// Using typeof with arrays
const words = ['hello', 'world'];
type WordsType = typeof words[number]; // WordsType is `string`

// -----
// Using as const
// -----
const someString = 'hello';
type SomeStringLiteralType = typeof someString as const; // SomeStringLiteralType is `hello`

// -----
// Generics
// -----
const genericFunction = <T>(value: T): T => {
  return value;
};

// Most important built-in generic types
type RecordType = Record<string, number>;
type PartialType = Partial<User>;
type PickType = Pick<User, 'id'>;
type OmitType = Omit<User, 'id'>;
type PromiseType = Promise<string>;
type AwaitedType = Awaited<Promise<string>>;
type ArrayType = Array<string>;
type MapType = Map<string, number>;
type SetType = Set<string>;
type NullableType = Nullable<string>;
type ReturnType = ReturnType<() => string>;
type ParametersType = Parameters<(a: number, b: number) => number>;

// -----
// Classes
// -----
class User {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello(): void {
    console.log(`Hello, ${this.name}!`);
  }
}
```

Happy typing!
