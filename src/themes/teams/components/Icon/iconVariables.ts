import { pxToRem } from '../../utils'

export interface IconVariables {
  [key: string]: string | number | boolean | undefined

  redColor?: string
  brandColor?: string

  outline?: boolean
  color?: string
  backgroundColor?: string
  borderColor?: string
  horizontalSpace: string
  margin: string
  secondaryColor: string
  disabledColor: string
}

export default (siteVars): IconVariables => ({
  outline: undefined,
  color: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
  horizontalSpace: pxToRem(10),
  margin: `0 ${pxToRem(8)} 0 0`,
  secondaryColor: siteVars.white,
  disabledColor: siteVars.gray06,

  redColor: siteVars.red,
  brandColor: siteVars.brandColor,
})
