import { pushState, replaceState, getPath } from './util'
import PageStore from './stores/PageStore'

export default function navigate(to: string, replace: boolean = false) {
  if (to === getPath()) return

  if (replace) {
    replaceState(to)
  } else {
    pushState(to)
  }

  PageStore.go(to)
}
