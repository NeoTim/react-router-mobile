import * as React from 'react'
import { actions } from '../pageStore'

const Back = props => (
  <span onClick={() => actions.back()}>{props.children || 'Back'}</span>
)

export default Back
