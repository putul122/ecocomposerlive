import React from 'react'
// import _ from 'lodash'
// import debounce from 'lodash/debounce'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import './rolesComponent.scss'
ReactModal.setAppElement('#root')
// const formatAmount = (x) => {
//   let parts = x.toString().split('.')
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//   if (typeof parts[1] !== 'undefined') {
//     parts[1] = parts[1].substring(0, 2)
//   }
//   return parts.join('.')
// }

export default function Roles (props) {
//   console.log(props.currentPage, props.componentTypeComponents)
//   console.log(props.checkitems)
//   let searchTextBox
//   let checkitemList = ''
//   let totalNoPages
//   let perPage = props.perPage
//   let currentPage = props.currentPage
//   let nextClass = ''
//   let previousClass = ''
//   let pageArray = []
//   let listPage = []
//   let paginationLimit = 6
//   let totalCheckItem

//   console.log('props', props.setModalOpenStatus)
//   let handleBlurdropdownChange = function (event) {
//     console.log('handle Blur change', event.target.value)
//   }
//   let handledropdownChange = function (event) {
//     console.log('handle change', event.target.value, typeof event.target.value)
//     props.setPerPage(parseInt(event.target.value))
//   }

//   if (props.checkitems && props.checkitems !== '') {
//     checkitemList = props.checkitems.resources.map(function (data, index) {
//       return (
//         <tr key={index}>
//           <td><a href={'/checkitems/' + data.id}>{data.name}</a></td>
//           {/* <td><a href={'/suppliers/' + data.supplier_id}>{data.supplier}</a></td>
//           <td>{data.purchased}</td>
//           <td>{data.consumed}</td>
//           <td>{'R ' + formatAmount(data.cost)}</td>
//           <td>{'R ' + formatAmount(data.total_cost)}</td> */}
//           {/* <td>{data.cost}</td> */}
//         </tr>
//       )
//     })

//     totalCheckItem = props.checkitems.total_count
//     totalNoPages = Math.ceil(totalCheckItem / perPage)

//     if (currentPage === 1) {
//       previousClass = 'm-datatable__pager-link--disabled'
//     }
//     if (currentPage === totalNoPages) {
//       nextClass = 'm-datatable__pager-link--disabled'
//     }
//     let i = 1
//     while (i <= totalNoPages) {
//       let pageParameter = {}
//       pageParameter.number = i
//       pageParameter.class = ''
//       pageArray.push(pageParameter)
//       i++
//     }
//     pageArray = _.chunk(pageArray, paginationLimit)
//     listPage = _.filter(pageArray, function (group) {
//       let found = _.filter(group, {'number': currentPage})
//       if (found.length > 0) { return group }
//     })
//   }

//   let handleInputChange = debounce((e) => {
//     console.log(e)
//     const value = searchTextBox.value
//     // entitlementsList = ''
//     let payload = {
//       'search': value || '',
//       'page_size': props.perPage,
//       'page': currentPage
//     }
//     // if (searchTextBox.value.length > 2 || searchTextBox.value.length === 0) {
//       props.fetchCheckItems(payload)
//       // eslint-disable-next-line
//       mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
//       // props.setComponentTypeLoading(true)
//     // }
//     listPage = _.filter(pageArray, function (group) {
//       let found = _.filter(group, {'number': currentPage})
//       if (found.length > 0) { return group }
//     })
//   }, 500)
//   let handlePrevious = function (event) {
//     event.preventDefault()
//     if (currentPage === 1) {
//       previousClass = styles.disabled
//     } else {
//       let payload = {
//         'search': searchTextBox.value ? searchTextBox.value : '',
//         'page_size': props.perPage,
//         'page': currentPage - 1
//       }
//       props.fetchCheckItems(payload)
//       // eslint-disable-next-line
//       mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
//       props.setCurrentPage(currentPage - 1)
//     }
//     listPage = _.filter(pageArray, function (group) {
//       let found = _.filter(group, {'number': currentPage - 1})
//       if (found.length > 0) { return group }
//     })
//   }
// ss
//   let handlePage = function (page) {
//     if (page === 1) {
//       previousClass = 'm-datatable__pager-link--disabled'
//     } else if (page === totalNoPages) {
//       nextClass = 'm-datatable__pager-link--disabled'
//     }
//     // entitlementsList = ''
//     let payload = {
//       'search': searchTextBox.value ? searchTextBox.value : '',
//       'page_size': props.perPage,
//       'page': page
//     }
//     props.fetchCheckItems(payload)
//     // eslint-disable-next-line
//     mApp && mApp.block('#entitlementList', {overlayColor:'#000000',type:'loader',state:'success',message:'Processing...'})
//     props.setCurrentPage(page)

//     listPage = _.filter(pageArray, function (group) {
//       let found = _.filter(group, {'number': page})
//       if (found.length > 0) { return group }
//     })
//   }
let addRole = function () {
  let rolesActionSettings = {...props.rolesActionSettings, 'isAddModalOpen': true}
  props.setRolesActionSettings(rolesActionSettings)
}
let deleteRole = function () {
  let rolesActionSettings = {...props.rolesActionSettings, 'isDeleteModalOpen': true}
  props.setRolesActionSettings(rolesActionSettings)
}
let closeDeleteModal = function () {
  let rolesActionSettings = {...props.rolesActionSettings, 'isDeleteModalOpen': false}
  props.setRolesActionSettings(rolesActionSettings)
}
let closeModal = function () {
  let rolesActionSettings = {...props.rolesActionSettings, isAddModalOpen: false}
  props.setRolesActionSettings(rolesActionSettings)
}
return (
  <div>
    <div className='row'>
      <div className='col-md-9'>
        <h2>Roles</h2>
      </div>
      <div className='col-md-3'>
        <button type='button' onClick={addRole} className='btn btn-outline-info btn-sm'>Add role</button>&nbsp;
      </div>
    </div>
    <div id='entitlementList'>
      {/* The table structure begins */}
      <div className='row' style={{'marginTop': '20px'}}>
        <div className='col-md-12'>
          <div className='m_datatable' id='scrolling_vertical'>
            <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll' id='scrolling_vertical' style={{}}>
              <div>
                <div className='m-portlet'>
                  <div className='m-portlet__body'>
                    <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                      <div className='row' style={{'marginBottom': '20px'}}>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length' id='m_table_1_length' style={{'display': 'flex'}}>
                            <h5 style={{'margin': '8px'}}>Show</h5>
                            <select value={''} name='m_table_1_length' aria-controls='m_table_1' className='custom-select custom-select-sm form-control form-control-sm' style={{'height': '40px'}}>
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            <h5 style={{'margin': '8px'}}>Entries</h5>
                            {/* </label> */}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length pull-right' id='m_table_1_length' style={{'display': 'flex'}}>
                            <div style={{'display': 'flex'}}>
                              <h5 style={{'margin': '10px'}}>Search</h5>
                              <div className='m-input-icon m-input-icon--left'>
                                <input type='text' className='form-control m-input' placeholder='Search...' id='generalSearch' />
                                <span className='m-input-icon__icon m-input-icon__icon--left'>
                                  <span>
                                    <i className='la la-search' />
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='dataTables_scrollBody' style={{position: 'relative', overflow: 'auto', width: '100%', 'maxHeight': '100vh'}}>
                      <table className='m-portlet table table-striped- table-bordered table-hover table-checkable dataTable no-footer' id='m_table_1' aria-describedby='m_table_1_info' role='grid'>
                        <thead>
                          <tr role='row'>
                            <th className='' style={{width: '180.25px'}}><h5>Role Name</h5></th>
                            <th className='' style={{width: '21.25px'}}><h5>Action</h5></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              Architect
                            </td>
                            <td>
                              <a href='/edit-roles'><button className='btn btn-outline-info btn-sm'>Edit</button>&nbsp;</a>
                              <button type='button' onClick={deleteRole} className='btn btn-outline-danger btn-sm'>Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <div className='row'>
                      <div className='col-md-12' id='scrolling_vertical'>
                        <div className='m_datatable m-datatable m-datatable--default m-datatable--loaded m-datatable--scroll pull-right' id='scrolling_vertical' style={{}}>
                          <div className='m-datatable__pager m-datatable--paging-loaded clearfix'>
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ReactModal isOpen={props.rolesActionSettings.isAddModalOpen}
        onRequestClose={closeModal}
        className='modal-dialog modal-lg'
        style={{'content': {'top': '20%'}}}
        >
        {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
        <div className={''}>
          <div className=''>
            <div className='modal-content' style={{'height': '400px'}}>
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLabel'>Add Role</h4>
                <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body' style={{'height': 'calc(60vh - 55px)', 'overflow': 'auto'}}>
                <div className='col-md-12'>
                  {/* {messageBlock} */}
                  <div className='form-group m-form__group row'>
                    <div className='col-8'>
                      {/* <input className='form-control m-input' type='email' placeholder='Enter User Name' ref={input => (userName = input)} id='example-userName-input' /> */}
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Name</label>
                    <div className='col-8'>
                      <input className='form-control m-input' placeholder='Enter Name' value={''} id='example-email-input' />
                    </div>
                  </div>
                  <div className='form-group m-form__group row'>
                    <label htmlFor='example-input' className='col-2 col-form-label'>Description</label>
                    <div className='col-8'>
                      <textarea className='form-control m-input' placeholder='Enter Description' value={''} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-outline-danger btn-sm'>Cancel</button>
                <button onClick={addRole} className='btn btn-outline-info btn-sm' >Add Role</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
      <ReactModal isOpen={props.rolesActionSettings.isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className='modal-dialog'
        style={{'content': {'top': '20%'}}}
        >
        <div className={''}>
          <div className=''>
            <div className='modal-content'>
              <div className='modal-header'>
                <h6 className='modal-title' id='exampleModalLabel'>Delete Role</h6>
                <button type='button' onClick={closeDeleteModal} className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure?</p>
                <p>Name: </p>
              </div>
              <div className='modal-footer'>
                <button type='button' onClick={closeDeleteModal} id='m_login_signup' className={'btn btn-sm btn-outline-info'}>Cancel</button>
                <button type='button' className={'btn btn-sm btn-outline-info'} onClick={''}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
    {/* <Discussion name={'Entitlements'} TypeKey='Entitlement' type='ComponentType' {...props} />
    <NewDiscussion contextId={contextId} name={'Entitlements'} type='ComponentType' {...props} /> */}
  </div>
      )
  }
  Roles.propTypes = {
    rolesActionSettings: PropTypes.any,
    setRolesActionSettings: PropTypes.func
 }
