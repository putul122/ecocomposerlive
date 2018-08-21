import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_COMPONENT_TYPE_COMPONENT = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT'
export const FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE'
export const FETCH_COMPONENT_TYPE_COMPONENTS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENTS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS'
export const FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE'
export const FETCH_COMPONENT_CONSTRAINTS = 'saga/componentTypeComponent/FETCH_COMPONENT_CONSTRAINTS'
export const FETCH_COMPONENT_CONSTRAINTS_SUCCESS = 'saga/componentTypeComponent/FETCH_COMPONENT_CONSTRAINTS_SUCCESS'
export const FETCH_COMPONENT_CONSTRAINTS_FAILURE = 'saga/componentTypeComponent/FETCH_COMPONENT_CONSTRAINTS_FAILURE'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE'
export const UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES'
export const UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS'
export const UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE = 'saga/componentTypeComponent/UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE'

export const actionCreators = {
  fetchComponentTypeComponent: createAction(FETCH_COMPONENT_TYPE_COMPONENT),
  fetchComponentTypeComponentSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_SUCCESS),
  fetchComponentTypeComponentFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_FAILURE),
  fetchcomponentTypeComponentProperties: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES),
  fetchcomponentTypeComponentPropertiesSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS),
  fetchcomponentTypeComponentPropertiesFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE),
  fetchcomponentTypeComponentRelationships: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS),
  fetchcomponentTypeComponentRelationshipsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS),
  fetchcomponentTypeComponentRelationshipsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE),
  fetchComponentTypeComponents: createAction(FETCH_COMPONENT_TYPE_COMPONENTS),
  fetchComponentTypeComponentsSuccess: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_SUCCESS),
  fetchComponentTypeComponentsFailure: createAction(FETCH_COMPONENT_TYPE_COMPONENTS_FAILURE),
  fetchComponentConstraints: createAction(FETCH_COMPONENT_CONSTRAINTS),
  fetchComponentConstraintsSuccess: createAction(FETCH_COMPONENT_CONSTRAINTS_SUCCESS),
  fetchComponentConstraintsFailure: createAction(FETCH_COMPONENT_CONSTRAINTS_FAILURE),
  updateComponentTypeComponentRelationships: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS),
  updateComponentTypeComponentRelationshipsSuccess: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_SUCCESS),
  updateComponentTypeComponentRelationshipsFailure: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS_FAILURE),
  updateComponentTypeComponentProperties: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES),
  updateComponentTypeComponentPropertiesSuccess: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_SUCCESS),
  updateComponentTypeComponentPropertiesFailure: createAction(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES_FAILURE)
}

export default function * watchComponentTypeComponent () {
  yield [
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT, getComponentTypeComponent),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_PROPERTIES, getComponentTypeComponentProperties),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS, getComponentTypeComponentRelationships),
    takeLatest(FETCH_COMPONENT_CONSTRAINTS, getComponentConstraints),
    takeLatest(FETCH_COMPONENT_TYPE_COMPONENTS, getComponentTypeComponents),
    takeLatest(UPDATE_COMPONENT_TYPE_COMPONENT_RELATIONSHIPS, updateComponentTypeComponentRelationships),
    takeLatest(UPDATE_COMPONENT_TYPE_COMPONENT_PROPERTIES, updateComponentTypeComponentProperties)
  ]
}

export function * getComponentTypeComponent (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponent(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentTypeComponentSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentFailure(error))
  }
}

export function * getComponentTypeComponentProperties (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentProperty(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchcomponentTypeComponentPropertiesSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeComponentPropertiesFailure(error))
  }
}

export function * getComponentTypeComponentRelationships (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentRelationships(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchcomponentTypeComponentRelationshipsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchcomponentTypeComponentRelationshipsFailure(error))
  }
}

// export function * getComponentsConstraints (action) {
//   try {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
//     const componentTypes = yield call(
//       axios.get,
//       api.getComponentsConstraints(action.payload)
//       // {params: action.payload}
//     )
//     yield put(actionCreators.fetchcomponentTypeComponentRelationshipsSuccess(componentTypes.data))
//   } catch (error) {
//     yield put(actionCreators.fetchcomponentTypeComponentRelationshipsFailure(error))
//   }
// }

export function * getComponentConstraints (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentConstraints(action.payload)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentConstraintsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentConstraintsFailure(error))
  }
}

export function * getComponentTypeComponents (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.get,
      api.getComponentTypeComponents(action.payload.componentTypeId)
      // {params: action.payload}
    )
    yield put(actionCreators.fetchComponentTypeComponentsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.fetchComponentTypeComponentsFailure(error))
  }
}

export function * updateComponentTypeComponentRelationships (action) {
  try {
    console.log('saga action', action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.patch,
      api.updateComponentRelationships(action.payload),
      action.payload.data
      // {params: action.payload}
    )
    yield put(actionCreators.updateComponentTypeComponentRelationshipsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.updateComponentTypeComponentRelationshipsFailure(error))
  }
}

export function * updateComponentTypeComponentProperties (action) {
  try {
    console.log('saga action', action)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('userAccessToken')
    const componentTypes = yield call(
      axios.patch,
      api.updateComponentProperties(action.payload),
      action.payload.data
      // {params: action.payload}
    )
    yield put(actionCreators.updateComponentTypeComponentRelationshipsSuccess(componentTypes.data))
  } catch (error) {
    yield put(actionCreators.updateComponentTypeComponentRelationshipsFailure(error))
  }
}
