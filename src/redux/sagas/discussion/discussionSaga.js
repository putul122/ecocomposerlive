import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { createAction } from 'redux-actions'
import api from '../../../constants'

// Saga action strings
export const FETCH_DISCUSSIONS = 'saga/Discussion/FETCH_DISCUSSIONS'
export const FETCH_DISCUSSIONS_SUCCESS = 'saga/Discussion/FETCH_DISCUSSIONS_SUCCESS'
export const FETCH_DISCUSSIONS_FAILURE = 'saga/Discussion/FETCH_DISCUSSIONS_FAILURE'
export const FETCH_DISCUSSION_MESSAGES = 'saga/Discussion/FETCH_DISCUSSION_MESSAGES'
export const FETCH_DISCUSSION_MESSAGES_SUCCESS = 'saga/Discussion/FETCH_DISCUSSION_MESSAGES_SUCCESS'
export const FETCH_DISCUSSION_MESSAGES_FAILURE = 'saga/Discussion/FETCH_DISCUSSION_MESSAGES_FAILURE'

export const actionCreators = {
  fetchDiscussions: createAction(FETCH_DISCUSSIONS),
  fetchDiscussionsSuccess: createAction(FETCH_DISCUSSIONS_SUCCESS),
  fetchDiscussionsFailure: createAction(FETCH_DISCUSSIONS_FAILURE),
  fetchDiscussionMessages: createAction(FETCH_DISCUSSION_MESSAGES),
  fetchDiscussionMessagesSuccess: createAction(FETCH_DISCUSSION_MESSAGES_SUCCESS),
  fetchDiscussionMessagesFailure: createAction(FETCH_DISCUSSION_MESSAGES_FAILURE)
}

export default function * watchDiscussions () {
  yield [
    takeLatest(FETCH_DISCUSSIONS, getDiscussions),
    takeLatest(FETCH_DISCUSSION_MESSAGES, getDiscussionMessages)
  ]
}

export function * getDiscussions (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const discussions = yield call(
      axios.get,
      api.getDiscussions,
      {params: action.payload}
    )
    yield put(actionCreators.fetchDiscussionsSuccess(discussions.data))
  } catch (error) {
    yield put(actionCreators.fetchDiscussionsFailure(error))
  }
}

export function * getDiscussionMessages (action) {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('userAccessToken') ? localStorage.getItem('userAccessToken') : '')
    const discussionMessages = yield call(
      axios.get,
      api.getDiscussionMessages(action.payload)
    )
    yield put(actionCreators.fetchDiscussionMessagesSuccess(discussionMessages.data))
  } catch (error) {
    yield put(actionCreators.fetchDiscussionMessagesFailure(error))
  }
}
