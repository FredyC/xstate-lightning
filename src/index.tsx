import * as React from 'react'
import { render } from 'react-dom'
import { ButtonGroup, Button, CssBaseline, Grow } from '@material-ui/core'

import { Demo } from './views/Demo/Demo'
import { Viz } from './views/Viz/Viz'
import { Code } from './views/Code/Code'

import './styles.css'
import { useKeyPress } from './useKeyPress'

type TView = 'demo' | 'viz' | 'code'

const views: Record<TView, React.FC> = {
  demo: Demo,
  viz: Viz,
  code: Code
}
const viewKeys = Object.keys(views) as TView[]

function App() {
  const [view, setView] = React.useState<TView>('demo')

  const leftArrow = useKeyPress('a')
  const rightArrow = useKeyPress('d')

  React.useEffect(() => {
    setView(currView => {
      let idx = viewKeys.findIndex(v => v === currView)
      if (leftArrow) {
        idx -= 1
      } else if (rightArrow) {
        idx += 1
      }
      const nextIdx = Math.max(0, Math.min(viewKeys.length - 1, idx))
      return viewKeys[nextIdx]
    })
  }, [leftArrow, rightArrow])

  return (
    <div className="App">
      <CssBaseline />
      {Object.keys(views).map(_view => (
        <View key={_view} component={views[_view]} visible={_view === view} />
      ))}
      <ButtonGroup variant="text" size="large" className="Nav">
        <Button onClick={() => setView('demo')}>1</Button>
        <Button onClick={() => setView('viz')}>2</Button>
        <Button onClick={() => setView('code')}>3</Button>
      </ButtonGroup>
    </div>
  )
}

function View({ component, visible }: { component: React.FC; visible: boolean }) {
  return (
    <Grow in={visible} timeout={500}>
      <ViewInner Comp={component} />
    </Grow>
  )
}

function ViewInner({ style: { visibility, ...style }, Comp }: any) {
  const hide = visibility === 'hidden' ? { display: 'none' } : {}
  return (
    <div style={{ ...style, ...hide, width: '100%', height: '100%', position: 'absolute' }}>
      <Comp />
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
