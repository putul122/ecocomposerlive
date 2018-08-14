import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Home from '../../components/home/homeComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    showToasterSuccess: state.basicReducer.showToasterSuccess
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  setToasterSuccessStatus: basicActionCreators.setToasterSuccessStatus
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
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      let breadcrumb = {
        title: 'Home',
        items: [
          {
            name: 'Home',
            href: '/home',
            separator: false
          }
        ]
      }
      this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
    },
    componentDidMount: function () {
      // if (!this.props.showToasterSuccess) {
        if (!localStorage.getItem('showToasterSuccess') && localStorage.getItem('isLoggedin') && localStorage.getItem('userAccessToken')) {
          // eslint-disable-next-line
          toastr.options = {
            'closeButton': false,
            'debug': false,
            'newestOnTop': false,
            'progressBar': false,
            'positionClass': 'toast-top-right',
            'preventDuplicates': false,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '100',
            'timeOut': '2000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
          }
          // eslint-disable-next-line
          toastr.success('you logged in successfully.')
          localStorage.setItem('showToasterSuccess', true)
          this.props.setToasterSuccessStatus(true)
        }
      // }
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('component will receive props', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
    }
  })
)(Home)
