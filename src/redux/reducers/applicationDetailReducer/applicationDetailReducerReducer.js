import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_BY_ID_SUCCESS, FETCH_COMPONENT_CONSTRAINT_SUCCESS, FETCH_COMPONENT_COMPONENT_SUCCESS, SEARCH_COMPONENT_COMPONENT_SUCCESS, ADD_COMPONENT_COMPONENT_SUCCESS } from '../../sagas/applicationDetail/applicationDetailSaga'
// Name Spaced Action Types
const SELECTED_COMPONENT_TYPE = 'applicationDetailReducer/SELECTED_COMPONENT_TYPE'
const SET_CURRENT_PAGE = 'applicationDetailReducer/SET_CURRENT_PAGE'

export const actions = {
  FETCH_COMPONENT_BY_ID_SUCCESS,
  FETCH_COMPONENT_CONSTRAINT_SUCCESS,
  FETCH_COMPONENT_COMPONENT_SUCCESS,
  SEARCH_COMPONENT_COMPONENT_SUCCESS,
  SET_CURRENT_PAGE,
  ADD_COMPONENT_COMPONENT_SUCCESS

}

export const actionCreators = {
  selectedComponentType: createAction(SELECTED_COMPONENT_TYPE),
  setCurrentPage: createAction(SET_CURRENT_PAGE),
  setAddRedirectFlag: createAction(ADD_COMPONENT_COMPONENT_SUCCESS)
}

export const initialState = {
  componentDetail: '',
  componentConstraints: '',
  componentComponents: '',
  selectedComponentType: '',
  currentPage: 1,
  addComponent: false
}

export default handleActions(
  {
    [FETCH_COMPONENT_BY_ID_SUCCESS]: (state, action) => ({
      ...state,
      componentDetail: action.payload
    }),
    [FETCH_COMPONENT_CONSTRAINT_SUCCESS]: (state, action) => ({
      ...state,
      componentConstraints: action.payload
    }),
    [FETCH_COMPONENT_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentComponents: action.payload
    }),
    [SEARCH_COMPONENT_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentComponents: action.payload,
      currentPage: 1
    }),
    [SELECTED_COMPONENT_TYPE]: (state, action) => ({
      ...state,
      selectedComponentType: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    }),
    [ADD_COMPONENT_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      addComponent: action.payload
    })
  },
  initialState
)
