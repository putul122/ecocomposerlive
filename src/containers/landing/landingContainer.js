import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Landing from '../../components/landingComponent/landingComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  console.log('state---', state)
  return {
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchClientAccessToken: sagaActions.basicActions.fetchClientAccessToken
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
      console.log('component will mount landing', this.props)
      console.log(this.props.fetchClientAccessToken)
      let payload = {
        'client_id': this.props.client_id,
        'client_secret': this.props.client_secret
      }
      this.props.fetchClientAccessToken && this.props.fetchClientAccessToken(payload)
    },
    componentDidMount: function () {
      console.log('component did mount landing', this.props)
    }
  })
)(Landing)
