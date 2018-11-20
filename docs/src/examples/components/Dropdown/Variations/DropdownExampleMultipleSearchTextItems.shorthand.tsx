import * as React from 'react'
import { Dropdown, DropdownListItem } from '@stardust-ui/react'

class DropdownExample extends React.Component {
  state = {
    items: inputItems,
  }
  render() {
    return (
      <Dropdown
        multiple
        search
        placeholder="Start typing a name"
        items={this.state.items}
        onDropdownChange={(value: DropdownListItem[]) => {
          this.setState({
            items: inputItems.filter(item => value.indexOf(item) === -1),
          })
        }}
      />
    )
  }
}

const inputItems: DropdownListItem[] = [
  {
    header: 'Bruce Wayne',
  },
  {
    header: 'Natasha Romanoff',
  },
  {
    header: 'Steven Strange',
  },
  {
    header: 'Alfred Pennyworth',
  },
  {
    header: `Scarlett O'Hara`,
  },
  {
    header: 'Imperator Furiosa',
  },
  {
    header: 'Bruce Banner',
  },
  {
    header: 'Peter Parker',
  },
  {
    header: 'Selina Kyle',
  },
]

export default DropdownExample
