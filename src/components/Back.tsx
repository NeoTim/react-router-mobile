import * as React from 'react'
import { actions } from '../routerStore'

const Back: React.SFC = props => (
  <span onClick={() => actions.back()}>{props.children || 'Back'}</span>
)

export default Back
