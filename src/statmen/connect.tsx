import * as React from 'react'
import { contextStruct } from './PropTypes'

export default function connect(stores?: any[]) {
  return function wrapWithConnect(WrappedComponent): React.ReactNode {
    interface HocProps {
      [propName: string]: number
    }

    interface HocState {
      readonly store: object
    }

    return class extends React.Component<HocProps> {
      static contextTypes = {
        store: contextStruct,
      }

      state = {
        store: {},
      }

      stores: any
      storeName: string
      unmounted: boolean = false
      instances: any[]

      constructor(props, context) {
        super(props, context)
        this.stores = this.createStores(stores)
      }

      createStores = Stores => {
        const instances = {}
        Stores.forEach(store => {
          const { name } = store.constructor
          const key = this.firstLowerCase(name)
          instances[key] = store
        })
        return instances
      }

      listener = () => {
        if (!this.unmounted) {
          this.setState({ store: this.stores })
        }
      }

      firstLowerCase(str: string): string {
        return str.replace(/^[A-Z]/g, L => L.toLowerCase())
      }

      componentDidMount() {
        if (stores) {
          Object.values(this.stores).forEach((store: any) => {
            store.subscribe(this.listener)
          })
          this.listener()
        }
      }

      render() {
        const props = {
          ...this.props,
          ...this.state.store,
        }

        if (!Object.keys(this.state.store).length) return null
        return <WrappedComponent {...props} />
      }
    }
  }
}
