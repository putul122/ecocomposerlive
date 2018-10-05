import React from 'react'
import styles from './componentTypeComponent.scss'
import PropTypes from 'prop-types'
// import { debounce } from 'throttle-debounce'
import _ from 'lodash'
import debounce from 'lodash/debounce'

export default function ComponentType (props) {
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
    // let autocompleteSearch = payload => {
    //   // call api
    //   console.log('de payload', payload)
    //   console.log('de searchObject', props.searchObject)
    // }
    // let autocompleteSearchDebounced = debounce(1000, autocompleteSearch)
    console.log(props.searchObject)

    if (typeof componentTypes !== 'undefined') {
      componentTypesList = componentTypes.map(function (componentType, index) {
        let iconlink = componentType.links.find(function (link) { return link.rel === 'icon' })
        return (
          <li key={index} ><img src={iconlink.href} alt={componentType.name} /><br />
            <a href={'/components/' + componentType.id} >{componentType.name}</a>
          </li>
        )
      })

      totalComponentType = props.componentTypes.total_count
      totalNoPages = Math.ceil(totalComponentType / perPage)
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

    let handleInputChange = debounce((e) => {
      // props.setSearchComponentType(searchTextBox.value)
      console.log(e)
      const value = searchTextBox.value
      // const value = e.target.value
      console.log('value', value)
      console.log('searchTextBox', searchTextBox.value)
      props.setComponentTypeLoading(true)
      componentLoading = true
      componentTypesList = ''
      let payload = {
        'search': value || '',
        'page_size': 10,
        'page': currentPage,
        'recommended': value === ''
      }
      props.setSearchObject(payload)
      // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
      props.searchComponent(payload)
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      //   // props.setComponentTypeLoading(true)
      // }
      // autocompleteSearchDebounced(payload)
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage})
        if (found.length > 0) { return group }
      })
    }, 500)
    let handlePage = function (page) {
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
      // eslint-disable-next-line
      mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
      props.setCurrentPage(page)

      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': page})
        if (found.length > 0) { return group }
      })
    }

    let handlePrevious = function (event) {
      event.preventDefault()
      if (currentPage === 1) {
        previousClass = 'm-datatable__pager-link--disabled'
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
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
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
          'search': searchTextBox.value ? searchTextBox.value : '',
          'page_size': 10,
          'page': currentPage + 1,
          'recommended': searchTextBox.value === ''
        }
        props.setComponentTypeLoading(true)
        componentLoading = true
        componentTypesList = ''
        props.fetchComponent(payload)
        // eslint-disable-next-line
        mApp.blockPage({overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
        props.setCurrentPage(currentPage + 1)
      }
      listPage = _.filter(pageArray, function (group) {
        let found = _.filter(group, {'number': currentPage + 1})
        if (found.length > 0) { return group }
      })
    }

  return (
    <div className={styles.compborder}>
      <div className='row'>
        <div className='col-md-6'>
          <h2> Component Type</h2>
        </div>
        <div className={' col-md-6'}>
          <div className='m-input-icon m-input-icon--left'>
            <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
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
      {/* <div className='row'>
        <div className='m-portlet m-portlet--bordered-semi m-portlet--widget-fit m-portlet--full-height m-portlet--skin-light  m-portlet--rounded-force'>
          <div className='m-portlet__head'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                <h3 className='m-portlet__head-text m--font-light'>
                  Component Types
                </h3>
              </div>
            </div>
          </div>
          <div className='m-portlet__body'>
            <div className='m-widget17'>
              <div className='m-widget17__visual m-widget17__visual--chart m-portlet-fit--top m-portlet-fit--sides m--bg-info'>
                <div className='m-widget17__chart' style={{ height: '320px' }}><div className='chartjs-size-monitor' style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: '-1' }}><div className='chartjs-size-monitor-expand' style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: 0, top: 0 }} /></div><div className='chartjs-size-monitor-shrink' style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} /></div></div>
                  <div className={' col-md-6'}>
                    <div className='m-input-icon m-input-icon--left'>
                      <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' ref={input => (searchTextBox = input)} onKeyUp={handleInputChange} />
                      <span className='m-input-icon__icon m-input-icon__icon--left'>
                        <span>
                          <i className='la la-search' />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='m-widget17__stats'>
                <div className='m-widget17__items m-widget17__items-col1'>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-truck m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Delivered
                    </span>
                    <span className='m-widget17__desc'>
                      15 New Paskages
                    </span>
                  </div>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-paper-plane m--font-info' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Reporeted
                    </span>
                    <span className='m-widget17__desc'>
                      72 Support Cases
                    </span>
                  </div>
                </div>
                <div className='m-widget17__items m-widget17__items-col1'>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-truck m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Delivered
                    </span>
                    <span className='m-widget17__desc'>
                      15 New Paskages
                    </span>
                  </div>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-paper-plane m--font-info' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Reporeted
                    </span>
                    <span className='m-widget17__desc'>
                      72 Support Cases
                    </span>
                  </div>
                </div>
                <div className='m-widget17__items m-widget17__items-col1'>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-truck m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Delivered
                    </span>
                    <span className='m-widget17__desc'>
                      15 New Paskages
                    </span>
                  </div>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-paper-plane m--font-info' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Reporeted
                    </span>
                    <span className='m-widget17__desc'>
                      72 Support Cases
                    </span>
                  </div>
                </div>
                <div className='m-widget17__items m-widget17__items-col1'>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-truck m--font-brand' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Delivered
                    </span>
                    <span className='m-widget17__desc'>
                      15 New Paskages
                    </span>
                  </div>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-paper-plane m--font-info' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Reporeted
                    </span>
                    <span className='m-widget17__desc'>
                      72 Support Cases
                    </span>
                  </div>
                </div>
                <div className='m-widget17__items m-widget17__items-col2'>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-pie-chart m--font-success' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Ordered
                    </span>
                    <span className='m-widget17__desc'>
                      72 New Items
                    </span>
                  </div>
                  <div className='m-widget17__item'>
                    <span className='m-widget17__icon'>
                      <i className='flaticon-time m--font-danger' />
                    </span>
                    <span className='m-widget17__subtitle'>
                      Arrived
                    </span>
                    <span className='m-widget17__desc'>
                      34 Upgraded Boxes
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
        </div>
      </div> */}
    </div>
  )
}

ComponentType.propTypes = {
  componentTypes: PropTypes.any,
  // componentType: PropTypes.any,
  // componentDetail: PropTypes.any,
  // searchComponent: PropTypes.func,
  searchObject: PropTypes.any,
  isComponentTypeLoading: PropTypes.any,
  currentPage: PropTypes.any
  // setCurrentPage: PropTypes.func,
  // fetchComponent: PropTypes.func,
}
