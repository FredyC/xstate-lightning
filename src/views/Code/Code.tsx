import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'

import code1 from './machine.png'
import code2 from './machine_fns.png'
import code3 from './comp.png'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%'
  },
  image: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%'
  }
})

export const Code: React.FC<any> = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SwipeableViews
        enableMouseEvents
        style={{ width: '100%', height: '100%' }}
        containerStyle={{ width: '100%', height: '100%' }}
      >
        <div className={classes.image} style={{ backgroundImage: `url(${code1})` }} />
        <div className={classes.image} style={{ backgroundImage: `url(${code2})` }} />
        <div className={classes.image} style={{ backgroundImage: `url(${code3})` }} />
      </SwipeableViews>
    </div>
  )
}
