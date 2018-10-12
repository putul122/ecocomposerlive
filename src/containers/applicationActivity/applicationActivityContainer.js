import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationActivity from '../../components/applicationActivity/applicationActivityComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    activityMessages: state.applicationActivityReducer.activityMessages
    // selectedComponentType: state.applicationDetailReducer.selectedComponentType
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    activityMessage: sagaActions.applicationActivityActions.activityMessage
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
      console.log('Activity feed will mount', this.props)
      this.props.activityMessage && this.props.activityMessage()
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.notificationReceived && (nextProps.notificationReceived !== this.props.notificationReceived)) {
        if (nextProps.notificationReceived) {
          this.props.activityMessage && this.props.activityMessage()
        }
      }
    }
  })
)(ApplicationActivity)
