import * as React from 'react'

interface Props {
  vh?: number
  className?: string
}

const Header: React.SFC<Props> = ({ children, vh, className }) => (
  <div
    className={className ? `${className} rrm-header` : 'rrm-header'}
    style={{ height: `${vh}vh` }}
  >
    {children}
  </div>
)

Header.defaultProps = {
  vh: 10,
}

export default Header
