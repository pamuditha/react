import * as _ from 'lodash'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenExist,
  createHTMLLi,
  createShorthandFactory,
  customPropTypes,
  UIComponent,
} from '../../lib'
import Icon from '../Icon'
import { menuItemBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/interfaces'
import IsFromKeyboard from '../../lib/isFromKeyboard'

import { ComponentVariablesInput, ComponentPartStyle } from '../../../types/theme'
import {
  ComponentEventHandler,
  Extendable,
  ItemShorthand,
  ReactChildren,
} from '../../../types/utils'

export interface IMenuItemProps {
  accessibility?: Accessibility
  active?: boolean
  as?: any
  children?: ReactChildren
  className?: string
  content?: any
  disabled?: boolean
  icon?: ItemShorthand
  iconOnly?: boolean
  index?: number
  onClick?: ComponentEventHandler<IMenuItemProps>
  pills?: boolean
  pointing?: boolean | 'start' | 'end'
  type?: 'primary' | 'secondary'
  underlined?: boolean
  vertical?: boolean
  styles?: ComponentPartStyle
  variables?: ComponentVariablesInput
  wrapper?: ItemShorthand
}

export interface IMenuItemState {
  [IsFromKeyboard.propertyName]: boolean
}

class MenuItem extends UIComponent<Extendable<IMenuItemProps>, IMenuItemState> {
  static displayName = 'MenuItem'

  static className = 'ui-menu__item'

  static create: Function

  static propTypes = {
    /** A menu item can be active. */
    active: PropTypes.bool,

    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /**
     *  Used to set content when using childrenApi - internal only
     *  @docSiteIgnore
     */
    children: PropTypes.node,

    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** Shorthand for primary content. */
    content: PropTypes.any,

    /** A menu item can show it is currently unable to be interacted with. */
    disabled: PropTypes.bool,

    /** Name or shorthand for Menu Item Icon */
    icon: customPropTypes.itemShorthand,

    /** A menu may have just icons. */
    iconOnly: PropTypes.bool,

    /** MenuItem index inside Menu. */
    index: PropTypes.number,

    /**
     * Called on click. When passed, the component will render as an `a`
     * tag by default instead of a `div`.
     *
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props.
     */
    onClick: PropTypes.func,

    /** A menu can adjust its appearance to de-emphasize its contents. */
    pills: PropTypes.bool,

    /**
     * A menu can point to show its relationship to nearby content.
     * For vertical menu, it can point to the start of the item or to the end.
     */
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),

    /** The menu can have primary or secondary type */
    type: PropTypes.oneOf(['primary', 'secondary']),

    /** Menu items can by highlighted using underline. */
    underlined: PropTypes.bool,

    /** A vertical menu displays elements vertically. */
    vertical: PropTypes.bool,

    /** Accessibility behavior if overridden by the user. */
    accessibility: PropTypes.func,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Override for theme site variables to allow modifications of component styling via themes. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Shorthand for the wrapper component */
    wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  }

  static defaultProps = {
    as: 'a',
    accessibility: menuItemBehavior as Accessibility,
    wrapper: {},
  }

  state = IsFromKeyboard.initial

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children, content, icon, wrapper } = this.props

    const menuItemInner = childrenExist(children) ? (
      children
    ) : (
      <ElementType
        className={cx('ui-menu__item__anchor', classes.anchor)}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...accessibility.attributes.anchor}
        {...accessibility.keyHandlers.anchor}
        {...rest}
      >
        {icon &&
          Icon.create(this.props.icon, {
            defaultProps: { xSpacing: !!content ? 'after' : 'none' },
          })}
        {content}
      </ElementType>
    )

    if (wrapper) {
      return createHTMLLi(wrapper, {
        defaultProps: {
          className: classes.root,
          ...accessibility.attributes.root,
          ...accessibility.keyHandlers.root,
        },
        overrideProps: () => ({
          children: menuItemInner,
        }),
      })
    }
    return menuItemInner
  }

  protected actionHandlers: AccessibilityActionHandlers = {
    performClick: event => this.handleClick(event),
  }

  private handleClick = e => {
    _.invoke(this.props, 'onClick', e, this.props)
  }

  private handleBlur = (e: React.SyntheticEvent) => {
    this.setState(IsFromKeyboard.initial)

    _.invoke(this.props, 'onBlur', e, this.props)
  }

  private handleFocus = (e: React.SyntheticEvent) => {
    this.setState(IsFromKeyboard.state())

    _.invoke(this.props, 'onFocus', e, this.props)
  }
}

MenuItem.create = createShorthandFactory(MenuItem, content => ({ content }))

export default MenuItem
