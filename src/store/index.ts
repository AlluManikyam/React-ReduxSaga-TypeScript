/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit'
import { all, fork } from 'redux-saga/effects'
import { InjectedReducersType } from '../utils/types/injector-typings'
import { reducer as common } from './common/slice'
import { usersSaga } from './userManagement/saga'
import { reducer as Users } from './userManagement/slice'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error

  return combineReducers({
    common,
    Users,
    ...injectedReducers,
  })
}
export function* rootSaga() {
  yield all([
    fork(usersSaga),
  ])
}
