// import { Cookies } from 'react-cookie'
import { baseAxios } from "api/axios";
import { call, put, takeLatest, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { apiEndPoints } from "api/variables";
import {
  actions,
  addNewUser,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
  getUsersList,
} from "./slice";
import {
  LoginCredentails,
  LoginResponse,
  message,
} from "utils/helpers/constants";

function* signInUser({ payload }: ReturnType<typeof loginUser>): any {
  try {
    const { email, password } = payload.data;
    if (
      email === LoginCredentails.email &&
      password === LoginCredentails.password
    ) {
      let cookies = new Cookies();
      cookies.set("user", JSON.stringify(LoginResponse), { path: "/" });
      yield put(actions.setAuthUser(LoginResponse));
      payload.navigate("/dashboard");
    } else {
      toast.error("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
}

function* fetchUsers({ payload }: ReturnType<typeof getUsersList>): any {
  try {
    const { limit } = payload;
    const response = yield call(baseAxios.get, apiEndPoints.users.users(limit));
    yield put(actions.setUsers(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* fetchUserById({ payload }: ReturnType<typeof getUserById>): any {
  try {
    const response = yield call(
      baseAxios.get,
      apiEndPoints.users.userById(payload.userId)
    );
    yield put(actions.setUser(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* deleteUserById({ payload }: ReturnType<typeof deleteUser>): any {
  try {
    yield call(baseAxios.delete, apiEndPoints.users.userById(payload.id));
    toast.success(message.USER_DELETE_MSG);
  } catch (err) {
    console.log(err);
  }
}

function* createUser({ payload }: ReturnType<typeof addNewUser>): any {
  try {
    const response = yield call(
      baseAxios.post,
      apiEndPoints.users.addUser,
      payload.data
    );
    if (response.data) {
      yield put(actions.setUser(response.data));
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateUserById({ payload }: ReturnType<typeof updateUser>): any {
  try {
    yield call(
      baseAxios.put,
      apiEndPoints.users.userById(payload.userId),
      payload.data
    );
    yield put(getUserById({ userId: payload.userId }));
    toast.success(message.USER_UPDATE_MSG);
  } catch (err) {
    console.log(err);
  }
}

export function* usersSaga(): any {
  yield all([yield takeLatest(loginUser, signInUser)]);
  yield all([yield takeLatest(getUsersList, fetchUsers)]);
  yield all([yield takeLatest(addNewUser, createUser)]);
  yield all([yield takeLatest(getUserById, fetchUserById)]);
  yield all([yield takeLatest(deleteUser, deleteUserById)]);
  yield all([yield takeLatest(updateUser, updateUserById)]);
}
