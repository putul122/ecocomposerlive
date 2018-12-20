import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Roles from '../../components/roles/rolesComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as rolesActionCreators } from '../../redux/reducers/rolesReducer/rolesReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
     rolesActionSettings: state.rolesReducer.rolesActionSettings
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
     setRolesActionSettings: rolesActionCreators.setRolesActionSettings
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
    componentDidMount: function () {}
    // componentWillReceiveProps (nextProps) {
    //   console.log('next props', nextProps)
    //   if (nextProps.isLoggedin) {
    //     localStorage.setItem('isLoggedin', nextProps.isLoggedin)
    //   }
    //   if (nextProps.createUserResponse) {
    //     if (!nextProps.createUserResponse.error_code) {
    //       localStorage.setItem('userAccessToken', nextProps.createUserResponse.resources[0]['access_token'])
    //       localStorage.setItem('isLoggedin', true)
    //       this.props.history.push('/registering')
    //     }
    //     if (nextProps.createUserResponse !== this.props.createUserResponse) {
    //       this.props.setCreateUserProcessStatus(false)
    //     }
    //   }
    // }
  })
)(Roles)
