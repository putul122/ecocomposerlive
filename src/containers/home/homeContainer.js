import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import Home from '../../components/home/homeComponent'
import { actionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {}
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setBreadcrumb: actionCreators.setBreadcrumb
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
    }
  })
)(Home)
