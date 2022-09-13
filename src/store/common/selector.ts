import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'root-state-types'

import { initialState } from './slice'

const selectDomain = (state: RootState) => state.Common || initialState

export const commonSelector = createSelector([selectDomain], Common => Common)
