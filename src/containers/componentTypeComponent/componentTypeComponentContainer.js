import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import componentTypeComponent from '../../components/componentTypeComponent/componentTypeComponentComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
import { actionCreators as componentTypeComponentActionCreators } from '../../redux/reducers/componentTypeComponentReducer/componentTypeComponentReducerReducer'
console.log('saga', sagaActions)
// Global State
export function mapStateToProps (state, props) {
  console.log('com type com detail state', state)
  return {
    authenticateUser: state.basicReducer.authenticateUser,
    componentTypeComponentData: state.componentTypeComponentReducer.componentTypeComponentData,
    componentTypeComponentProperties: state.componentTypeComponentReducer.componentTypeComponentProperties,
    copiedComponentProperties: state.componentTypeComponentReducer.copiedComponentProperties,
    componentPropertiesPayload: state.componentTypeComponentReducer.componentPropertiesPayload,
    componentDetail: state.applicationDetailReducer.componentDetail,
    componentTypeComponentRelationships: state.componentTypeComponentReducer.componentTypeComponentRelationships,
    componentTypeComponents: state.componentTypeComponentReducer.componentTypeComponents,
    componentTypeComponentConstraints: state.componentTypeComponentReducer.componentTypeComponentConstraints,
    showTabs: state.componentTypeComponentReducer.showTabs,
    isEditComponent: state.componentTypeComponentReducer.isEditComponent,
    addNewConnectionSettings: state.componentTypeComponentReducer.addNewConnectionSettings,
    isDropDownOpen: state.basicReducer.isDropDownOpen,
    modalIsOpen: state.basicReducer.modalIsOpen,
    successmodalIsOpen: state.basicReducer.successmodalIsOpen
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchUserAuthentication: sagaActions.basicActions.fetchUserAuthentication,
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  fetchComponentById: sagaActions.applicationDetailActions.fetchComponentById,
  fetchComponentTypeComponent: sagaActions.componentTypeComponentActions.fetchComponentTypeComponent,
  fetchcomponentTypeComponentProperties: sagaActions.componentTypeComponentActions.fetchcomponentTypeComponentProperties,
  fetchcomponentTypeComponentRelationships: sagaActions.componentTypeComponentActions.fetchcomponentTypeComponentRelationships,
  updateComponentTypeComponentRelationships: sagaActions.componentTypeComponentActions.updateComponentTypeComponentRelationships,
  updateComponentTypeComponentProperties: sagaActions.componentTypeComponentActions.updateComponentTypeComponentProperties,
  updateComponentTypeComponent: sagaActions.componentTypeComponentActions.updateComponentTypeComponent,
  fetchComponentConstraints: sagaActions.componentTypeComponentActions.fetchComponentConstraints,
  fetchComponentTypeComponents: sagaActions.componentTypeComponentActions.fetchComponentTypeComponents,
  setModalOpenStatus: basicActionCreators.setModalOpenStatus,
  setCurrentTab: componentTypeComponentActionCreators.setCurrentTab,
  setEditComponentFlag: componentTypeComponentActionCreators.setEditComponentFlag,
  copyComponentProperties: componentTypeComponentActionCreators.copyComponentProperties,
  restoreComponentProperties: componentTypeComponentActionCreators.restoreComponentProperties,
  editComponentProperties: componentTypeComponentActionCreators.editComponentProperties,
  pushComponentPropertyPayload: componentTypeComponentActionCreators.pushComponentPropertyPayload,
  setRelationshipsValue: componentTypeComponentActionCreators.setRelationshipsValue,
  setAddConnectionSettings: componentTypeComponentActionCreators.setAddConnectionSettings,
  setDropdownFlag: basicActionCreators.setDropdownFlag,
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
      console.log('com typecom cont', this.props)
      this.props.fetchUserAuthentication && this.props.fetchUserAuthentication()
      const componentTypeComponentId = this.props.match.params.componentId
      const componentTypeId = this.props.match.params.componentTypeId
      let payload = {
        'componentTypeId': componentTypeId,
        'componentTypeComponentId': componentTypeComponentId,
        'id': componentTypeComponentId
      }
      this.props.fetchComponentById && this.props.fetchComponentById({id: componentTypeId})
      this.props.fetchComponentTypeComponent && this.props.fetchComponentTypeComponent(payload)
      this.props.fetchcomponentTypeComponentProperties && this.props.fetchcomponentTypeComponentProperties(payload)
      this.props.fetchcomponentTypeComponentRelationships && this.props.fetchcomponentTypeComponentRelationships(payload)
      this.props.fetchComponentConstraints && this.props.fetchComponentConstraints(payload)
      this.props.fetchComponentTypeComponents && this.props.fetchComponentTypeComponents(payload)
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('will receive props mmmmmmmmmmmmm', nextProps)
      if (nextProps.authenticateUser && nextProps.authenticateUser.resources) {
        if (!nextProps.authenticateUser.resources[0].result) {
          this.props.history.push('/')
        }
      }
      if (nextProps.componentDetail && nextProps.componentTypeComponentData && (nextProps.componentTypeComponentData !== '') && nextProps.componentTypeComponentData.resources) {
        console.log('inside com Xxxxxxxxxxxxxxxxxxxxx', this.props, nextProps)
        let breadcrumb = {
          title: nextProps.componentTypeComponentData.resources[0].name,
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
              name: nextProps.componentDetail.resources[0].name ? nextProps.componentDetail.resources[0].name : '',
              href: '/components/' + nextProps.componentDetail.resources[0].id,
              separator: false
            },
            {
              separator: true
            },
            {
              name: nextProps.componentTypeComponentData.resources[0].name,
              href: '/components/' + nextProps.componentDetail.resources[0].id + '/' + nextProps.componentTypeComponentData.resources[0].id,
              separator: false
            }
          ]
        }
        this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
      }
    }
  })
)(componentTypeComponent)
