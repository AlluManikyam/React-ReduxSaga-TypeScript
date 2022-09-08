import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'types'
import { initialState } from './slice'

const selectDomain = (state: RootState) => state.Users || initialState

export const selectUsers = createSelector([selectDomain], Users => Users)
