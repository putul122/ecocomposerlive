import { createAction, handleActions } from 'redux-actions'
import { FETCH_DISCUSSIONS_SUCCESS, FETCH_DISCUSSION_MESSAGES_SUCCESS } from '../../sagas/discussion/discussionSaga'

// Name Spaced Action Types
const SET_QUICKSLIDE_DISCUSSION = 'DiscussionReducer/SET_QUICKSLIDE_DISCUSSION'
const SET_DISCUSSION_ID = 'DiscussionReducer/SET_DISCUSSION_ID'

export const actions = {
    SET_QUICKSLIDE_DISCUSSION,
    FETCH_DISCUSSIONS_SUCCESS,
    FETCH_DISCUSSION_MESSAGES_SUCCESS,
    SET_DISCUSSION_ID
}

export const actionCreators = {
    setQuickslideDiscussion: createAction(SET_QUICKSLIDE_DISCUSSION),
    setDiscussionId: createAction(SET_DISCUSSION_ID)
}

export const initialState = {
  discussionSlide: 'm-quick-sidebar--off',
  hideSlideAction: false,
  discussions: '',
  discussionMessages: '',
  discussionId: ''
}

export default handleActions(
  {
    [SET_QUICKSLIDE_DISCUSSION]: (state, action) => ({
      ...state,
      discussionSlide: action.payload
    }),
    [FETCH_DISCUSSIONS_SUCCESS]: (state, action) => ({
      ...state,
      discussions: action.payload
    }),
    [FETCH_DISCUSSION_MESSAGES_SUCCESS]: (state, action) => ({
      ...state,
      discussionMessages: action.payload
    }),
    [SET_DISCUSSION_ID]: (state, action) => ({
      ...state,
      discussionId: action.payload
    })
  },
  initialState
)
