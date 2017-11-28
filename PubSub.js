class PubSub {
  constructor() {
    this.subscribers = {};
    this.history = {};
  }

  subscribe(topic, listener) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
      this.history[topic] = [];
    }
    this.subscribers[topic].push(listener);
  }

  publish(topic, message) {
    if (!this.subscribers[topic]) {
      throw new Error("Sorry! That topic hasn't been registered yet...");
    } else {
      const subscribers = this.subscribers[topic];
      const history = this.history[topic];
      history.push(message);
      const lastTwoMessages = history.slice(-2);
      subscribers.forEach(listener => listener(lastTwoMessages));
    }
  }
}

const listener1 = msg => console.log('listener1: ' + msg);
const listener2 = msg => console.log('listener2: ' + msg);

const pubsub = new PubSub();

pubsub.subscribe('foo', listener1);
pubsub.subscribe('foo', listener2);
pubsub.subscribe('bar', listener2);

pubsub.publish('foo', 'hello');
// pubsub.publish('foo', 'sup');
// pubsub.publish('foo', 'morning');
pubsub.publish('bar', 'world');

// console.log(pubsub)
