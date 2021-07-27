let subscriberCount = 0;

export default class {
  constructor ({ state = {}, subscribers = {} } = {}) {
    this.state = state;
    this.subscribers = subscribers;
  }

  addSubscriber (f) {
    const id = subscriberCount++;
    this.subscribers[id] = f;
    f.apply(f, [this.state]);

    return id;
  }

  removeSubscriber (id) {
    delete this.subscribers[id];
  }

  setState (state = {}) {
    this.state = state;
    Object.values(this.subscribers).forEach(f => f.apply(f, [state]));
  }
}
