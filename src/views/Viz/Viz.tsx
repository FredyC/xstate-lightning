import * as React from 'react'

import graphImage from './graph.png'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${graphImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    '& a': {
      position: 'absolute',
      bottom: '1rem',
      left: '50%',
      fontSize: '1rem'
    }
  }
})

export const Viz: React.FC<any> = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <a href="https://xstate.js.org/viz/?gist=577d8ba60bae726aa4d1105c461fb80a">
        https://xstate.js.org/viz/?gist=577d8ba60bae726aa4d1105c461fb80a
      </a>
    </div>
  )
}
