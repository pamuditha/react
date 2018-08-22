import { IAccessibilityDefinition } from '../../interfaces'

/**
 * @description
 * The SelectableListBehavior adds role='list'.
 * The 'list' role is used to identify an element that creates a list.
 */

const BasicListBehavior: IAccessibilityDefinition = {
  attributes: {
    root: {
      role: 'list',
    },
  },
}

export default BasicListBehavior
