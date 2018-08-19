import { createAction, handleActions } from 'redux-actions'
import { FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS
 } from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// Name Spaced Action Types
const SET_DATA_LOADING = 'ComponentTypeComponentReducer/SET_DATA_LOADING'
const SET_CURRENT_PAGE = 'ComponentTypeComponentReducer/SET_CURRENT_PAGE'
const SET_CURRENT_TAB = 'ComponentTypeComponentReducer/SET_CURRENT_TAB'
const SET_ADD_CONNECTION_SETTINGS = 'ComponentTypeComponentReducer/SET_ADD_CONNECTION_SETTINGS'
const SET_RELATIONSHIPS_VALUE = 'ComponentTypeComponentReducer/SET_RELATIONSHIPS_VALUE'

export const actions = {
  FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS,
  FETCH_COMPONENT_CONSTRAINTS_SUCCESS,
  SET_DATA_LOADING,
  SET_CURRENT_PAGE,
  SET_CURRENT_TAB,
  SET_ADD_CONNECTION_SETTINGS,
  SET_RELATIONSHIPS_VALUE
}

export const actionCreators = {
    setDataLoading: createAction(SET_DATA_LOADING),
    setCurrentPage: createAction(SET_CURRENT_PAGE),
    setCurrentTab: createAction(SET_CURRENT_TAB),
    setAddConnectionSettings: createAction(SET_ADD_CONNECTION_SETTINGS),
    setRelationshipsValue: createAction(SET_RELATIONSHIPS_VALUE)
}

export const initialState = {
    componentTypeComponentData: '',
    componentTypeComponentProperties: '',
    componentTypeComponentRelationships: '',
    componentTypeComponentConstraints: '',
    componentTypeComponents: '',
    isComponentTypeLoading: false,
    currentPage: 1,
    showTabs: {'showProperty': ' active show', 'showRelationship': ''},
    addNewConnectionSettings: {
      firstSelectboxSelected: false,
      firstSelectboxIndex: '-1',
      secondSelectboxSelected: false,
      secondSelectboxIndex: '',
      isNewComponent: false,
      newComponentName: '',
      showAddRelationshipButton: false,
      showCreateConnectionButton: false,
      slectedConstraintObject: {},
      selectedComponentObject: {},
      relationshipText: '',
      componentText: '',
      newConnectionArray: []
    }
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
    }),
    [SET_CURRENT_TAB]: (state, action) => ({
      ...state,
      showTabs: action.payload
    }),
    [SET_ADD_CONNECTION_SETTINGS]: (state, action) => ({
      ...state,
      addNewConnectionSettings: action.payload
    }),
    [FETCH_COMPONENT_CONSTRAINTS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponentConstraints: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      componentTypeComponents: action.payload
    }),
    [SET_RELATIONSHIPS_VALUE]: (state, action) => ({
      ...state,
      componentTypeComponentRelationships: action.payload
    })
  },
  initialState
)
