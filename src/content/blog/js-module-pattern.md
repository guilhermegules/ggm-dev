---
title: "JavaScript Module Pattern"
description: "It's a JavaScript pattern, that allows us to create modules with more lexical scope for our functions, create functions for executing simple tasks and immediately execute and help with code organization too."
pubDate: "Feb 08 2021"
heroImage: "/blog-cover-default.png"
---

> Sidenote: ES6 introduced a new feature in javascript called 'modules', they're essentially a syntax for importing and exporting code between JavaScript files. They're powerful and bring a new horizon for javascript development but it's not the subject today.

Today we will talk about **IIFEs** or **Immediately Invoked Functions Expressions**, working with vanilla javascript we can use these functions for better-scoped and responsibilities definition on our code.

## What is IIFE?

It's a JavaScript pattern, that allows us to create modules with more lexical scope for our functions, create functions for executing simple tasks and immediately execute and help with code organization too.

## Creating a module

We will init using an anonymous closure. Thus we create a lexical scope, and the code that it's inside of the scope will be only accessed by the function, including properties too.

```js
(function () {
  // Your functions and variables will be scoped in this function
  // In this case our console.log will be executed immediately
  console.log("My first module");
})();
```

## Exporting module

With that we can use only a returned properties and functions by our module, thus that way keeping our code scoped on the module.

```js
const moduleA = function () {
  const moduleAValue = "Module A";

  function modifyModuleAValue() {
    return `${this.moduleAValue}-123`;
  }

  return {
    getter: () => {
      return moduleAValue;
    },
    modifyModuleAValue,
  };
};
```

## Using IIFE for making simple scripts

With this pattern, we can create simple scripts for immediate execution, a great example is the use of login scripts for adding more agility to the development process:

```js
(() => {
  const user = "myuser@email.com";
  const pass = "secretpass123";
  document.getElementById("user-input").value = user;
  document.getElementById("user-pass").value = pass;
  document.getElementById("submit").click();
})();
```

With this simple script, we can create an automated login.

## IIFE on ES6+

When ES6 was released, it brought some new additions, one of which is `const` and `let`, this type of variable declaration has the scope of blocks, so when we get a `curly braces` block, our let or const has the respective curly braces scope. So we do not need this pattern all the time but the knowledge always helps in certain situations.

Thanks for reading I hope that was useful.

## Helpful links

- [Learning JavaScript Design Patterns](https://www.patterns.dev/vanilla/module-pattern)
- [MDN Web Docs - IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
