import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS
 } from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// Name Spaced Action Types
const SET_DATA_LOADING = 'ComponentModalViewReducer/SET_DATA_LOADING'
const SET_CURRENT_TAB = 'ComponentModalViewReducer/SET_CURRENT_TAB'
const SET_MODAL_SETTINGS = 'ComponentModalViewReducer/SET_MODAL_SETTINGS'

export const actions = {
  FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  SET_CURRENT_TAB,
  SET_MODAL_SETTINGS
}

export const actionCreators = {
  setDataLoading: createAction(SET_DATA_LOADING),
  setCurrentTab: createAction(SET_CURRENT_TAB),
  setModalSettings: createAction(SET_MODAL_SETTINGS)
}

export const initialState = {
  component: '',
  componentTypeComponentData: '',
  componentTypeComponentProperties: '',
  componentTypeComponentRelationships: '',
  showTabs: {'showProperty': ' active show', 'showRelationship': ''},
  isModalOpen: true
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
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    [SET_MODAL_SETTINGS]: (state, action) => ({
      ...state,
      isModalOpen: action.payload
    })
  },
  initialState
)
