import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import reactElementToJsxString from 'react-element-to-jsx-string'
import * as faker from 'faker'

import * as stardust from '@stardust-ui/react'
import { Extendable, ObjectOf } from '../../../../types/utils'
import CodeSnippet from '../CodeSnippet'
import { fontAwesomeIcons } from '../../../../src/themes/teams/components/Icon/fontAwesomeIconStyles'

const { Provider } = stardust

type ComponentInfo = {
  displayName: string
  apiPath: string
  props: {
    name: string
    type: string
    required: boolean
    defaultValue: any
  }[]
}

export type ComponentExplorerProps = {
  info: ComponentInfo
}

export type ComponentExplorerState = Extendable<{
  historyIndex: number
  isPlaying: boolean
  props: ObjectOf<any>
  showCode: boolean
}>

const filterProps = ['accessibility', 'as', 'className', 'input', 'styles', 'wrapper']

const getRandomProps = (info: ComponentInfo): ComponentExplorerState['props'] => {
  const props = {}

  // TODO: this doesn't handle enum / <select> props
  // TODO: this doesn't handle shorthand
  info.props.forEach(({ type, name }) => {
    if (info.displayName === 'Image') {
      const width = _.random(10, 320)
      const height = _.random(10, 240)
      // TODO: add src to Image component?
      // TODO: it also doesn't show up in the props editor if we don't...
      props['src'] = faker.image.imageUrl(width, height).replace(/https?:/, '')
    }
    if (info.displayName === 'Input') {
      // TODO: add plaacaeholder and value to Image component?
      // TODO: it also doesn't show up in the props editor if we don't...
      if (_.random() && !props['defaultValue'] && !props['placeholder']) {
        const propName = _.random() ? 'defaultValue' : 'placeholder'
        const propValue = propName === 'placeholder' ? faker.hacker.verb() : faker.company.bs()
        props[propName] = _.capitalize(propValue)
      }
    }
    if (type === 'boolean') {
      props[name] = !!_.random()
      return
    }
    if (name === 'color' && _.random()) {
      props[name] = _.sample([
        'blue',
        'green',
        'grey',
        'orange',
        'pink',
        'purple',
        'teal',
        'red',
        'yellow',
      ])
      return
    }
    if (name === 'content' && _.random()) {
      props[name] = _.capitalize(`${faker.hacker.verb()} ${faker.hacker.noun()}`)
      return
    }
    if (name === 'description' && _.random()) {
      props[name] = faker.company.catchPhrase()
    }
    if (name === 'header' && _.random()) {
      props[name] = faker.company.bs()
    }
    if (name === 'icon' || (info.displayName === 'Icon' && name === 'name')) {
      if (_.random()) {
        props[name] = _.sample(_.keys(fontAwesomeIcons))
      }
    }
    if (name === 'image' && _.random()) {
      props[name] = faker.image.imageUrl().replace(/https?:/, '')
      return
    }
    if (name === 'label' && _.random()) {
      props[name] = faker.company.bs()
      return
    }
    if (name === 'name') {
      if (info.displayName === 'Avatar' && _.random()) {
        props[name] = faker.name.findName()
      }
      return
    }
    if ((name === 'state' || name === 'status') && _.random()) {
      props[name] = _.sample(['info', 'success', 'warning', 'danger'])
      return
    }
    if (type === 'string') {
      props[name] = ''
      return
    }
    if (name === 'type') {
      if (info.displayName === 'Input' && _.random(0, 3) === 0) {
        props[name] = _.sample(['text', 'password', 'number', 'date'])
      }
      return
    }
  })

  return props
}

class ComponentExplorer extends React.Component<ComponentExplorerProps, ComponentExplorerState> {
  state = {
    historyIndex: 0,
    isPlaying: false,
    props: getRandomProps(this.props.info),
    showCode: false,
  }

  playTimer: number
  history: ComponentExplorerState['props'][] = []
  isChangingHistory: boolean = false

  componentDidMount() {
    this.recordHistory(this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    this.recordHistory(this.state)

    if (prevProps.info.displayName !== this.props.info.displayName) {
      this.clearHistory()
      this.randomizeProps()
    }
  }

  clearHistory = () => {
    this.history = []
    this.setState({ historyIndex: 0 })
  }

  recordHistory = state => {
    if (this.isChangingHistory) return

    const history = state.props

    if (_.isEqual(_.last(this.history), history)) return

    this.history.push(history)

    this.setState({ historyIndex: this.history.length - 1 })
  }

  togglePlay = () => (this.state.isPlaying ? this.stop() : this.play())

  play = () => {
    this.setState({ isPlaying: true })
    this.randomizeProps()
    this.playTimer = window.setInterval(this.randomizeProps, 2000)
  }

  stop = () => {
    window.clearInterval(this.playTimer)
    this.setState({ isPlaying: false })
  }

  resetProps = () => {
    this.setState({ props: {} })
  }

  randomizeProps = () => {
    const { info } = this.props
    const { props } = this.state

    let randomProps = props
    while (_.isEmpty(randomProps) || _.isEqual(randomProps, props)) {
      randomProps = getRandomProps(info)
    }

    this.setState(prevState => ({ ...prevState.props, props: randomProps }))
  }

  handleBooleanChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = !!e.target.checked
    this.setState(prevState => ({ props: { ...prevState.props, [name]: value } }))
  }

  handleHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const historyIndex = Number(e.target.value)
    const props = this.history[historyIndex]

