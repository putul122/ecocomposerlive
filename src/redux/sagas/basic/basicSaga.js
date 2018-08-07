import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
// import api from '../../../constants'
// axios.defaults.withCredentials = true
// const apz = axios.create({
// 	withCredentials: true
// })
console.log(axios)

// Saga action strings
export const FETCH_CLIENT_ACCESS_TOKEN = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN'
export const FETCH_CLIENT_ACCESS_TOKEN_SUCCESS = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_SUCCESS'
export const FETCH_CLIENT_ACCESS_TOKEN_FAILURE = 'saga/Basic/FETCH_CLIENT_ACCESS_TOKEN_FAILURE'

export const actionCreators = {
  fetchClientAccessToken: createAction(FETCH_CLIENT_ACCESS_TOKEN),
  fetchClientAccessTokenSuccess: createAction(FETCH_CLIENT_ACCESS_TOKEN_SUCCESS),
  fetchClientAccessTokenFailure: createAction(FETCH_CLIENT_ACCESS_TOKEN_FAILURE)
}

export default function * watchBasic () {
  console.log('basic saga watch')
  yield takeLatest(FETCH_CLIENT_ACCESS_TOKEN, getClientAccessToken)
}

export function * getClientAccessToken (action) {
  try {
    console.log('action c user', action)
    const clientAccessToken = yield call(
      axios.post,
      'http://discovery.eco.dev.ecoconductor.com/client_access_token',
      action.payload
    )
    console.log('calling api basic', action)
    console.log('access token response', clientAccessToken)
    // document.cookie = 'ARRAffinity=05815e0557966c201dc16275542526907206bb509874c0c62f71bc49fbcaa301;Path=/;Domain=ecoconductor-dev-api-discovery.azurewebsites.net'
    yield put(actionCreators.fetchClientAccessTokenSuccess(clientAccessToken.data))
  } catch (error) {
    console.log('client access', error)
    yield put(actionCreators.fetchClientAccessTokenFailure(error))
  }
}
