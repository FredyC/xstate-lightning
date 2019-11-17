import { Machine, assign } from 'xstate'

const reset = assign({
  value: ({ initialValue }) => initialValue
})

const confirm = assign({
  initialValue: ({ value }) => value
})

const updateValue = assign({
  value: (_, ev: { value: string }) => ev.value
})

const isEnterOrTab = (_, ev: { key: string }) => ['Enter', 'Tab'].includes(ev.key)

const isEscape = (_, ev) => ['Escape'].includes(ev.key)

const isValueDirty = ({ initialValue, value }) => initialValue !== value

const initialContext = {
  initialValue: '',
  value: ''
}

export const smartTextMachine = Machine<typeof initialContext>(
  {
    id: 'smartText',
    initial: 'reading',
    context: initialContext,
    states: {
      reading: {
        initial: 'hideIndicator',
        states: {
          hideIndicator: {},
          showIndicator: {}
        },
        onEntry: 'reset',
        on: {
          START_EDIT: 'editing',
          MOUSE_LEAVE: '.hideIndicator',
          MOUSE_ENTER: '.showIndicator'
        }
      },
      editing: {
        initial: 'unknown',
        states: {
          unknown: {
            on: {
              '': [
                { target: '#smartText.editing.dirty', cond: 'isValueDirty' },
                { target: '#smartText.editing.pristine' }
              ]
            }
          },
          pristine: {},
          dirty: {}
        },
        onEntry: 'setFocus',
        on: {
          KEYPRESS: [
            { target: '#smartText.confirm', cond: 'isEnterOrTab' },
            { target: '#smartText.cancel', cond: 'isEscape' }
          ],
          CHANGE: {
            actions: 'updateValue',
            target: '.unknown'
          },
          CANCEL_EDIT: 'cancel'
        }
      },
      confirm: {
        entry: ['confirm', 'submit'],
        on: {
          '': 'reading'
        }
      },
      cancel: {
        entry: 'reset',
        on: {
          '': 'reading'
        }
      }
    }
  },
  {
    guards: {
      isValueDirty,
      isEnterOrTab,
      isEscape
    } as any,
    actions: {
      confirm,
      reset,
      updateValue,
      setFocus: () => {},
      submit: () => {}
    } as any
  }
)
