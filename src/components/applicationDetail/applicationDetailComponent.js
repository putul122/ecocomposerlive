import React from 'react'
import styles from './applicationDetailComponent.scss'
import PropTypes from 'prop-types'
import _ from 'lodash'
// import ApplicationModelComponent for graph Model Visualization
import ApplicationModelComponent from '../applicationModel/applicationModelComponent'
import { Link, Route } from 'react-router-dom'
import componentTypeComponentPageRoute from '../../routes/componentTypeComponentPage/componentTypeComponentPageRoute'
var divStyle = {
  width: '95%',
  height: '30%',
  'overflow-y': 'scroll',
  'overflow-x': 'scroll',
  'border': '1px solid #000000'
}

export default function ApplicationDetail (props) {
  let ComponentName = ''
  let ComponentDescription = ''
  let ComponentTypeIcon = ''
  let searchTextBox
  let componentComponents = props.componentComponents.resources
  let componentComponentsList
  let totalNoPages
  let perPage = 10
  let currentPage = props.currentPage
  let nextClass = ''
  let previousClass = ''
  let totalComponentTypeComponent
  let pageArray = []
  let ComponentTypeId
  let listPage = []
  let paginationLimit = 4
  // let paginationList
  if (props.componentDetail !== '') {
    ComponentName = props.componentDetail.resources[0].name
    ComponentDescription = props.componentDetail.resources[0].description
    ComponentTypeId = props.componentDetail.resources[0].id
    ComponentTypeIcon = props.componentDetail.resources[0].links.find(function (link) { return link.rel === 'icon' })
  }
  if (typeof componentComponents !== 'undefined') {
    componentComponentsList = componentComponents.map(function (componentComponent, index) {
      return (
        <tr className='m-datatable__row m-datatable__row--even' key={index} style={{ 'left': '0px' }} >
          <td className='m-datatable__cell--sorted m-datatable__cell' >
            <span style={{ 'width': '150px', 'text-align': 'center' }}><Link to={'/components/' + ComponentTypeId + '/' + componentComponent.id}>{ componentComponent.name }</Link></span>
          </td>
          <td className='m-datatable__cell--sorted m-datatable__cell'><p>{ componentComponent.description }</p></td>
        </tr>
      )
    })

    totalComponentTypeComponent = props.componentComponents.count
    totalNoPages = Math.ceil(totalComponentTypeComponent / perPage)

    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    }

    if (currentPage === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }

    let i = 1
    while (i <= totalNoPages) {
      let pageParameter = {}
      pageParameter.number = i
      pageParameter.class = ''
      pageArray.push(pageParameter)
      i++
    }
    pageArray = _.chunk(pageArray, paginationLimit)
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }

  let handlePrevious = function (event) {
    event.preventDefault()
    if (currentPage === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else {
      let payload = {
        'id': props.componentDetail.resource.id,
        'ComponentTypeComponent': {
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': 10,
          'page': currentPage - 1,
          'recommended': searchTextBox.value === ''
        }
      }
      props.fetchComponentComponent(payload)
      props.setCurrentPage(currentPage - 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage - 1})
      if (found.length > 0) { return group }
    })
  }

  let handleNext = function (event) {
    event.preventDefault()
    if (currentPage === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    } else {
      let payload = {
      'id': props.componentDetail.resource.id,
      'ComponentTypeComponent': {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': currentPage + 1,
        'recommended': searchTextBox.value === ''
      }
    }
    props.fetchComponentComponent(payload)
      props.setCurrentPage(currentPage + 1)
    }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage + 1})
      if (found.length > 0) { return group }
    })
  }

  let handlePage = function (page) {
    if (page === 1) {
      previousClass = 'm-datatable__pager-link--disabled'
    } else if (page === totalNoPages) {
      nextClass = 'm-datatable__pager-link--disabled'
    }
    let payload = {
      'id': props.componentDetail.resource.id,
      'ComponentTypeComponent': {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': page,
        'recommended': searchTextBox.value === ''
      }
    }
    props.fetchComponentComponent(payload)
    props.setCurrentPage(page)

    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': page})
      if (found.length > 0) { return group }
    })
  }

  let handleInputChange = function (event) {
    let payload = {
      'id': props.componentDetail.resource.id,
      'ComponentTypeComponent': {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': currentPage,
        'recommended': searchTextBox.value === ''
      }
    }
    // if (searchTextBox.value.length > 0) {
      // if (searchTextBox.value.length % 2 === 0) {
        // props.fetchComponentComponent(payload)
        props.searchComponentComponent(payload)
        // props.setComponentTypeLoading(true)
      // }
    // }
    listPage = _.filter(pageArray, function (group) {
      let found = _.filter(group, {'number': currentPage})
      if (found.length > 0) { return group }
    })
  }
  return (
    <div>
      <div className={styles.borderline}>
        <div className={'row' + styles.description}>
          <div>
            <img className={styles.iconcenter} src={ComponentTypeIcon.href} alt={ComponentName} />
            <span className='row col-sm-12 col-md-6'>
              <h2>{ ComponentName }</h2>
            </span>
            <span className='row col-sm-12 col-md-6'><p>{ ComponentDescription }</p></span>
          </div>
        </div>
        <div className='row clearfix'>
          <div className='col-sm-12 col-md-4'>
            <div className='row'>
              <div className='col-sm-6 col-md-4'>
                <h4>{ ComponentName }</h4>
              </div>
              <div className='col-sm-6 col-md-7 m--align-right'>
                <div className='m-input-icon m-input-icon--left'>
                  <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onChange={handleInputChange} />
                  <span className='m-input-icon__icon m-input-icon__icon--left'>
                    <span>
                      <i className='la la-search' />
                    </span>
                  </span>
                </div>
              </div>
            </div><br />
            {/* <div className={styles.containersearch}>
              <span className={styles.icon}><i className='fa fa-search' /></span>
              <input type='search' id='search' placeholder='Search...' className={styles.round} ref={input => (searchTextBox = input)} onChange={handleInputChange} />
            </div> */}
            <div className='col-sm-12 col-md-12'>
              <div className='m_datatable' id='scrolling_vertical'>
                <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
                  <table className='m-datatable__table' style={{ 'display': 'block', 'min-height': '300px', 'max-height': '550px' }} >
                    <thead className='m-datatable__head'>
                      <tr className='m-datatable__row' style={{ 'left': '0px;' }}>
                        {/* <th data-field='RecordID' className='m-datatable__cell m-datatable__cell--check'>
                          <span style={{width: 40}}><label htmlFor='m-checkbox m-checkbox--single m-checkbox--all m-checkbox--solid m-checkbox--brand'>
                            <input type='checkbox' /><span /></label></span></th> */}
                        <th className='m-datatable__cell m-datatable__cell--sort' style={{ 'text-align': 'center' }}>Name</th>
                        <th className='m-datatable__cell m-datatable__cell--sort' style={{ 'text-align': 'center' }}>Description</th>
                      </tr>
                    </thead>
                    <tbody style={{ 'max-height': '495px' }} className='m-datatable__body ps ps--active-y ps--scrolling-y'>
                      <div className={styles.scrollbar} id='style-1'>
                        { componentComponentsList }
                      </div>
                      {/* <div className='ps__rail-x' >
                        <div className='ps__thumb-x' style={{ 'left': '0px', 'width': '0px' }} />
                      </div>
                      <div className='ps__rail-y' style={{'top': '0px', 'height': '495px', 'right': '0'}}><div className='ps__thumb-y' style={{ 'top': '0px', 'height': '216px' }} /></div> */}
                    </tbody>
                  </table>
                  <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
                    <ul className='m-datatable__pager-nav'>
                      {/* <li><a href='' title='First' className='m-datatable__pager-link m-datatable__pager-link--first' data-page={1}><i className='la la-angle-double-left' /></a></li> */}
                      <li><a href='' title='Previous' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
                      {listPage[0] && listPage[0].map(function (page, index) {
                          if (page.number === currentPage) {
                            page.class = 'm-datatable__pager-link--active'
                          } else {
                            page.class = ''
                          }
                          return (<li key={index} >
                            <a href='' className={'m-datatable__pager-link m-datatable__pager-link-number ' + page.class} data-page={page.number} title={page.number} onClick={(event) => { event.preventDefault(); handlePage(page.number) }} >{page.number}</a>
                          </li>)
                        })}
                      <li><a href='' title='Next' className={'m-datatable__pager-link m-datatable__pager-link--next ' + nextClass} onClick={handleNext} data-page='4'><i className='la la-angle-right' /></a></li>
                      {/* <li><a href='' title='Last' className='m-datatable__pager-link m-datatable__pager-link--last' data-page={18}><i className='la la-angle-double-right' /></a></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='row col-sm-12 col-md-12 m--align-center'>
              <div className=''>
                <div className={styles.pagination}>
                  <a href='' className={previousClass} onClick={handlePrevious}>Previous</a> Page {currentPage} of {totalNoPages} <a href='' className={nextClass} onClick={handleNext}>Next</a>
                </div>
              </div>
            </div> */}
          </div>
          <div className='col-sm-8 col-md-8'>
            <h4>{ ComponentName } Model Usage Summary</h4>
            {/* <div id='m_table_1_filter' className='dataTables_filter'><label>Search:<input type='search' className='form-control form-control-sm' placeholder='' aria-controls='m_table_1'></label></div> */}
            <div className='row'>
              <div id='divPaperWrapper' style={divStyle}>
                <ApplicationModelComponent {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Route exact path={`/components/:componentTypeId/:componentTypeComponentId`} component={componentTypeComponentPageRoute} />
    </div>
  )
}

ApplicationDetail.propTypes = {
  componentDetail: PropTypes.any,
  componentComponents: PropTypes.any,
  // searchComponentComponent: PropTypes.func,
  currentPage: PropTypes.any
  // setCurrentPage: PropTypes.func,
  // fetchComponentComponent: PropTypes.func
}
