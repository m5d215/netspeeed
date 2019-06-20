import axios, { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import NetworkSpeed, { smooth } from '../entities/NetworkSpeed'
import Settings, { defaultSettings } from '../entities/Settings'
import { transformRange } from '../entities/Viewport'
import floorDate from '../utilities/floorDate'
import { changeSettings, changeWindow, fetch, initialize } from './actions'
import State from './State'

const LOCAL_STORAGE_SETTINGS_KEY = 'settings'

export default function* saga(): SagaIterator {
  yield takeLatest(initialize, handleInitialize)
  yield takeLatest(changeSettings, handleChangeSettings)
  yield takeLatest(fetch.request, handleFetch)
  yield takeLatest(changeWindow, handleChangeWindow)
}

function* handleInitialize(_: ActionType<typeof initialize>): SagaIterator {
  const rawSettings = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY)
  if (rawSettings !== null) {
    const settings = JSON.parse(rawSettings) as Partial<Settings>
    yield put(changeSettings({ ...defaultSettings, ...settings }))
  } else {
    const { viewport }: State = yield select()
    yield put(fetch.request(transformRange(viewport)))
  }
}

function* handleChangeSettings(
  action: ActionType<typeof changeSettings>
): SagaIterator {
  const { payload: settings } = action
  localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings))

  const { viewport }: State = yield select()
  yield put(fetch.request(transformRange(viewport)))
}

function* handleFetch(action: ActionType<typeof fetch.request>): SagaIterator {
  const {
    payload: { begin, end }
  } = action

  const {
    settings: { serverURL: baseURL, user },
    viewport: { resolution }
  }: State = yield select()

  try {
    const { data }: AxiosResponse<NetworkSpeed[]> = yield call(
      axios.get,
      `/users/${user}/netspeeed`,
      {
        baseURL,
        params: { begin, end }
      }
    )
    if (resolution !== 'day') {
      yield put(fetch.success(smooth(data, floorDate)))
    } else {
      yield put(fetch.success(data))
    }
  } catch (error) {
    yield put(fetch.failure(error))
  }
}

function* handleChangeWindow(_: ActionType<typeof changeWindow>): SagaIterator {
  yield delay(400)

  const { viewport }: State = yield select()
  yield put(fetch.request(transformRange(viewport)))
}
