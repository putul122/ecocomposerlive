import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS, FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS, FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS } from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// Name Spaced Action Types
const SET_DATA_LOADING = 'ComponentTypeComponentReducer/SET_DATA_LOADING'
const SET_CURRENT_PAGE = 'ComponentTypeComponentReducer/SET_CURRENT_PAGE'

export const actions = {
  FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  SET_DATA_LOADING,
  SET_CURRENT_PAGE
}

export const actionCreators = {
    setDataLoading: createAction(SET_DATA_LOADING),
    setCurrentPage: createAction(SET_CURRENT_PAGE)
}

export const initialState = {
    componentTypeComponentData: '',
    componentTypeComponentProperties: '',
    componentTypeComponentRelationships: '',
    isComponentTypeLoading: false,
    currentPage: 1
}

export default handleActions(
  {
    [FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentData: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentProperties: action.payload,
      currentPage: 1
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentRelationships: action.payload
    }),
    [SET_CURRENT_PAGE]: (state, action) => ({
      ...state,
      currentPage: action.payload
    })
  },
  initialState
)
