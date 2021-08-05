let subscriberCount = 0;

export default class {
  constructor ({ limit = 1000 } = {}) {
    this.limit = Math.abs(limit);
    this.state = {};
    this.subscribers = {};
    this.history = [];
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
  }

  publish (id) {
    const f = this.subscribers[id];
    f.apply(f, [{ state: this.state, history: this.history }]);
  }

  setState (state = {}) {
    this.state = state;
    this.history.push(state);
    this.history = this.history.slice(-1 * this.limit);
    Object.keys(this.subscribers).forEach(id => this.publish(id));
  }
}
