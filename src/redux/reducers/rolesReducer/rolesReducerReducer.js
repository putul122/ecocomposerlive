import { createAction, handleActions } from 'redux-actions'
// import { LOGIN_USER_SUCCESS } from '../../sagas/login/loginSaga'
// // Name Spaced Action Types
// const SET_LOGIN_PROCESS_STATUS = 'BasicReducer/SET_LOGIN_PROCESS_STATUS'
const SET_ROLES_ACTION_SETTINGS = 'rolesReducer/SET_ROLES_ACTION_SETTINGS'

export const actions = {
    // LOGIN_USER_SUCCESS,
    SET_ROLES_ACTION_SETTINGS
}

export const actionCreators = {
   setRolesActionSettings: createAction(SET_ROLES_ACTION_SETTINGS)
}

export const initialState = {
  rolesActionSettings: {
    isAddModalOpen: false,
    isDeleteModalOpen: false
  }
}

export default handleActions(
  {
    // [LOGIN_USER_SUCCESS]: (state, action) => ({
    //     ...state,
    //     loggedInresponse: action.payload,
    //     isLoggedin: action.payload.error_code === null || false
    // }),
        [SET_ROLES_ACTION_SETTINGS]: (state, action) => ({
          ...state,
          rolesActionSettings: action.payload
        })
  },
  initialState
)
