import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Login from '../../components/login/loginComponent'
import { actions as sagaActions } from '../../redux/sagas/'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    client_id: state.basicReducer.client_id,
    client_secret: state.basicReducer.client_secret,
    loggedInresponse: state.loginReducer.loggedInresponse
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  loginUser: sagaActions.loginActions.loginUser
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
      console.log('component did mount lifecycle register model', this.props)
    },
    componentWillReceiveProps (nextProps) {
      console.log('login response', nextProps)
      // if (nextProps.isLoggedin) {
      //   localStorage.setItem('isLoggedin', nextProps.isLoggedin)
      //   this.props.history.push('/registering')
      // }
      if (nextProps.loggedInresponse) {
        console.log('login response', nextProps.loggedInresponse.error_code)
        if (!nextProps.loggedInresponse.error_code) {
          localStorage.setItem('userAccessToken', nextProps.loggedInresponse.resources[0]['access_token'])
          localStorage.setItem('isLoggedin', true)
          this.props.history.push('/home')
        } else {
          // error in login
        }
        // if(nextProps.loggedInresponse)
        // console.log('redirect after successfull login')
        // localStorage.setItem('isLoggedin', nextProps.isLoggedin)
        // this.props.history.push('/registering')
      }
    }
  })
)(Login)
