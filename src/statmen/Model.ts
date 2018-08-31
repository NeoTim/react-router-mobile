type Listener = () => void

export default class Model {
  state: object
  private listeners: Listener[] = []

  setState = (updater?) => {
    this.state = { ...this.state, ...updater }
    this.listeners.forEach(listener => listener())
  }

  subscribe(fn: Listener) {
    this.listeners.push(fn)
    console.log('this.listeners:', this.listeners)
  }

  unsubscribe(fn: Listener) {
    this.listeners = this.listeners.filter(f => f !== fn)
  }
}
