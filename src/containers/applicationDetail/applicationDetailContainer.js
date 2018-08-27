import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ApplicationDetail from '../../components/applicationDetail/applicationDetailComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as applicationDetailActionCreators } from '../../redux/reducers/applicationDetailReducer/applicationDetailReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'

// Global State
export function mapStateToProps (state, props) {
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentDetail: state.applicationDetailReducer.componentDetail,
    componentConstraints: state.applicationDetailReducer.componentConstraints,
    componentComponents: state.applicationDetailReducer.componentComponents,
    currentPage: state.applicationDetailReducer.currentPage,
    addComponent: state.applicationDetailReducer.addComponent,
    modalIsOpen: state.basicReducer.modalIsOpen,
    successmodalIsOpen: state.basicReducer.successmodalIsOpen
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
  addComponentComponent: sagaActions.applicationDetailActions.addComponentComponent,
  setAddRedirectFlag: basicActionCreators.setAddRedirectFlag,
  setRedirectFlag: basicActionCreators.setRedirectFlag,
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setConfirmationModalOpenStatus: basicActionCreators.setConfirmationModalOpenStatus
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
      console.log('comp will mountct', this.props)
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
      // eslint-disable-next-line
      // mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      this.props.fetchComponentById && this.props.fetchComponentById(payload)
      this.props.fetchComponentById && this.props.fetchComponentConstraint(payload)
      this.props.fetchComponentComponent && this.props.fetchComponentComponent(payload)
    },
    componentDidMount: function () {},
    componentWillReceiveProps: function (nextProps) {
      console.log('comp will receive props mountct', this.props)
      console.log('comp will receive props mountct', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.addComponent && nextProps.componentDetail) {
        console.log('deleting deleteComponent component', nextProps.addComponent)
    //         setTimeout(() => {
    //   let componentId = props.addComponent.resources[0].id
    //   props.history.push('/components/' + ComponentTypeId + '/' + componentId)
    // }, 1000)
        let deletecomponentid = nextProps.componentDetail.resources[0].id
        let componentId = nextProps.addComponent.resources[0].id
        let ComponentTypeId = nextProps.componentDetail.resources[0].id
        nextProps.history.push('/components/' + ComponentTypeId + '/' + componentId)
        console.log('id', deletecomponentid)
        nextProps.setAddRedirectFlag(true)
        console.log('After redirection of deleting the state', nextProps.deleteComponent)
      }
      if (nextProps.componentDetail && (nextProps.componentDetail !== this.props.componentDetail)) {
        console.log('inside receive props detail props', nextProps)
        // eslint-disable-next-line
        // mApp.unblockPage()
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
