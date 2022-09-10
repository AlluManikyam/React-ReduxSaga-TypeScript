import { PayloadAction, createAction } from '@reduxjs/toolkit'
import { createSlice } from 'utils/@reduxjs/toolkit'
import { Users } from './types'

// eslint-disable-next-line
const getUsersList = createAction<any>('users/getUsersList')
const getUserById = createAction<any>('users/getUserById')
const loginUser = createAction<any>('users/loginUser')
const addNewUser = createAction<any>('users/addNewUser')
const updateUser = createAction<any>('users/updateUser')
const deleteUser = createAction<any>('users/deleteUser')


export const initialState: Users = {
  users: [],
  user: {},
  authUser: {},
  userInfo: {},
  userEmail: null,
}
const UserSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setUsersData(state, action: PayloadAction<any>) {
      state.users = action.payload
    },
    setAuthUser(state, action: PayloadAction<any>) {
      state.authUser = action.payload
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload
    },
    setUsers(state, action: PayloadAction<any>) {
      state.users = action.payload
    },
    setUserEmail(state, action: PayloadAction<any>) {
      state.userEmail = action.payload
    },
  },
})
export {
  loginUser,
  getUsersList,
  addNewUser,
  deleteUser,
  getUserById,
  updateUser,
}
export const { actions, reducer, name: sliceKey } = UserSlice
