import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SignUp from '../../components/signUp/signUpComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    clientAccessToken: state.basicReducer.clientAccessToken,
    createUserResponse: state.signUpReducer.createUserResponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  createUser: sagaActions.signUpActions.createUser
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
    componentDidMount: function () {
      console.log('component did mount lifecycle Signup model', this.props)
    },
    componentWillReceiveProps (nextProps) {
      if (nextProps.clientAccessToken) {
        // console.log('@@@@client access token', nextProps.clientAccessToken.resources[0]["access_token"])
        localStorage.setItem('clientAccessToken', nextProps.clientAccessToken.resources[0]['access_token'])
      }
      if (nextProps.isLoggedin) {
        console.log('redirect after successfull login')
        localStorage.setItem('isLoggedin', nextProps.isLoggedin)
        // this.props.history.push('/registering')
      }
      if (nextProps.createUserResponse) {
        console.log('create user response', nextProps)
        if (!nextProps.createUserResponse.error_code) {
          localStorage.setItem('userAccessToken', nextProps.createUserResponse.resources[0]['access_token'])
          this.props.history.push('/registering')
        }
      }
    }
  })
)(SignUp)
