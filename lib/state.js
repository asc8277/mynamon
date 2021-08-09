let subscriberCount = 0;

export default class {
  constructor ({ limit = 1000, initialState = {} } = {}) {
    this.limit = Math.abs(limit);
    this.state = initialState;
    this.subscribers = {};
  }

  addSubscriber (f = () => {}) {
    const id = subscriberCount++;
    this.subscribers[id] = f;
    this.publish(id);

    return id;
  }

  removeSubscriber (id) {
    if (!id) {
      return;
    }

    delete this.subscribers[id];

    return this;
  }

  publish (id) {
    if (!id) {
      return;
    }

    const f = this.subscribers[id];
    f.apply(f, [this.state]);

    return this;
  }

  addIncrement (increment = {}) {
    this.state.unshift(increment);
    this.state = this.state.slice(0, this.limit);
    Object.keys(this.subscribers).forEach(id => this.publish(id));

    return this;
  }
}
