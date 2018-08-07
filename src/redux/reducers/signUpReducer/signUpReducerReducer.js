import { handleActions } from 'redux-actions'
import { CREATE_USER_SUCCESS } from '../../sagas/signUp/signUpSaga'
// Name Spaced Action Types

export const actions = {
  CREATE_USER_SUCCESS
}

export const actionCreators = {}

export const initialState = {
  token: '',
  isLoggedin: localStorage.getItem('isLoggedin') ? localStorage.getItem('isLoggedin') : false,
  createUserResponse: ''
}

export default handleActions(
  {
    [CREATE_USER_SUCCESS]: (state, action) => ({
        ...state,
        createUserResponse: action.payload,
        isLoggedin: true
    })
  },
  initialState
)
