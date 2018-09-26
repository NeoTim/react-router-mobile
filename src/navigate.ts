import { actions } from './pageStore'

export default function navigate(to: string, replace?: boolean) {
  actions.go(to, replace)
}
