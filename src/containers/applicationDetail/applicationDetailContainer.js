import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationDetail from '../../components/applicationDetail/applicationDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as applicationDetailActionCreators } from '../../redux/reducers/applicationDetailReducer/applicationDetailReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  console.log('app detail state', state)
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentDetail: state.applicationDetailReducer.componentDetail,
    componentConstraints: state.applicationDetailReducer.componentConstraints,
    componentComponents: state.applicationDetailReducer.componentComponents,
    currentPage: state.applicationDetailReducer.currentPage
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  fetchComponentById: sagaActions.applicationDetailActions.fetchComponentById,
  fetchComponentConstraint: sagaActions.applicationDetailActions.fetchComponentConstraint,
  fetchComponentComponent: sagaActions.applicationDetailActions.fetchComponentComponent,
  searchComponentComponent: sagaActions.applicationDetailActions.searchComponentComponent,
  selectedComponentType: applicationDetailActionCreators.selectedComponentType,
  setCurrentPage: applicationDetailActionCreators.setCurrentPage,
  setBreadcrumb: basicActionCreators.setBreadcrumb
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
      const componentTypeId = this.props.match.params.id
      this.props.selectedComponentType(componentTypeId)
      let payload = {
        'id': componentTypeId,
        'ComponentTypeComponent': {
          'search': '',
          'page_size': 10,
          'page': 1,
          'recommended': true
        }
      }
      this.props.fetchComponentById && this.props.fetchComponentById(payload)
      this.props.fetchComponentById && this.props.fetchComponentConstraint(payload)
      this.props.fetchComponentComponent && this.props.fetchComponentComponent(payload)
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.componentDetail && (nextProps.componentDetail !== this.props.componentDetail)) {
        console.log('inside receive props detail props', nextProps)
        let breadcrumb = {
          title: nextProps.componentDetail.resources[0].name,
          items: [
            {
              name: 'Home',
              href: '/home',
              separator: false
            },
            {
              separator: true
            },
            {
              name: 'Components',
              href: '/components',
              separator: false
            },
            {
              separator: true
            },
            {
              name: nextProps.componentDetail.resources[0].name,
              href: '/components/' + nextProps.componentDetail.resources[0].id,
              separator: false
            }
          ]
        }
        this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
      }
    }
  })
)(ApplicationDetail)
