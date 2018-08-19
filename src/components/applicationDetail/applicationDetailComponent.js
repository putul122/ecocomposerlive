import React from 'react'
import styles from './applicationDetailComponent.scss'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Modal from 'react-modal'
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
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)'
  }
}

export default function ApplicationDetail (props) {
  // let addComponentMessageResponse = function (message) {
  //   if (message) {
  //     return (<div className='m-alert m-alert--outline alert alert-danger alert-dismissible animated fadeIn' role='alert'>
  //       <button type='button' className='close' data-dismiss='alert' aria-label='Close' />
  //       <span>{message}</span>
  //     </div>
  //     )
  //   } else {
  //     return (<div />)
  //   }
  // }
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
  // let componentId
  let listPage = []
  let paginationLimit = 4
  let NameInputBox
  let DescriptionBox
  // let messageBlock = addComponentMessageResponse('')
  console.log('props', props.setModalOpenStatus)
  // console.log('propsforredirect ', props.addComponent)
  console.log('props', props.setConfirmationModalOpenStatus)
  console.log('componentdata', props.addComponent)
  // console.log('props', props.showToasterSuccess)
  // let paginationList
  if (props.componentDetail !== '') {
    ComponentName = props.componentDetail.resources[0].name
    ComponentDescription = props.componentDetail.resources[0].description
    ComponentTypeId = props.componentDetail.resources[0].id
    ComponentTypeIcon = props.componentDetail.resources[0].links.find(function (link) { return link.rel === 'icon' })
  }
  if (props.addComponent) {
    console.log('add Component --->', props.addComponent)
    // eslint-disable-next-line
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-bottom-full-width',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
    // eslint-disable-next-line
    toastr.success('We\'ve added the Application Sales Force to your model', 'Nice!')
    // setTimeout(() => {
    //   let componentId = props.addComponent.resources[0].id
    //   props.history.push('/components/' + ComponentTypeId + '/' + componentId)
    // }, 1000)
    let componentId = props.addComponent.resources[0].id
    props.history.push('/components/' + ComponentTypeId + '/' + componentId)
  }
  if (typeof componentComponents !== 'undefined') {
    componentComponentsList = componentComponents.map(function (componentComponent, index) {
      return (
        <tr className='m-datatable__row m-datatable__row--even' key={index} style={{ 'left': '0px' }} >
          <td className='m-datatable__cell--sorted m-datatable__cell' >
            <span><Link to={'/components/' + ComponentTypeId + '/' + componentComponent.id}>{ componentComponent.name }</Link></span>
          </td>
          <td className='m-datatable__cell--sorted m-datatable__cell'><span>{ componentComponent.description }</span></td>
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
        'id': props.componentDetail.resources[0].id,
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
      'id': props.componentDetail.resources[0].id,
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
      'id': props.componentDetail.resources[0].id,
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
      'id': props.componentDetail.resources[0].id,
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
  let openModal = function (event) {
    event.preventDefault()
    props.setModalOpenStatus(true)
    console.log('props', props.setModalOpenStatus)
   }
  let closeModal = function () {
    props.setModalOpenStatus(false)
  }
  let closeConfirmationModal = function (event) {
    event.preventDefault()
    let payload = {
      'component_type': {
        'id': props.componentDetail.resources[0].id
      }
      // 'name': NameInputBox.value,
      // 'description': DescriptionBox.value
    }
    console.log('demopayload', payload)
    // let path = `{'/components/' + nextProps.componentDetail.resources[0].id}`
    // this.props.history.push(path)
    // props.addComponent(true)
    // this.props.router.push('/components/' + props.componentDetail.resources[0].id)
    props.setConfirmationModalOpenStatus(false)
    // this.props.router.push('/components/' + props.componentDetail.resources[0].id)
   }
  let createComponent = function (event) {
    event.preventDefault()
    // messageBlock = addComponentMessageResponse('')
    let payload = {
      'component_type': {
        'id': props.componentDetail.resources[0].id
      },
      'name': NameInputBox.value,
      'description': DescriptionBox.value
    }
    console.log('demopayload', payload)
    console.log('newcomponent', payload.name)
    props.addComponentComponent(payload)
    props.setConfirmationModalOpenStatus(false)
    props.setModalOpenStatus(false)
    // messageBlock = loggedInMessageResponse('')
    // props.history.push('/')
    // props.history.push('/components/' + ComponentTypeId + '/' + componentId)
    // props.showToasterSuccess(true)
  }
  return (
    <div>
      <div className={styles.borderline}>
        <div className={'row' + styles.description}>
          <div>
            <img className={styles.iconcenter} src={ComponentTypeIcon.href} alt={ComponentName} />
            <span className='row col-sm-12 col-md-6'>
              <h2>{ ComponentName }</h2>
              <div className=''><button type='button' onClick={openModal} id='m_login_signup' className={styles.buttonbg}>Add Application</button></div>
              <div>
                <Modal isOpen={props.modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles} >
                  {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
                  <div className={styles.modalwidth}>
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h4 className='modal-title' id='exampleModalLabel'>New Application</h4>
                          <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>×</span>
                          </button>
                        </div>
                        <div className='modal-body'>
                          <form>
                            {/* {messageBlock} */}
                            <div className='form-group'>
                              <label htmlFor='component-name' className='form-control-label'>Name:</label>
                              <input type='text' className='form-control' ref={input => (NameInputBox = input)} id='component-name' required />
                            </div>
                            <div className='form-group'>
                              <label htmlFor='description-text' className='form-control-label'>Description:</label>
                              <textarea className='form-control'ref={textarea => (DescriptionBox = textarea)} defaultValue={''} required />
                            </div>
                          </form>
                        </div>
                        <div className='modal-footer'>
                          {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                          <button type='button' onClick={createComponent} id='m_login_signup' className={styles.buttonbg}>Add Component</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                <Modal isOpen={props.successmodalIsOpen}
                  style={customStyles} >
                  {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
                  <div className={styles.modalwidth}>
                    <div className='modal-dialog'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h4 className='modal-title' id='exampleModalLabel'>Confirmation</h4>
                          {/* <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>×</span>
                          </button> */}
                        </div>
                        <div className='modal-body'>
                          <h5 className={styles.confirmsg}>New Application created successfully</h5>
                        </div>
                        <div className='modal-footer'>
                          {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                          <button type='button' onClick={closeConfirmationModal} id='m_login_signup' className={styles.buttonbg}>Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </span>
            <span className='row col-sm-12 col-md-4'><p>{ ComponentDescription }</p></span>
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
                        <th className='m-datatable__cell m-datatable__cell--sort'>Name</th>
                        <th className='m-datatable__cell m-datatable__cell--sort'>Description</th>
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
  // addComponent: PropTypes.func,
  modalIsOpen: PropTypes.any,
  successmodalIsOpen: PropTypes.any,
  setModalOpenStatus: PropTypes.func,
  setConfirmationModalOpenStatus: PropTypes.func,
  // searchComponentComponent: PropTypes.func,
  // showToasterSuccess: PropTypes.func,
  currentPage: PropTypes.any,
  addComponent: PropTypes.any,
  history: PropTypes.any
  // setCurrentPage: PropTypes.func,
  // fetchComponentComponent: PropTypes.func
}
