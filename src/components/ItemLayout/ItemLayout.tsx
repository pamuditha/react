import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as cx from 'classnames'

import { createShorthandFactory, customPropTypes, pxToRem, UIComponent } from '../../lib'
import Layout from '../Layout'
import {
  ComponentVariablesInput,
  IComponentPartClasses,
  IComponentPartStylesInput,
  ICSSInJSStyle,
} from '../../../types/theme'
import { Extendable } from '../../../types/utils'

export interface IItemLayoutProps {
  as?: any
  className?: string
  contentMedia?: any
  content?: any
  debug?: boolean
  header?: any
  endMedia?: any
  headerMedia?: any
  media?: any
  renderContentArea?: (
    props: IItemLayoutProps,
    state: any,
    classes: IComponentPartClasses,
  ) => React.ReactNode
  renderHeaderArea?: (
    props: IItemLayoutProps,
    state: any,
    classes: IComponentPartClasses,
  ) => React.ReactNode
  renderMainArea?: (
    props: IItemLayoutProps,
    state: any,
    classes: IComponentPartClasses,
  ) => React.ReactNode
  rootCSS?: ICSSInJSStyle
  mediaCSS?: ICSSInJSStyle
  headerCSS?: ICSSInJSStyle
  headerMediaCSS?: ICSSInJSStyle
  contentCSS?: ICSSInJSStyle
  contentMediaCSS?: ICSSInJSStyle
  endMediaCSS?: ICSSInJSStyle
  truncateContent?: boolean
  truncateHeader?: boolean
  styles?: IComponentPartStylesInput
  variables?: ComponentVariablesInput
}

class ItemLayout extends UIComponent<Extendable<IItemLayoutProps>, any> {
  static create: Function

  static displayName = 'ItemLayout'

  static className = 'ui-itemlayout'

  static propTypes = {
    as: customPropTypes.as,

    /** Additional classes. */
    className: PropTypes.string,

    contentMedia: PropTypes.any,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** Toggle debug mode */
    debug: PropTypes.bool,

    header: PropTypes.any,
    endMedia: PropTypes.any,
    headerMedia: PropTypes.any,

    media: PropTypes.any,
    renderContentArea: PropTypes.func,
    renderHeaderArea: PropTypes.func,
    renderMainArea: PropTypes.func,

    /** Styled applied to the root element of the rendered component. */
    rootCSS: PropTypes.object,
    /** Styled applied to the media element of the rendered component. */
    mediaCSS: PropTypes.object,
    /** Styled applied to the header element of the rendered component. */
    headerCSS: PropTypes.object,
    /** Styled applied to the header media element of the rendered component. */
    headerMediaCSS: PropTypes.object,
    /** Styled applied to the content element of the rendered component. */
    contentCSS: PropTypes.object,
    /** Styled applied to the content element of the rendered component. */
    contentMediaCSS: PropTypes.object,
    /** Styled applied to the end media element of the rendered component. */
    endMediaCSS: PropTypes.object,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  static handledProps = [
    'as',
    'className',
    'content',
    'contentCSS',
    'contentMedia',
    'contentMediaCSS',
    'debug',
    'endMedia',
    'endMediaCSS',
    'header',
    'headerCSS',
    'headerMedia',
    'headerMediaCSS',
    'media',
    'mediaCSS',
    'renderContentArea',
    'renderHeaderArea',
    'renderMainArea',
    'rootCSS',
    'styles',
    'truncateContent',
    'truncateHeader',
    'variables',
  ]

  static defaultProps = {
    as: 'div',

    renderMainArea: (props, state, classes) => {
      const { renderHeaderArea, renderContentArea } = props

      const headerArea = renderHeaderArea(props, state, classes)
      const contentArea = renderContentArea(props, state, classes)

      return (
        <div
          className="ui-item-layout__main"
          style={{
            gridTemplateRows: '1fr 1fr',
          }}
        >
          {headerArea}
          {contentArea}
        </div>
      )
    },

    renderHeaderArea: (props, state, classes) => {
      const { debug, header, headerMedia, truncateHeader, headerCSS, headerMediaCSS } = props

      const mergedClasses = cx('ui-item-layout__header', classes.header)
      const headerMediaClasses = cx('ui-item-layout__headerMedia', classes.headerMedia)

      return !header && !headerMedia ? null : (
        <Layout
          className={mergedClasses}
          // alignItems="end"
          gap={pxToRem(8)}
          debug={debug}
          main={{ content: header, truncate: truncateHeader }}
          styles={{ root: headerCSS }}
          end={{
            as: 'span',
            content: headerMedia,
            styles: { root: headerMediaCSS },
            className: headerMediaClasses,
          }}
        />
      )
    },

    renderContentArea: (props, state, classes) => {
      const { debug, content, contentMedia, truncateContent, contentCSS, contentMediaCSS } = props

      const mergedClasses = cx('ui-item-layout__content', classes.content)
      const mediaClasses = cx('ui-item-layout__contentMedia', classes.contentMedia)

      return !content && !contentMedia ? null : (
        <Layout
          className={mergedClasses}
          // alignItems="start"
          gap={pxToRem(8)}
          debug={debug}
          styles={{ root: contentCSS }}
          main={{ content, truncate: truncateContent }}
          end={{
            as: 'span',
            content: contentMedia,
            styles: { root: contentMediaCSS },
            className: mediaClasses,
          }}
        />
      )
    },
  }

  renderComponent({ ElementType, classes, rest, styles }) {
    const { as, debug, endMedia, media, renderMainArea, rootCSS, mediaCSS, endMediaCSS } = this
      .props as IItemLayoutPropsWithDefaults

    const mergedMediaClasses = cx('ui-item-layout__media', classes.media)
    const mergedEndMediaClasses = cx('ui-item-layout__endMedia', classes.endMedia)

    return (
      <Layout
        as={as}
        className={classes.root}
        // alignItems="center"
        debug={debug}
        reducing
        styles={{ root: { ...styles.root, ...rootCSS } }}
        gap={pxToRem(8)}
        start={Layout.Area.create(media, {
          defaultProps: {
            as: 'span',
            styles: { root: mediaCSS },
            className: mergedMediaClasses,
          },
        })}
        main={{
          content: renderMainArea(this.props, this.state, classes),
        }}
        end={{
          as: 'span',
          content: endMedia,
          styles: { root: endMediaCSS },
          className: mergedEndMediaClasses,
        }}
        {...rest}
      />
    )
  }
}

ItemLayout.create = createShorthandFactory(ItemLayout, main => ({ main }))

export default ItemLayout

export type IItemLayoutPropsWithDefaults = IItemLayoutProps & typeof ItemLayout.defaultProps
