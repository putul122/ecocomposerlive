import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const ROLES = 'saga/roles/ROLES'
export const ROLES_SUCCESS = 'saga/roles/ROLES_SUCCESS'
export const ROLES_FAILURE = 'saga/roles/ROLES_FAILURE'

export const actionCreators = {
  roles: createAction(ROLES),
  rolesSuccess: createAction(ROLES_SUCCESS),
  rolesFailure: createAction(ROLES_FAILURE)
}

export default function * watchRoles () {
  yield takeLatest(ROLES, roles)
}

export function * roles (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('clientAccessToken')
    const roles = yield call(
      axios.get,
      api.roles
    //   action.payload
    )
    yield put(actionCreators.rolesSuccess(roles.data))
  } catch (error) {
    yield put(actionCreators.rolesFailure(error))
  }
}
