import * as React from 'react'

import navigate from '../navigate'

interface Props {
  to: string
  children?: React.ReactNode
}

function go(e: React.SyntheticEvent, to: string) {
  e.preventDefault()
  navigate(to)
}

const Link = (props: Props) => (
  <a href={props.to} onClick={e => go(e, props.to)}>
    {props.children}
  </a>
)

export default Link
