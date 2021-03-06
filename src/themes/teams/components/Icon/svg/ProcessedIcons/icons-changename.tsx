import * as React from 'react'
import { TeamsSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M18 18.5c0-.3-.2-.5-.5-.5h-8c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-8c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h8c.3 0 .5-.2.5-.5zm4.5-5.5h-1c-.3 0-.5.2-.5.5s.2.5.5.5h1c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5h-1c-.3 0-.5.2-.5.5s.2.5.5.5h1c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zm-5 2h-7c-.3 0-.5.2-.5.5v1c0 .3.2.5.5.5h7c.3 0 .5-.2.5-.5v-1c0-.3-.2-.5-.5-.5zm4.5 7c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2 .3 0 .5-.2.5-.5S22.3 9 22 9c-1 0-2 .5-2.5 1.3C19 9.5 18 9 17 9c-.3 0-.5.2-.5.5s.2.5.5.5c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2-.3 0-.5.2-.5.5s.2.5.5.5c1 0 2-.5 2.5-1.3.5.8 1.5 1.3 2.5 1.3.3 0 .5-.2.5-.5s-.2-.5-.5-.5z" />
      <path
        className={classes.filledPart}
        d="M18 18.5c0-.3-.2-.5-.5-.5h-8c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-8c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h8c.3 0 .5-.2.5-.5zm4.5-5.5h-1c-.3 0-.5.2-.5.5s.2.5.5.5h1c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5h-1c-.3 0-.5.2-.5.5s.2.5.5.5h1c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zm-5 2h-7c-.3 0-.5.2-.5.5v1c0 .3.2.5.5.5h7c.3 0 .5-.2.5-.5v-1c0-.3-.2-.5-.5-.5zm4.5 7c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2 .3 0 .5-.2.5-.5S22.3 9 22 9c-1 0-2 .5-2.5 1.3C19 9.5 18 9 17 9c-.3 0-.5.2-.5.5s.2.5.5.5c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2-.3 0-.5.2-.5.5s.2.5.5.5c1 0 2-.5 2.5-1.3.5.8 1.5 1.3 2.5 1.3.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"
      />
    </svg>
  ),
  styles: {},
} as TeamsSvgIconSpec
