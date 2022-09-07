// import { Cookies } from 'react-cookie'
import { baseAxios } from '../../api/axios'
import { apiEndPoints } from '../../api/variables'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import { Cookies } from 'react-cookie'
import {
  actions,
  addNewUser,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
} from './slice'
import { message } from '../../utils/helpers/constants'
import { toast } from 'react-toastify'


function* fetchUserById({ payload }: ReturnType<typeof getUserById>): any {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.users.userById(payload.userId),
    )
    yield put(actions.setUser(response.data))
  } catch (err) {
    console.log(err)
  }
}


function* signInUser({ payload }: ReturnType<typeof loginUser>): any {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.users.login,
      payload.data
    );
    if (response?.data) {
      let cookies = new Cookies()
      if (response.data) cookies.set('user', JSON.stringify(response.data), { path: '/' })
      yield put(actions.setAuthUser(response.data))
    } 
  } catch (err) {
    console.log(err)
  }
}


function* deleteUserById({ payload }: ReturnType<typeof deleteUser>): any {
  try {
    yield call(
      baseAxios.delete,
      apiEndPoints.users.userById(payload.id),
    )
    toast.success(message.USER_DELETE_MSG)
  } catch (err) {
    console.log(err)
  }
}

function* createUser({ payload }: ReturnType<typeof addNewUser>): any {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.users.addUser,
      payload.data,
    )
    if (response.data) {
      yield put(actions.setUser(response.data))
    }
  } catch (err) {
    console.log(err)
  }
}


function* updateUserById({ payload }: ReturnType<typeof updateUser>): any {
  try {
    yield call(
      baseAxios.put,
      apiEndPoints.users.userById(payload.userId),
      payload.data,
    )
    yield put(getUserById({ userId:payload.userId }))
    toast.success(message.USER_UPDATE_MSG)
  } catch (err) {
    console.log(err)
  }
}


export function* usersSaga(): any {
  yield all([yield takeLatest(addNewUser, createUser)])
  yield all([yield takeLatest(getUserById, fetchUserById)])
  yield all([yield takeLatest(deleteUser, deleteUserById)])
  yield all([yield takeLatest(updateUser, updateUserById)])
  yield all([yield takeLatest(loginUser, signInUser)])
}
