import * as React from 'react'
import { SmartText } from './SmartText'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const Demo: React.FC<any> = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SmartText
        initialValue={localStorage.getItem('smartText') || 'I am really smart'}
        onSubmit={value => localStorage.setItem('smartText', value)}
      />
    </div>
  )
}
