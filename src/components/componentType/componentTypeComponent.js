import React from 'react'
import styles from './componentTypeComponent.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'
// import applicationDetailPageRoute from '../../routes/applicationDetailPage/applicationDetailPageRoute'

export default function ComponentType (props) {
  console.log('-com-', props)
    const { match } = props
    console.log('match', match)
    let searchTextBox
    let componentTypes = props.componentTypes.resources
    let componentTypesList
    let totalNoPages
    let perPage = 10
    let currentPage = props.currentPage
    let nextClass = ''
    let previousClass = ''
    let pageArray = []
    // let ComponentTypeId
    let totalComponentType
    let listPage = []
    let paginationLimit = 6
    let componentLoading = props.isComponentTypeLoading

    console.log('Appppppppppppppppppppppppppppp details props', props)
    console.log('Id Type', props.componentTypes)
    console.log('IdResourse Type', props.componentTypes.resource)
    // if (props.componentTypes !== '') {
    //   ComponentName = props.componentDetail.resource.name
    //   ComponentDescription = props.componentDetail.resource.description
    //   ComponentTypeId = props.componentTypes.resource.id
    //  console.log('ComponentTypeId', ComponentTypeId)
    // }

    if (typeof componentTypes !== 'undefined') {
      componentTypesList = componentTypes.map(function (componentType, index) {
        let iconlink = componentType.links.find(function (link) { return link.rel === 'icon' })
        return (
          <li key={index} ><img src={iconlink.href} alt={componentType.name} /><br />
            <Link to={'/components/' + componentType.id}>{componentType.name}</Link>
          </li>
        )
      })

      totalComponentType = props.componentTypes.total_count
      totalNoPages = Math.ceil(totalComponentType / perPage)

    //   if (currentPage === 1) {
    //     previousClass = styles.disabled
    //   }

    //   if (currentPage === totalNoPages) {
    //     nextClass = styles.disabled
    //   }
    }
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

    let handleInputChange = function (event) {
      // props.setSearchComponentType(searchTextBox.value)
      props.setComponentTypeLoading(true)
      componentLoading = true
      componentTypesList = ''
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': currentPage,
        'recommended': searchTextBox.value === ''
      }
      // if (searchTextBox.value.length >= 0) {
        props.searchComponent(payload)
        // props.setComponentTypeLoading(true)
      // }
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage})
        if (found.length > 0) { return group }
      })
    }
    let handlePage = function (page) {
      console.log('cur page', page)
      if (page === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
      } else if (page === totalNoPages) {
        nextClass = 'm-datatable__pager-link--disabled'
      }
      props.setComponentTypeLoading(true)
      componentLoading = true
      componentTypesList = ''
      let payload = {
        'search': searchTextBox.value ? searchTextBox.value : '',
        'page_size': 10,
        'page': page,
        'recommended': searchTextBox.value === ''
      }
      props.fetchComponent(payload)
      props.setCurrentPage(page)

      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    }

    let handlePrevious = function (event) {
      event.preventDefault()
      if (currentPage === 1) {
        previousClass = styles.disabled
      } else {
        let payload = {
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': 10,
          'page': currentPage - 1,
          'recommended': searchTextBox.value === ''
        }
        props.setComponentTypeLoading(true)
        componentLoading = true
        props.fetchComponent(payload)
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
        nextClass = styles.disabled
      } else {
        console.log('ccccppppppp', currentPage)
        let payload = {
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': 10,
          'page': currentPage + 1,
          'recommended': searchTextBox.value === ''
        }
        props.setComponentTypeLoading(true)
        componentLoading = true
        componentTypesList = ''
        props.fetchComponent(payload)
        props.setCurrentPage(currentPage + 1)
      }
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage + 1})
        if (found.length > 0) { return group }
      })
      console.log('handle next', listPage)
    }

  return (
    <div className={styles.compborder}>
      <div className='row'>
        <div className='col-md-4'>
          <h2> Components</h2>
        </div>
        <div className={' col-md-6'}>
          <div className='m-input-icon m-input-icon--left'>
            <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onChange={handleInputChange} />
            <span className='m-input-icon__icon m-input-icon__icon--left'>
              <span>
                <i className='la la-search' />
              </span>
            </span>
          </div>
        </div>
      </div>
      {componentLoading && (
      <div className='row'>
        <div className={'m-loader m-loader--info ' + styles.contentLoader} />
        <div className={'m-loader m-loader--success ' + styles.contentLoader} />
        <div className={'m-loader m-loader--warning ' + styles.contentLoader} />
        <div className={'m-loader m-loader--danger ' + styles.contentLoader} />
      </div>
      ) }

      {!props.isComponentTypeLoading && (
      <div className='row clearfix'>
        <div className='row col-md-12' id='m_blockui_1_content'>
          <ul>{componentTypesList}</ul>
        </div>
        <div className='row col-md-12' id='scrolling_vertical'>
          <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
            <div className='m-datatable__pager m-datatable--paging-loaded clearfix' style={{ 'text-align': 'center' }}>
              <ul className='m-datatable__pager-nav'>
                <li><a href='' title='Previous' id='m_blockui_1_5' className={'m-datatable__pager-link m-datatable__pager-link--prev ' + previousClass} onClick={handlePrevious} data-page='4'><i className='la la-angle-left' /></a></li>
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
              </ul>
            </div>
          </div>
        </div>
        {/* <Route path={`/components/:componentTypeId`} component={applicationDetailPageRoute} /> */}
      </div>
      )}
    </div>
  )
}

ComponentType.propTypes = {
  componentTypes: PropTypes.any,
  // componentType: PropTypes.any,
  // componentDetail: PropTypes.any,
  // searchComponent: PropTypes.func,
  // setComponentTypeLoading: PropTypes.func,
  isComponentTypeLoading: PropTypes.any,
  currentPage: PropTypes.any,
  // setCurrentPage: PropTypes.func,
  // fetchComponent: PropTypes.func,
  match: PropTypes.any
}
