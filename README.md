# PubSub
A simple pub/sub interface implemented in Node.JS.

# Install

```sh
$ npm install
```

# Usage

```js
const pubsub = new PubSub();
const listener1 = msg => console.log('listener1: ' + msg);
const listener2 = msg => console.log('listener2: ' + msg);

pubsub.subscribe('foo', listener1);
pubsub.subscribe('foo', listener2);
pubsub.subscribe('bar', listener2);

pubsub.publish('foo', 'hello');
pubsub.publish('bar', 'world');

/* prints:
* listener1: hello
* listener2: hello
* listener2: world
*/
```

### Wilcard

```js
const pubsub = new PubSub();
const listener1 = msg => console.log('listener1: ' + msg);
const listener2 = msg => console.log('listener2: ' + msg);

pubsub.subscribe('foo', listener1);
pubsub.subscribe('f*', listener2);
pubsub.publish('foo', 'sup');

/* prints:
* listener1: sup
* listener2: sup
*/
```

### Last N Messages

```js
const pubsub = new PubSub();
const listener = msg => console.log('listener: ' + msg);

pubsub.subscribe('foo', listener, 2);
pubsub.publish('foo', 'hello');
pubsub.publish('foo', 'world');
pubsub.publish('foo', 'hello');

/* prints:
* listener: hello
* listener: hello, world
* listener: world, hello
*/
```

# Test

```sh
$ npm test
```
