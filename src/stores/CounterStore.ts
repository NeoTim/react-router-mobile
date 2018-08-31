import { Model } from '../statmen'

class CounterStore extends Model {
  state = {
    count: 100,
  }

  increment() {
    this.setState({ count: this.state.count + 1 })
  }

  decrement() {
    this.setState({ count: this.state.count - 1 })
  }
}

export default new CounterStore()
