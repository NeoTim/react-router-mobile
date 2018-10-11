import * as React from 'react'

interface Props {
  vh?: number
  className?: string
}

const Body: React.SFC<Props> = ({ children, vh, className }) => (
  <div
    className={className ? `${className} rrm-body` : 'rrm-body'}
    style={{ height: `${vh}vh` }}
  >
    {children}
  </div>
)

Body.defaultProps = {
  vh: 10,
}

export default Body
