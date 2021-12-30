import React from 'react'
import '../../css/OutLink.scss'

type OutLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

function OutLink({ href, children, ...rest }: OutLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  )
}

export default OutLink
