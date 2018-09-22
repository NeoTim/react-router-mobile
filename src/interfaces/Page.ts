export default interface Page {
  path: string
  fullPath?: string
  children?: any[]
  animation?: string
  component: any
}
