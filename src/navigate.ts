import { actions } from './routerStore'

export default function navigate(to: string, replace?: boolean) {
  actions.go(to, replace)
}
