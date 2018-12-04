import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import {
  customPropTypes,
  childrenExist,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
} from '../../lib'
import ListItem from './ListItem'
import { listBehavior } from '../../lib/accessibility'
import { Accessibility, AccessibilityActionHandlers } from '../../lib/accessibility/types'
import { ContainerFocusHandler } from '../../lib/accessibility/FocusHandling/FocusContainer'
import { Extendable, ShorthandValue } from '../../../types/utils'

export interface ListProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default listBehavior
   * */
  accessibility?: Accessibility

  /** Toggle debug mode */
  debug?: boolean

  /** Shorthand array of props for ListItem. */
  items?: ShorthandValue[]

  /** A selection list formats list items as possible choices. */
  selection?: boolean

  /** Truncates content */
  truncateContent?: boolean

  /** Truncates header */
  truncateHeader?: boolean
}

export interface ListState {
  selectedItemIndex: number
  focusedItemIndex: number
}

/**
 * A list displays a group of related content.
 */
class List extends UIComponent<Extendable<ListProps>, ListState> {
  static displayName = 'List'

  static className = 'ui-list'

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    accessibility: PropTypes.func,
    debug: PropTypes.bool,
    items: customPropTypes.collectionShorthand,
    selection: PropTypes.bool,
    truncateContent: PropTypes.bool,
    truncateHeader: PropTypes.bool,
  }

  static defaultProps = {
    as: 'ul',
    accessibility: listBehavior as Accessibility,
  }

  static Item = ListItem

  // List props that are passed to each individual Item props
  static itemProps = ['debug', 'selection', 'truncateContent', 'truncateHeader', 'variables']

  public state = {
    focusedItemIndex: 0,
    selectedItemIndex: -1,
  }

  private focusHandler: ContainerFocusHandler = null
  private itemRefs = []

  actionHandlers: AccessibilityActionHandlers = {
    moveNext: e => {
      e.preventDefault()
      this.focusHandler.moveNext()
    },
    movePrevious: e => {
      e.preventDefault()
      this.focusHandler.movePrevious()
    },
    moveFirst: e => {
      e.preventDefault()
      this.focusHandler.moveFirst()
    },
    moveLast: e => {
      e.preventDefault()
      this.focusHandler.moveLast()
    },
  }

  renderComponent({ ElementType, classes, accessibility, rest }) {
    const { children } = this.props

    return (
      <ElementType
        {...accessibility.attributes.root}
        {...accessibility.keyHandlers.root}
        {...rest}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems()}
      </ElementType>
    )
  }

  componentDidMount() {
    this.focusHandler = new ContainerFocusHandler(
      () => this.props.items.length,
      index => {
        this.setState({ focusedItemIndex: index }, () => {
          const targetComponent = this.itemRefs[index] && this.itemRefs[index].current
          const targetDomNode = ReactDOM.findDOMNode(targetComponent) as any

          targetDomNode && targetDomNode.focus()
        })
      },
    )
  }

  renderItems() {
    const { items } = this.props
    const { focusedItemIndex, selectedItemIndex } = this.state

    const setTabIndex = (idx): number => {
      // try set tabindex=0 for the selected item
      if (selectedItemIndex !== -1) {
        return idx === selectedItemIndex ? 0 : -1
      }

      return idx === focusedItemIndex ? 0 : -1
    }

    this.itemRefs = []

    return _.map(items, (item, idx) => {
      const maybeSelectableItemProps = {} as any

      if (this.props.selection) {
        const ref = React.createRef()
        this.itemRefs[idx] = ref

        maybeSelectableItemProps.ref = ref
        maybeSelectableItemProps.onFocus = () => this.focusHandler.syncFocusedItemIndex(idx)
        maybeSelectableItemProps.onClick = () => this.setState({ selectedItemIndex: idx })
        maybeSelectableItemProps.selected = idx === selectedItemIndex
        maybeSelectableItemProps.tabIndex = setTabIndex(idx)
      }

      const itemProps = {
        ..._.pick(this.props, List.itemProps),
        ...maybeSelectableItemProps,
      }

      return ListItem.create(item, {
        defaultProps: itemProps,
      })
    })
  }
}

export default List
