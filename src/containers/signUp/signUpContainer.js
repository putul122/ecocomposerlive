import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import SignUp from '../../components/signUp/signUpComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as signUpActionCreators } from '../../redux/reducers/signUpReducer/signUpReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    clientAccessToken: state.basicReducer.clientAccessToken,
    createUserResponse: state.signUpReducer.createUserResponse,
    createUserProcess: state.signUpReducer.createUserProcess
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  createUser: sagaActions.signUpActions.createUser,
  setCreateUserProcessStatus: signUpActionCreators.setCreateUserProcessStatus
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
    componentDidMount: function () {},
    componentWillReceiveProps (nextProps) {
      if (nextProps.clientAccessToken) {
        // console.log('@@@@client access token', nextProps.clientAccessToken.resources[0]["access_token"])
        localStorage.setItem('clientAccessToken', nextProps.clientAccessToken.resources[0]['access_token'])
      }
      if (nextProps.isLoggedin) {
        localStorage.setItem('isLoggedin', nextProps.isLoggedin)
        // this.props.history.push('/registering')
      }
      if (nextProps.createUserResponse) {
        if (!nextProps.createUserResponse.error_code) {
          localStorage.setItem('userAccessToken', nextProps.createUserResponse.resources[0]['access_token'])
          console.log('create user response', nextProps)
          this.props.history.push('/registering')
        }
        if (nextProps.createUserResponse !== this.props.createUserResponse) {
          this.props.setCreateUserProcessStatus(false)
        }
      }
    }
  })
)(SignUp)
