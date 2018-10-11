import * as React from 'react'

import navigate from '../navigate'

interface Props {
  to: string
  [key: string]: any
}

function go(e: React.SyntheticEvent, to: string) {
  e.preventDefault()
  navigate(to)
}

const Link: React.SFC<Props> = props => (
  <a href={props.to} onClick={e => go(e, props.to)} {...props}>
    {props.children}
  </a>
)

export default Link
