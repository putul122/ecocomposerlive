import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Discusson from '../../components/discussion/discussionComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/discussionReducer/discussionReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    discussionSlide: state.discussionReducer.discussionSlide,
    hideSlideAction: state.discussionReducer.hideSlideAction,
    discussions: state.discussionReducer.discussions,
    discussionMessages: state.discussionReducer.discussionMessages,
    discussionId: state.discussionReducer.discussionId
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setQuickslideDiscussion: actionCreators.setQuickslideDiscussion,
  setDiscussionId: actionCreators.setDiscussionId,
  fetchDiscussions: sagaActions.discussionActions.fetchDiscussions,
  fetchDiscussionMessages: sagaActions.discussionActions.fetchDiscussionMessages
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentWillMount: function () {
      console.log('component will mount Discussion', this.props)
      console.log('component will mount Discussion', this.props.match)
      let payload = {
        'context_type_key': this.props.type,
        'context_id': this.props.match.params.componentId
      }
      this.props.fetchDiscussions && this.props.fetchDiscussions(payload)
    },
    componentDidMount: function () {
        console.log('component did mount')
    }
  })
)(Discusson)