    this.isChangingHistory = true
    this.setState({ historyIndex, props }, () => {
      this.isChangingHistory = false
    })
  }

  handleStringChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState(prevState => ({ props: { ...prevState.props, [name]: value } }))
  }

  handleSelectChange = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const stateValue = value === 'true' ? true : !value ? undefined : value

    this.setState(prevState => {
      if (stateValue === undefined) {
        delete prevState.props[name]
        return prevState
      }

      return { props: { ...prevState.props, [name]: stateValue } }
    })
  }

  handleToggleCode = () => this.setState({ showCode: !this.state.showCode })

  render() {
    const { info } = this.props
    const { historyIndex, isPlaying, showCode, props } = this.state

    const element = React.createElement(_.get(stardust, this.props.info.apiPath), props)

    const jsxString = reactElementToJsxString(element, {
      filterProps,
      functionValue: fn => fn.name,
      showFunctions: false,
    })

    const htmlString = ReactDOMServer.renderToStaticMarkup(element)
    const filteredProps = info.props.filter(prop => !_.includes(filterProps, prop.name))

    return (
      <div
        id="explorer"
        style={{
          margin: 'auto',
          padding: '1rem',
          maxWidth: '50rem',
        }}
      >
        <div style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.5)' }}>EXPLORER</div>
        <div
          style={{
            background: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Provider.Consumer
                render={({ rtl, siteVariables }) => (
                  <div
                    dir={rtl ? 'rtl' : undefined}
                    style={{
                      flex: 1,
                      padding: '2rem',
                      color: siteVariables.bodyColor,
                      backgroundColor: siteVariables.bodyBackground,
                    }}
                  >
                    {element}
                  </div>
                )}
              />
              <div
                style={{
                  display: 'flex',
                  flex: '0 0 auto',
                  padding: '0.25rem 0 0.25rem 0.5rem',
                  width: '100%',
                  color: 'rgba(0, 0, 0, 0.5)',
                  background: '#eee',
                }}
              >
                <input
                  style={{ flex: '1' }}
                  type="range"
                  min={0}
                  max={this.history.length - 1}
                  value={historyIndex}
                  onChange={this.handleHistoryChange}
                />
                <div style={{ flex: '0 0 auto', paddingLeft: '0.5rem', fontFamily: 'monospace' }}>
                  history {historyIndex}/{this.history.length - 1}
                </div>
              </div>
            </div>
            <div
              style={{
                alignSelf: 'stretch',
                flex: '0 0 auto',
                padding: '0.5rem',
                width: '12rem',
                fontSize: '14px',
                background: '#eee',
              }}
            >
              {/* BOOLEANS */}
              {filteredProps
                .filter(({ type }) => {
                  return type === 'boolean'
                })
                .map(prop => (
                  <div key={prop.name}>
                    <label>
                      <input
                        type="checkbox"
                        value={prop.name}
                        name={prop.name}
                        checked={!!this.state.props[prop.name]}
                        onChange={this.handleBooleanChange(prop.name)}
                      />{' '}
                      {prop.name}
                    </label>
                  </div>
                ))}

              {/* SELECTS */}
              {filteredProps
                .filter(({ type, name }) => {
                  // TODO: these should be of type "enum" in the schema
                  return type.includes('|')
                })
                .map(prop => {
                  const values = prop.type.split('|').map(string => {
                    const value = string.trim().replace(/"/g, '')
                    return value === 'boolean' ? true : value
                  })

                  return (
                    <div key={prop.name}>
                      <label>
                        <strong style={{ display: 'block' }}>{prop.name}</strong>
                        <select
                          style={{ width: '100%' }}
                          name={prop.name}
                          value={this.state.props[prop.name] || ''}
                          onChange={this.handleSelectChange(prop.name)}
                        >
                          <option value={undefined} />
                          {values.map(value => {
                            const string = typeof value !== 'string' ? JSON.stringify(value) : value
                            return (
                              <option key={string} value={string}>
                                {string}
                              </option>
                            )
                          })}
                        </select>
                      </label>
                    </div>
                  )
                })}

              {/* TEXT */}
              {info.props
                .filter(({ name }) => {
                  return !_.includes(filterProps, name)
                })
                .filter(({ type, name }) => {
                  return type === 'string' || type === 'ShorthandValue' || name === 'content'
                })
                .map(prop => (
                  <div key={prop.name}>
                    <label>
                      <strong style={{ display: 'block' }}>{prop.name}</strong>
                      <input
                        style={{ width: '100%' }}
                        name={prop.name}
                        value={this.state.props[prop.name] || ''}
                        onChange={this.handleStringChange(prop.name)}
                      />
                    </label>
                  </div>
                ))}
              <button style={{ marginTop: '0.5rem', width: '100%' }} onClick={this.randomizeProps}>
                ∞ random
              </button>
              <button style={{ marginTop: '0.5rem', width: '100%' }} onClick={this.resetProps}>
                ✕ reset
              </button>
              <button style={{ marginTop: '0.5rem', width: '100%' }} onClick={this.togglePlay}>
                {isPlaying ? '■ stop' : 'play ►'}
              </button>
            </div>
          </div>
          <button
            style={{
              padding: '0.5rem',
              width: '100%',
              color: '#fff',
              background: '#888',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={this.handleToggleCode}
          >
            {showCode ? 'Hide' : 'Show'} Code
          </button>

          {showCode && <CodeSnippet fitted mode="jsx" value={jsxString} />}
          {showCode && <CodeSnippet fitted mode="html" value={htmlString} />}
        </div>
        {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
        {/*<pre>{JSON.stringify(info, null, 2)}</pre>*/}
      </div>
    )
  }
}

export default ComponentExplorer
