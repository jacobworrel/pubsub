class PubSub {
  constructor() {
    this.subscribers = {};
    this.history = {};
  }

  subscribe(topic, listener, numMessages = 1) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
      this.history[topic] = [];
    }
    this.subscribers[topic].push({ numMessages, listener });
  }

  publish(topic, message) {
    if (!this.subscribers[topic] || !this.history[topic]) {
      throw new Error("Sorry! That topic hasn't been registered yet...");
    } else {
      const subscribers = this.subscribers[topic];
      const history = this.history[topic];
      history.push(message);
      subscribers.forEach(subscriber => {
        const { listener, numMessages } = subscriber;
        const messages = history.slice(-numMessages);
        listener(messages);
      });
    }
  }
}

module.exports = PubSub;
