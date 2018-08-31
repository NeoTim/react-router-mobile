import { pushState, replaceState, getPath } from './util'
import ROUTERS from './routers'

export default function navigate(to: string, replace: boolean = false) {
  if (to === getPath()) return

  if (replace) {
    replaceState(to)
  } else {
    pushState(to)
  }

  ROUTERS[0].go(to)
}
