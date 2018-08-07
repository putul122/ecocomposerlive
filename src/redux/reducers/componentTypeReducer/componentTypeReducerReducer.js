import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_SUCCESS, SEARCH_COMPONENT_SUCCESS } from '../../sagas/componentType/componentTypeSaga'
// Name Spaced Action Types
const SET_COMPONENT_TYPE_LOADING = 'ComponentTypeReducer/SET_COMPONENT_TYPE_LOADING'
const SET_CURRENT_PAGE = 'ComponentTypeReducer/SET_CURRENT_PAGE'

export const actions = {
  FETCH_COMPONENT_SUCCESS,
  SEARCH_COMPONENT_SUCCESS,
  SET_COMPONENT_TYPE_LOADING,
  SET_CURRENT_PAGE
}

export const actionCreators = {
    setComponentTypeLoading: createAction(SET_COMPONENT_TYPE_LOADING),
    setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
    componentTypes: '',
    isComponentTypeLoading: false,
    currentPage: 1
}

export default handleActions(
  {
    [FETCH_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentTypes: action.payload
    }),
    [SEARCH_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentTypes: action.payload,
      currentPage: 1
    }),
    [SET_COMPONENT_TYPE_LOADING]: (state, action) => ({
      ...state,
      isComponentTypeLoading: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)
