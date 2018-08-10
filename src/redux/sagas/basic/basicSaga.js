import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'

// Saga action strings
export const FETCH_CLIENT_ACCESS_TOKEN = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN'
export const FETCH_CLIENT_ACCESS_TOKEN_SUCCESS = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_SUCCESS'
export const FETCH_CLIENT_ACCESS_TOKEN_FAILURE = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_FAILURE'
export const FETCH_USER_AUTHENTICATION = 'saga/Basic/FETCH_USER_AUTHENTICATION'
export const FETCH_USER_AUTHENTICATION_SUCCESS = 'saga/Basic/FETCH_USER_AUTHENTICATION_SUCCESS'
export const FETCH_USER_AUTHENTICATION_FAILURE = 'saga/Basic/FETCH_USER_AUTHENTICATION_FAILURE'

export const actionCreators = {
  fetchClientAccessToken: createAction(FETCH_CLIENT_ACCESS_TOKEN),
  fetchClientAccessTokenSuccess: createAction(FETCH_CLIENT_ACCESS_TOKEN_SUCCESS),
  fetchClientAccessTokenFailure: createAction(FETCH_CLIENT_ACCESS_TOKEN_FAILURE),
  fetchUserAuthentication: createAction(FETCH_USER_AUTHENTICATION),
  fetchUserAuthenticationSuccess: createAction(FETCH_USER_AUTHENTICATION_SUCCESS),
  fetchUserAuthenticationFailure: createAction(FETCH_USER_AUTHENTICATION_FAILURE)
}

export default function * watchBasic () {
  yield [
    takeLatest(FETCH_CLIENT_ACCESS_TOKEN, getClientAccessToken),
    takeLatest(FETCH_USER_AUTHENTICATION, getUserAuthentication)
  ]
}

export function * getClientAccessToken (action) {
  try {
    const clientAccessToken = yield call(
      axios.post,
      'http://discovery.eco.dev.ecoconductor.com/client_access_token',
      action.payload
    )
    yield put(actionCreators.fetchClientAccessTokenSuccess(clientAccessToken.data))
  } catch (error) {
    yield put(actionCreators.fetchClientAccessTokenFailure(error))
  }
}

export function * getUserAuthentication (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const userAuthentication = yield call(
      axios.get,
      'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token'
    )
    console.log('user Authentication JJJJJJJJ', userAuthentication)
    yield put(actionCreators.fetchUserAuthenticationSuccess(userAuthentication.data))
  } catch (error) {
    yield put(actionCreators.fetchUserAuthenticationFailure(error))
  }
}
