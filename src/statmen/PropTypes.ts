import * as PropTypes from 'prop-types'

export const contextStruct = PropTypes.shape({
  subscribe: PropTypes.func,
  setState: PropTypes.func,
  getState: PropTypes.func,
  foo: PropTypes.string,
})
