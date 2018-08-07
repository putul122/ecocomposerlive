import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'
let token = localStorage.getItem('clientAccessToken') || ''

// Saga action strings
export const CREATE_USER = 'saga/signUp/CREATE_USER'
export const CREATE_USER_SUCCESS = 'saga/signUp/CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'saga/signUp/CREATE_USER_FAILURE'

export const actionCreators = {
  createUser: createAction(CREATE_USER),
  createUserSuccess: createAction(CREATE_USER_SUCCESS),
  createUserFailure: createAction(CREATE_USER_FAILURE)
}

export default function * watchCreateUser () {
  yield takeLatest(CREATE_USER, createUser)
}

export function * createUser (action) {
  try {
    console.log('create user', action)
    console.log('token client', token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const registerUser = yield call(
      axios.post,
      api.createUser,
      action.payload
    )
    console.log('create user data', registerUser)
    yield put(actionCreators.createUserSuccess(registerUser.data))
  } catch (error) {
    console.log('create user error', error)
    yield put(actionCreators.createUserFailure(error))
  }
}
