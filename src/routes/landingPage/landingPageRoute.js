import React from 'react'
// import Login from '../../containers/login/loginContainer'
import Landing from '../../containers/landing/landingContainer'
// import UserRegistration from '../../containers/userRegistration/userRegistrationContainer'
// import Header from '../../containers/header/headerContainer'
// import FooterComponent from '../../components/footer/footerComponent'
// import LeftNavigation from '../../components/leftNavigation/leftNavComponent'

class LandingPageRoute extends React.Component {
	render () {
    // localStorage.removeItem('isLoggedin')
		return (
  <div>
    {/* <Header {...this.props} /> */}
    <div className='m-grid m-grid--hor m-grid--root m-page'>
      {/* <LeftNavigation /> */}
      {/* <div className='m-login m-login--signin  m-login--5' id='m_login' style={{'background-image': 'url(./assets/bg-3.jpg)', 'height': '858px'}} >
        <UserRegistration {...this.props} />
        <Login {...this.props} />
      </div> */}
      <Landing {...this.props} />
    </div>
    {/* <FooterComponent /> */}
  </div>
		)
	}
	props: {}
}
export default LandingPageRoute
