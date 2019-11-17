import React from 'react'
import { useMachine } from '@xstate/react'
import { smartTextMachine } from './smartTextMachine'
import { makeStyles } from '@material-ui/styles'
import { ClickAwayListener } from '@material-ui/core'
import { Create } from '@material-ui/icons'
import { green, red } from '@material-ui/core/colors'
import clsx from 'clsx'

type TProps = {
  initialValue: string
  onSubmit(value: string): void
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '1rem',
    fontSize: '4rem',
    width: '80%',
    '&.reading .writer, &.editing .reader': {
      display: 'none'
    },
    '& .reader, .writer': {
      flexGrow: 1
    }
  },
  indicator: {
    cursor: 'pointer',
    display: (({ showIndicator }: { showIndicator: boolean }) =>
      showIndicator ? 'inline-block' : 'none') as any
  },
  reader: {
    padding: '1.5rem',
    cursor: 'text'
  },
  writer: {
    '& input': {
      padding: '1.5rem',
      fontSize: '4rem',
      border: 0,
      width: '100%',
      '&.pristine': {
        backgroundColor: green[100]
      },
      '&.dirty': {
        backgroundColor: red[100]
      }
    }
  }
})

export const SmartText: React.FC<TProps> = ({ initialValue, onSubmit }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [current, send] = useMachine(
    smartTextMachine.withContext({
      initialValue
    } as any),
    {
      actions: {
        submit: () => {
          onSubmit((current.context as any).value)
        },
        setFocus: () => {
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus()
            }
          })
        }
      }
    }
  )

  const classes = useStyles({
    showIndicator: current.matches('reading.showIndicator')
  })

  // @ts-ignore Some weirdness with unknown
  const { value } = current.context

  return (
    <div
      className={clsx(classes.root, {
        reading: current.matches('reading'),
        editing: current.matches('editing')
      })}
      onMouseOver={() => send('MOUSE_ENTER')}
      onMouseOut={() => send('MOUSE_LEAVE')}
    >
      <div className={clsx('reader', classes.reader)} onDoubleClick={() => send('START_EDIT')}>
        {value}
      </div>
      <Create
        className={classes.indicator}
        fontSize="large"
        onClick={ev => {
          send('START_EDIT')
          ev.preventDefault()
        }}
      />
      <div className={clsx('writer', classes.writer)}>
        <ClickAwayListener onClickAway={() => send('CANCEL_EDIT')}>
          <input
            ref={inputRef}
            className={clsx({
              pristine: current.matches('editing.pristine'),
              dirty: current.matches('editing.dirty')
            })}
            value={value}
            onChange={ev => send('CHANGE', { value: ev.target.value })}
            onKeyDown={ev => send('KEYPRESS', { key: ev.key })}
          />
        </ClickAwayListener>
      </div>
    </div>
  )
}
