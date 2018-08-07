import React from 'react'
// import styles from './appWrapperComponent.scss'
// import HeaderComponent from '../header/headerComponent'
// import FooterComponent from '../footer/footerComponent'

class AppWrapper extends React.Component {
  render () {
    return (
      <div>
        {/* <HeaderComponent />
        <FooterComponent /> */}
        {this.props.children}
      </div>
    )
  }

  props: {
    children: any
  }
}

export default AppWrapper
