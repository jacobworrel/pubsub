class PubSub {
  constructor() {
    // subscribers object have topics as keys
    // the values are arrays of listeners to call back upon publication
    this.subscribers = {};
    // history object will also have topics as keys
    // the values are arrays of messages to record history of published messages
    this.history = {};
  }

  /**
  * Handle '*' wildcard if included in topic.
  * @param {string} topic - the topic to subscribe to
  * @param {function} listener - the listener to call back when a message is published to a given topic
  * @param {number} numMessages - the number of messages (starting from most recent) to be delivered
  */

  handleWildcard(topic, listener, numMessages) {
    const prefix = topic.split('*')[0];
    const topics = Object.keys(this.subscribers);
    topics.forEach(topic => {
      const slice = topic.slice(0, prefix.length);
      if (prefix === slice) {
        this.subscribers[topic].push({ numMessages, listener });
      }
    });
  }

  /**
  * Subscribe a listener to a given topic.
  * @param {string} topic - the topic to subscribe to
  * @param {function} listener - the listener to call back when a message is published to a given topic
  * @param {number} numMessages - the number of messages (starting from most recent) to be delivered
  */

  subscribe(topic, listener, numMessages = 1) {
    if (topic.includes('*')) {
      return this.handleWildcard(topic, listener, numMessages);
    }
    else if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
      this.history[topic] = [];
    }
    this.subscribers[topic].push({ numMessages, listener });
  }

  /**
  * Publish a message to a given topic.
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
