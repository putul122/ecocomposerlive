import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const LOGIN_USER = 'saga/Login/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'saga/Login/LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'saga/Login/LOGIN_USER_FAILURE'

export const actionCreators = {
  loginUser: createAction(LOGIN_USER),
  loginUserSuccess: createAction(LOGIN_USER_SUCCESS),
  loginUserFailure: createAction(LOGIN_USER_FAILURE)
}

export default function * watchLoginUser () {
  yield takeLatest(LOGIN_USER, loginUser)
}

export function * loginUser (action) {
  try {
    console.log('action c user', action)
    let token = localStorage.getItem('clientAccessToken') || ''
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const loginUser = yield call(
      axios.post,
      api.loginUser,
      action.payload
    )
    yield put(actionCreators.loginUserSuccess(loginUser.data))
  } catch (error) {
    yield put(actionCreators.loginUserFailure(error))
  }
}
