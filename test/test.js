const expect = require('chai').expect;
const PubSub = require('./../PubSub.js');

describe('PubSub', () => {

  describe('subscriptions', () => {
    const { subscribers } = new PubSub();
    it('should be initialized as an empty object', () => {
      expect(subscribers).to.be.an('object');
      expect(subscribers).to.be.empty;
    });
  });

  describe('history', () => {
    const { history } = new PubSub();
    it('should be initialized as an empty object', () => {
      expect(history).to.be.an('object');
      expect(history).to.be.empty;
    });
  });

  describe('subscribe', () => {
    const pubsub = new PubSub();
    const { subscribers } = pubsub;
    const listener1 = msg => console.log('listener1: ' + msg);
    const listener2 = msg => console.log('listener2: ' + msg);
    const topic = 'foo';
    pubsub.subscribe(topic, listener1);

    it('should add a new topic to subscribe to', () => {
      expect(subscribers).to.have.property(topic);
      expect(subscribers[topic]).to.be.an('array');
      expect(subscribers[topic]).to.have.lengthOf(1);
    });

    it('should add a listener that subscribes to a given topic', () => {
      subscribers[topic].forEach(subscriber => {
        expect(subscriber).to.be.an('object');
        expect(subscriber.listener).to.be.a('function');
      });
    });

    it('should have listeners default to subscribing to one message', () => {
      subscribers[topic].forEach(subscriber => {
        expect(subscriber.numMessages).to.be.a('number');
        expect(subscriber.numMessages).to.equal(1);
      })
    });

    it('should allow listeners to subscribe to a dynamic number of messages', () => {
      pubsub.subscribe(topic, listener2, 2);
      const subscriber = subscribers[topic][1];
      expect(subscriber.numMessages).to.equal(2);
    });

    it('should add a new topic to message history', () => {
      const { history } = pubsub
      expect(history).to.have.property(topic);
      expect(history[topic]).to.be.an('array');
      expect(history[topic]).to.be.empty;
    });
  });

  describe('publish', () => {
    const pubsub = new PubSub();
    const { subscribers } = pubsub;
    const listener1 = msg => console.log('listener1: ' + msg);
    const listener2 = msg => console.log('listener2: ' + msg);
    const topic = 'foo';
    pubsub.subscribe(topic, listener1);

  });
});
