import React from 'react'
import styles from './recentPlacesComponent.scss'

class RecentPlaces extends React.Component {
  render () {
    return (
      <div className={styles.borderline}>
        <h2 className='m-section__heading'>Recent Places</h2><br />
        <ul>
          <li>
            <img src='assets/application.png' width='40px' alt='pic' /><br />
            <a >Applications</a>
          </li>
          <li>
            <img src='assets/wheel.png' width='40px' alt='pic' /><br />
            <a >IVR </a>
          </li>
          <li>
            <img src='assets/images.png' width='40px' alt='pic' /><br />
            <a >Platform Services</a>
          </li>
          <li>
            <img src='assets/application.png' width='40px' alt='pic' /><br />
            <a >Platform Services</a>
          </li>
          <li>
            <img src='assets/ivr.png' width='40px' alt='pic' /><br />
            <a >Work Spaces</a>
          </li>
        </ul>
      </div>
    )
  }

  props: {
    children: any
  }
}

export default RecentPlaces
