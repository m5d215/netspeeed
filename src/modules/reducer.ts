import produce from 'immer'
import { ActionType, createReducer } from 'typesafe-actions'
import { defaultSettings } from '../entities/Settings'
import floorDate from '../utilities/floorDate'
import * as actions from './actions'
import State from './State'

const initialState: State = {
  settings: defaultSettings,
  status: 'none',
  records: [],
  viewport: {
    resolution: 'day',
    timestamp: floorDate(Date.now())
  }
}

export default createReducer<State, ActionType<typeof actions>>(initialState)
  .handleAction(actions.changeSettings, (state, { payload: settings }) =>
    produce(state, draft => {
      draft.settings = { ...state.settings, ...settings }
    })
  )
  .handleAction(actions.fetch.request, state =>
    produce(state, draft => {
      draft.status = 'fetching'
    })
  )
  .handleAction(actions.fetch.success, (state, { payload: records }) =>
    produce(state, draft => {
      draft.status = 'none'
      draft.records = records
    })
  )
  .handleAction(actions.fetch.failure, (state, { payload: error }) =>
    produce(state, draft => {
      draft.status = error
      draft.records = []
    })
  )
  .handleAction(actions.changeWindow, (state, { payload: viewport }) =>
    produce(state, draft => {
      draft.viewport = { ...state.viewport, ...viewport }
    })
  )
