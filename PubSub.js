class PubSub {
  constructor() {
    // subscribers object have topics as keys
    // the values are arrays of listeners to call back upon publication
    this.subscribers = {};
    // history object will also have topics as keys
    // the values will be an array of message to record history of published messages
    this.history = {};
  }

  /**
  * Subscribe a listener to a given topic.
  * @param {string} topic - the topic to subscribe to
  * @param {function} listener - the listener to call back when a message is published to a given topic
  * @param {number} numMessages - the number of messages (starting from most recent) to be delivered
  */

  subscribe(topic, listener, numMessages = 1) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
      this.history[topic] = [];
    }
    this.subscribers[topic].push({ numMessages, listener });
  }

  /**
  * Subscribe a listener to a given topic.
  * @param {string} topic - the topic to publish a message to
  * @param {string} message - the message to be published to a given topic
  */

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
