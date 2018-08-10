import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import RegisterProcess from '../../components/registerProcess/registerProcessComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as registerProcessActionCreators } from '../../redux/reducers/registerProcessReducer/registerProcessReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    isAccountCreated: state.registerProcessReducer.isAccountCreated,
    isAbacusFileProvisioned: state.registerProcessReducer.isAbacusFileProvisioned,
    isComposerModelConnected: state.registerProcessReducer.isComposerModelConnected,
    registerProcessResponse: state.registerProcessReducer.registerProcessResponse
  }
}

// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchRegisterProcess: sagaActions.registerProcessActions.fetchRegisterProcess,
  accountCreation: registerProcessActionCreators.accountCreation,
  abacusFileProvisioned: registerProcessActionCreators.abacusFileProvisioned,
  composerModelConnected: registerProcessActionCreators.composerModelConnected
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
      this.props.fetchRegisterProcess && this.props.fetchRegisterProcess()
    },
    componentDidMount: function () {
      window.setTimeout(() => {
        this.props.accountCreation && this.props.accountCreation(true)
        if (this.props.registerProcessResponse && this.props.registerProcessResponse.resources.length > 0) {
          if (this.props.registerProcessResponse.resources[0]['status'] !== 'Completed') {
            this.props.fetchRegisterProcess && this.props.fetchRegisterProcess()
          }
        }
      }, 2000)
      // window.setTimeout(() => {
      //   this.props.abacusFileProvisioned && this.props.abacusFileProvisioned(true)
      //   if (this.props.registerProcessStatus !== 'Completed') {
      //     this.props.fetchRegisterProcess && this.props.fetchRegisterProcess()
      //   }
      // }, 4000)
    },
    componentDidUpdate: function () {
      if (this.props.registerProcessResponse && this.props.registerProcessResponse.resources.length > 0) {
        if (this.props.isAccountCreated && this.props.isComposerModelConnected && this.props.registerProcessResponse.resources[0]['status'] === 'Completed') {
          console.log('final process in redirect to home', this.props)
          window.setTimeout(() => {
            this.props.history.push('/home')
          }, 100)
        }
      }
    },
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources && nextProps.authenticateUser.resources !== this.props.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }

      if (nextProps.registerProcessResponse && (nextProps.registerProcessResponse.resources.length > 0) && nextProps.registerProcessResponse !== this.props.registerProcessResponse) {
        if (nextProps.registerProcessResponse.resources[0]['status'] !== 'Completed') {
          this.props.fetchRegisterProcess && this.props.fetchRegisterProcess()
        } else {
          this.props.composerModelConnected && this.props.composerModelConnected(true)
        }
      } else {
        this.props.fetchRegisterProcess && this.props.fetchRegisterProcess()
      }
    }
  })
)(RegisterProcess)
