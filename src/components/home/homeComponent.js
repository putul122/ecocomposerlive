import React from 'react'
// import PropTypes from 'prop-types'
import ActivityFeed from '../activityFeed/activityfeedComponent'
import RecentPlaces from '../recentPlaces/recentPlacesComponent'

export default function Home (props) {
  return (
    <div className='row'>
      <div className='col-md-8'>
        <RecentPlaces />
      </div>
      <div className='col-md-4'>
        <ActivityFeed />
      </div>
    </div>
  )
}
