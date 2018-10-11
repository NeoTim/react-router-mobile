export interface Window {
  [propName: string]: any
}

export interface Page {
  path: string
  fullPath: string
  selector: string
  isRoot?: boolean
  children?: any[]
  animation?: string
  mounted?: boolean
  component: any
}
