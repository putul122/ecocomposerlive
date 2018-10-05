import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import HeaderComponent from '../../components/header/headerComponent'
// import * as signalR from '@aspnet/signalr'
// import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    modalIsOpen: state.basicReducer.modalIsOpen,
    isQuickSlideOpen: state.basicReducer.isQuickSlideOpen,
    isLoginSlideOpen: state.basicReducer.isLoginSlideOpen,
    notificationFlag: state.basicReducer.notificationFlag
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    setModalOpenStatus: actionCreators.setModalOpenStatus,
    setQuickslideFlag: actionCreators.setQuickslideFlag,
    setLoginslideFlag: actionCreators.setLoginslideFlag,
    setNotificationFlag: actionCreators.setNotificationFlag
}

// If you want to use the function mapping
// export const propsMapping = (dispatch, ownProps) => {
//   return {
//     onClick: () => dispatch(actions.starsActions.FETCH_STARS)
//   }
// }
// let hubConnection = new HubConnection('http://ecoconductor-push-notification-test.azurewebsites.net/api/message')
// console.log('--', signalR)
export default compose(
  connect(mapStateToProps, propsMapping),
  lifecycle({
    componentDidMount: function () {
      console.log('component did mount lifecycle header model', this.props)
      // const connection = new signalR.HubConnectionBuilder()
      //     .withUrl(' http://ecoconductor-push-notification-test.azurewebsites.net/notify')
      //     .configureLogging(signalR.LogLevel.Information)
      //     .build()
      // connection.start().then(() => console.log('---------------------------------------------Connection started!')).catch(err => console.error('connection error --------------', err))
      // // hubConnection.start().then(() => console.log('Connection started!')).catch(err => console.log('Error while establishing connection :', err))
      // connection.on('BroadcastMessage', (type: string, payload: string) => {
      //   console.log('BroadcastMessage')
      //   console.log('ttt', type)
      //   console.log('ttt payload', payload)
      // })
    }
  })
)(HeaderComponent)
