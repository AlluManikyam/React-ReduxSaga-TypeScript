import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'root-state-types'
import { initialState } from './slice'

const selectUserState = (state: RootState) => state.Users || initialState

export const userSelector = createSelector([selectUserState], Users => Users)
