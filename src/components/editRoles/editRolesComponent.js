import React from 'react'
// import PropTypes from 'prop-types'
import './editRolesComponent.scss'

export default function EditRoles (props) {
//   console.log(props.client_secret)
//   console.log(props.client_id)
    return (
      <div className=''>
        <div className='col-md-9'>
          <h2>Edit Role</h2>
        </div>
        <div className='m-login__form m-form'>
          <div className='col-md-12'>
            <div className='col-md-10 pull-left'>
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
            <div className='col-md-2 pull-right'>
              <button type='button' className='btn btn-outline-info btn-sm'>Cancel</button>&nbsp;
              <button type='button' className='btn btn-outline-info btn-sm'>Update Role</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  EditRoles.propTypes = {
    // toggleFlipInX: PropTypes.func,
    // client_id: PropTypes.any,
    // client_secret: PropTypes.any,
    // createUserResponse: PropTypes.any,
    // createUserProcess: PropTypes.any
}
