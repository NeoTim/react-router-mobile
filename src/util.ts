export { pushState, replaceState, last, getPath }

function pushState(url: string): void {
  history.pushState(null, '', url)
}
function replaceState(url: string): void {
  history.replaceState(null, '', url)
}

function last(arr: any[]) {
  return arr[arr.length - 1]
}

function getPath(): string {
  const { pathname } = window.location
  return pathname
}
