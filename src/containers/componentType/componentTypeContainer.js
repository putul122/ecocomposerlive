import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ComponentType from '../../components/componentType/componentTypeComponent'
import { actions as sagaActions } from '../../redux/sagas/'
import { actionCreators as componentTypeActioncreators } from '../../redux/reducers/componentTypeReducer/componentTypeReducerReducer'
import { actionCreators as basicActionCreators } from '../../redux/reducers/basicReducer/basicReducerReducer'
// Global State
export function mapStateToProps (state, props) {
  return {
    componentTypes: state.componentTypeReducer.componentTypes,
    // searchComponentType: state.componentTypeReducer.searchComponentType,
    isComponentTypeLoading: state.componentTypeReducer.isComponentTypeLoading,
    currentPage: state.componentTypeReducer.currentPage
  }
}

// In Object form, each funciton is automatically wrapped in a dispatch
export const propsMapping: Callbacks = {
  fetchComponent: sagaActions.componentTypeActions.fetchComponent,
  searchComponent: sagaActions.componentTypeActions.searchComponent,
  // setSearchComponentType: actionCreators.setSearchComponentType,
  setComponentTypeLoading: componentTypeActioncreators.setComponentTypeLoading,
  setCurrentPage: componentTypeActioncreators.setCurrentPage,
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
    this.props.setComponentTypeLoading && this.props.setComponentTypeLoading(true)
    let payload = {
      'search': '',
      'page_size': 10,
      'page': 1,
      'recommended': true
    }
    this.props.fetchComponent && this.props.fetchComponent(payload)
    let breadcrumb = {
      title: 'Components',
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
        }
      ]
    }
    this.props.setBreadcrumb && this.props.setBreadcrumb(breadcrumb)
    },
    componentDidMount: function () {
    // Block
      this.props.setComponentTypeLoading && this.props.setComponentTypeLoading(false)
    },
    componentDidUpdate: function () {
    // Block
    this.props.setComponentTypeLoading && this.props.setComponentTypeLoading(false)
    },
    componentWillReceiveProps: function (nextProps) {
      console.log('component types next props response', nextProps)
    }
  })
)(ComponentType)
