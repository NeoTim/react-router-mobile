import { Model } from '../statmen'

class TodoStore extends Model {
  state = {
    list: ['a', 'b', 'c'],
    todo: 'todo',
  }

  add(item) {
    this.setState({ list: [...this.state.list, item] })
  }
}

export default new TodoStore()
