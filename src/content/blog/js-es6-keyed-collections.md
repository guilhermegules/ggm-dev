---
title: "JavaScript ES6 keyed collections"
description: "JavaScript has some built-in structures introduced on es6 version, even though these data structures have some time of existence has many developers has doubt about how to use them, today I wanna try to clarify the information about these."
pubDate: "Aug 02 2021"
heroImage: "/blog-cover-default.png"
---

## **Introduction**

With Data Structures we can store, organize, order and handle data. We need to understand how and when use determinate structures.

JavaScript has some built-in structures introduced on es6 version, even though these data structures have some time of existence has many developers has doubt about how to use them, today I wanna try to clarify the information about these.

## **Map**

Map is an object and works as a common object, the major difference between them is because map lets you work with internal functions to make the insertion, deletion or get one element with a more simplistic form.

Also, Map only permit a unique key with diferents values. So if I create a map like this:

```jsx
const map = new Map();

map.set("first", 1);

console.log(map.get("first")); // 1

map.set("first", 100);

console.log(map.get("first")); // 100

console.log(map.size); // 1
```

We can note the value is changed but only one key as stored on our Map.

Map is iterable, so we can use a for..of or for each to iterate through our structure and make operations there.

```jsx
const map = new Map();

map.set("first", 1);

map.set("second", 2);

for (let item of map) {
  console.log(item);
}

for (let [key, value] of map.entries()) {
  console.log(key, value);
}

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

map.forEach((item, key) => {
  console.log(key, item);
});
```

With `for...of` each iteration return an array like this `[key, value]`, with `forEach` on each we have three parameters, first the value, them the key and finally the map itself.

### **Why/When use Map?**

We wanna use Map structure when it's necessary to keep control of information about the object, and we need to keep keys unique, also Map has a simple usage, so it's simple to get used to using.

## **WeakMap**

WeakMap is a collection of key/value in which keys are weakly referenced.

Because keys are weakly referenced, they cannot be enumerated, so we can't iterate them like Map and cannot obtain the keys.

We can use WeakMaps like this:

```jsx
const weakMap = new WeakMap();

const value1 = {};

const value2 = function () {};

const value3 = "I'm the third value";

const value4 = { foo: "foo" };

const value5 = { key: "foo" };

weakMap.set(value1, value2);

console.log(weakMap.has(value3)); // false

// Returns the value based on key, in this case function() {}
console.log(weakMap.get(value1));

weakMap.delete(value1);

weakMap.set(value5, value4);

// Using a object that already in memory, we can access the position
console.log(weakMap.get(value5));

weakMap.set({ myKey: "myKey" }, { value: 1 });

// Will return undefined, because the object on function
// call is one and the object on the set function is another
console.log(weakMap.get({ myKey: "myKey" }));
```

_Note: We can't use primitives values like keys with WeakMaps_

### **Why/When use WeakMap?**

Some use cases for WeakMaps, [here](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap) have some discussion on the topic, here I will put some tests and my understandings about the data structure:

- When we need to handle some private data and do not want to iterate that data, only getting the specific property, WeakMap can be a good choice.

## **Set**

Sets are collections that permits the storage of any type of unique values. With sets we can avoid duplicate data, remembering that objects references can be added like a new value too.

We can use Sets like that:

/code

Like Maps, Sets can also be iterated:

```jsx
const set = new Set();

set.add(1);

set.add("text");

set.add({ foo: "bar", bar: "foo" });

for (let item of set) {
  console.log(item);
}

// Keys will have the inserted values

for (let item of set.keys()) {
  console.log(item);
}

/**
 * key and values are the same here
 */
for (let [key, value] of set.entries()) {
  console.log(key);
  console.log(value);
}
```

Using spread operator we can create a copy of a Set and use as an array:

```jsx
const set = new Set();

set.add(1);

set.add("text");

set.add({ foo: "bar", bar: "foo" });

const setToArray = [...set];

setToArray.forEach((item) => {
  console.log(item);
});
```

### **Why/When use Set?**

We would like to use Sets when it's necessary to keep unique values without the need to use key/value on our structure. For that Sets are the best choice because they will keep the consistency of our data.

_Note: it's valid to think about the objects references example because even though you pass the same object to the set, it will be saved because are different references._

## **WeakSet**

WeakSet objects permit you to store weakly held objects. Like as Set collection, WeakSet will permits each object occurrence only once.

- **What the difference of WeakSet and Set?** WeakSet only accepts objects, so they cannot contain any values like Sets. Another difference is like the WeakMap, WeakSet has weak references of the objects they held, if no other references of an object store exist this object can be garbage collected. Last but not less important, the WeekMap collection cannot be enumerable.

In the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) have an interesting example about the usage of that structure.

Simple example of using WeakSet:

```jsx
const weakSet = new WeakSet();

const foo = {};

const bar = {};

weakSet.add(foo);

weakSet.add(bar);

console.log(weakSet.has(foo)); // true

console.log(weakSet.has(bar)); // true

weakSet.delete(foo);

console.log(weakSet.has(foo)); // false

console.log(weakSet.has(bar)); // true

console.log(weakSet.has({})); // false because is another reference
```

## **Useful links:**

- Key equality is based on the [sameValueZero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality) algorithm
- [Keyed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)
