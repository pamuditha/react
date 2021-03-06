import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <g className={classes.filledPart}>
          <path d="M16 19h4v1h-4zM16 21h4v1h-4z" />
          <path d="M22 11V9.5c0-.827-.673-1.5-1.5-1.5h-9c-.827 0-1.5.673-1.5 1.5v9.009c0 .394.16.781.417 1.037l3.522 4.014c.284.284.66.44 1.061.44h5.5c.827 0 1.5-.673 1.5-1.5V17h-1v5.5c0 .275-.225.5-.5.5H15c-.005 0-.009-.002-.014-.003V18H11V9.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5V11h1zm-8.014 11.099L11.267 19h2.72v3.099z" />
          <path d="M17 16.792V12.25c0-.69.56-1.25 1.25-1.25H20v-1h-8v7h5v-.208z" />
          <path d="M24 14.969c0 .14-.027.273-.082.398a1.064 1.064 0 0 1-.55.551.983.983 0 0 1-.4.082h-2.257l-1.86 1.852c-.098.098-.215.148-.351.148s-.253-.05-.352-.148S18 17.636 18 17.5v-4.469c0-.14.027-.273.082-.398a1.064 1.064 0 0 1 .55-.551.983.983 0 0 1 .4-.082h3.937c.14 0 .273.027.398.082s.234.129.328.223.168.203.223.328.082.258.082.398v1.938z" />
        </g>
        <g className={classes.outlinePart}>
          <path d="M16 19h4v1h-4zM16 21h4v1h-4z" />
          <path d="M22 11V9.5c0-.827-.673-1.5-1.5-1.5h-9c-.827 0-1.5.673-1.5 1.5v9.009c0 .394.16.781.417 1.037l3.522 4.014c.284.284.66.44 1.061.44h5.5c.827 0 1.5-.673 1.5-1.5V17h-1v5.5c0 .275-.225.5-.5.5H15c-.005 0-.009-.002-.014-.003V18H11V9.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5V11h1zm-8.014 11.099L11.267 19h2.72v3.099z" />
          <path d="M17 17h-5v-7h8v1h-7v5h4z" />
          <path d="M23.918 12.633a1.06 1.06 0 0 0-.55-.551.983.983 0 0 0-.4-.082h-3.937c-.14 0-.273.027-.398.082a1.064 1.064 0 0 0-.55.55.983.983 0 0 0-.083.4V17.5c0 .136.05.253.148.352.1.099.216.148.352.148s.253-.05.352-.148L20.71 16h2.258c.14 0 .273-.027.398-.082a1.064 1.064 0 0 0 .55-.55.983.983 0 0 0 .083-.4v-1.937a.983.983 0 0 0-.082-.398zM23 15h-2.5a.481.481 0 0 0-.352.148L19 16.29V13h4v2z" />
        </g>
      </g>
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
