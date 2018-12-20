import React from 'react'
// import Components from '../../components/components/componentsComponent'
import Header from '../../containers/header/headerContainer'
import Tesks from '../../containers/tasks/tasksContainer'
import LeftNavigation from '../../components/leftNavigation/leftNavComponent'
import FooterComponent from '../../components/footer/footerComponent'
import Breadcrumb from '../../containers/breadcrumb/breadcrumbContainer'
// import applicationDetailPageRoute from '../applicationDetailPage/applicationDetailPageRoute'
// import {Route} from 'react-router-dom'

class TasksPageRoute extends React.Component {
  render () {
		return (
  <div>
    <Header {...this.props} />
    <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
      <LeftNavigation />
      <div className='m-grid__item m-grid__item--fluid m-wrapper'>
        {/* <!-- BEGIN: Subheader --> */}
        <Breadcrumb />
        {/* <!-- END: Subheader --> */}
        <div className='m-content'>
          <div className='row'>
            <div className='col-xl-12'>
              <Tesks {...this.props} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
    {/* <Route path={`${this.props.match.path}/:componentTypeId`} component={applicationDetailPageRoute} /> */}
  </div>
		)
	}
	props: {
    // match: {
    //   path: '',
    // }
  }
}
export default TasksPageRoute
