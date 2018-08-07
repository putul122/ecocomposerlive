import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import HeaderComponent from '../../components/header/headerComponent'
// import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    isLoggedin: state.loginReducer.isLoggedin,
    modalIsOpen: state.basicReducer.modalIsOpen,
    isQuickSlideOpen: state.basicReducer.isQuickSlideOpen,
    isLoginSlideOpen: state.basicReducer.isLoginSlideOpen
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
    setModalOpenStatus: actionCreators.setModalOpenStatus,
    setQuickslideFlag: actionCreators.setQuickslideFlag,
    setLoginslideFlag: actionCreators.setLoginslideFlag
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
      console.log('component did mount lifecycle header model', this.props)
    }
  })
)(HeaderComponent)
