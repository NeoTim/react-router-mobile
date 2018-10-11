import * as React from 'react'

interface Props {
  vh?: number
  className?: string
}

const Footer: React.SFC<Props> = ({ children, vh, className }) => (
  <div
    className={className ? `${className} rrm-footer` : 'rrm-footer'}
    style={{ height: `${vh}vh` }}
  >
    {children}
  </div>
)

Footer.defaultProps = {
  vh: 10,
}

export default Footer
