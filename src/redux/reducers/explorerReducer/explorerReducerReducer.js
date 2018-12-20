import {createAction, handleActions} from 'redux-actions'
import {
    FETCH_COMPONENTS_SUCCESS,
    FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS
} from '../../sagas/componentTypeComponent/componentTypeComponentSaga'
// Name Spaced Action Types
const SET_SELECT_OPTION = 'explorerReducer/SET_SELECT_OPTION'
const SET_FILTER_SETTINGS = 'explorerReducer/SET_FILTER_SETTINGS'
const RESET_RESPONSE = 'explorerReducer/RESET_RESPONSE'

export const actions = {
  FETCH_COMPONENTS_SUCCESS,
  FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS,
  SET_SELECT_OPTION,
  SET_FILTER_SETTINGS,
  RESET_RESPONSE
}

export const actionCreators = {
  setSelectOption: createAction(SET_SELECT_OPTION),
  components: '',
  setFilterSettings: createAction(SET_FILTER_SETTINGS),
  resetResponse: createAction(RESET_RESPONSE)
}

export const initialState = {
  selectedOption: '',
  components: '',
  componentRelationships: '',
  modelRelationshipData: '',
  filterSettings: {
    filters: [],
    modelRelationshipData: [],
    startNode: {},
    setRelationshipData: false,
    selectedOption: null
  },
  currentPage: 1,
  perPage: 10,
  createTemplateResponse: ''
}

export default handleActions(
  {
    [SET_SELECT_OPTION]: (state, action) => ({
      ...state,
      selectedOption: action.payload
    }),
    [SET_FILTER_SETTINGS]: (state, action) => ({
      ...state,
      filterSettings: action.payload
    }),
    [FETCH_COMPONENTS_SUCCESS]: (state, action) => ({
      ...state,
      components: action.payload
    }),
    [FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS]: (state, action) => ({
      ...state,
      componentRelationships: action.payload
    }),
    [RESET_RESPONSE]: (state, action) => ({
      ...state,
      componentRelationships: ''
    })
  },
  initialState
)
