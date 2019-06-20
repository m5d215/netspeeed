import { createAsyncAction, createStandardAction } from 'typesafe-actions'
import NetworkSpeed from '../entities/NetworkSpeed'
import Settings from '../entities/Settings'
import Viewport, { TimestampRange } from '../entities/Viewport'

export const initialize = createStandardAction('INITIALIZE')<void>()

export const changeSettings = createStandardAction('CHANGE_SETTINGS')<
  Settings
>()

export const fetch = createAsyncAction(
  'FETCH_REQUEST',
  'FETCH_SUCCESS',
  'FETCH_FAILURE'
)<TimestampRange, NetworkSpeed[], Error>()

export const changeWindow = createStandardAction('CHANGE_WINDOW')<
  Partial<Viewport>
>()
