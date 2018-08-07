import React from 'react'
import Login from '../../containers/login/loginContainer'
import SignUp from '../../containers/signUp/signUpContainer'
// import styles from './landingComponent.scss'

class Landing extends React.Component {
    render (props) {
        console.log('landing props', props)
        localStorage.removeItem('isLoggedin')
            return (
              <div>
                {/* <Header {...this.props} /> */}
                <div className='m-grid m-grid--hor m-grid--root m-page'>
                  {/* <LeftNavigation /> */}
                  <div className='m-login m-login--signin  m-login--5' id='m_login' style={{'background-image': 'url(./assets/bg-3.jpg)', 'height': '858px'}} >
                    <SignUp {...this.props} />
                    <Login {...this.props} />
                  </div>
                </div>
                {/* <FooterComponent /> */}
              </div>
            )
        }
        props: {}
}
export default Landing
