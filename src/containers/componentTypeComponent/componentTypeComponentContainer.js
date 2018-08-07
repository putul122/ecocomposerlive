import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import componentTypeComponent from '../../components/componentTypeComponent/componentTypeComponentComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
console.log('saga', sagaActions)
// Global State
export function mapStateToProps (state, props) {
  console.log('com type com detail state', state)
  return {
    componentTypeComponentData: state.componentTypeComponentReducer.componentTypeComponentData,
    componentTypeComponentProperties: state.componentTypeComponentReducer.componentTypeComponentProperties,
    componentDetail: state.applicationDetailReducer.componentDetail,
    componentTypeComponentRelationships: state.componentTypeComponentReducer.componentTypeComponentRelationships
  }
}
// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  setBreadcrumb: basicActionCreators.setBreadcrumb,
  fetchComponentById: sagaActions.applicationDetailActions.fetchComponentById,
  fetchComponentTypeComponent: sagaActions.componentTypeComponentActions.fetchComponentTypeComponent,
  fetchcomponentTypeComponentProperties: sagaActions.componentTypeComponentActions.fetchcomponentTypeComponentProperties,
  fetchcomponentTypeComponentRelationships: sagaActions.componentTypeComponentActions.fetchcomponentTypeComponentRelationships
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
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('will receive props mmmmmmmmmmmmm', nextProps)
      if (nextProps.componentTypeComponentData && nextProps.componentDetail && (nextProps.componentTypeComponentData !== this.props.componentTypeComponentData)) {
        console.log('inside com Xxxxxxxxxxxxxxxxxxxxx', this.props, nextProps)
        let breadcrumb = {
          title: nextProps.componentTypeComponentData.data.resource.name,
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
              name: nextProps.componentDetail.resource.name ? this.props.componentDetail.resource.name : '',
              href: '/components/' + nextProps.componentDetail.resource.id,
              separator: false
            },
            {
              separator: true
            },
            {
              name: nextProps.componentTypeComponentData.data.resource.name,
              href: '/components/' + nextProps.componentDetail.resource.id + '/' + nextProps.componentTypeComponentData.data.resource.id,
              separator: false
            }
          ]
        }
        this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
      }
    }
  })
)(componentTypeComponent)
