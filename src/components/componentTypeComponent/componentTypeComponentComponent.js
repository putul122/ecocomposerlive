import React from 'react'
import styles from './componentTypeComponentComponent.scss'
import PropTypes from 'prop-types'
// import relationshipData from './mockData'
// import ComponentTypeComponentsData from './mockGetComponentTypeComponents'
// import ComponentTypeConstraintsData from './mockGetComponentTypeConstraints'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

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

export default function ComponentTypeComponent (props) {
    console.log('component type component properties', props)
    console.log('Component Constraints ------', props.componentTypeComponentConstraints)
    console.log('Component Components ------>', props.componentTypeComponents)
    let componentTypeComponentName
    let componentNameMessage
    let componentTypeComponentDescription
    let componentTypeComponentProperties = props.componentTypeComponentProperties.resources
    let componentTypeComponentData = props.componentTypeComponentData
    let copiedComponentProperties = props.copiedComponentProperties
    let componentPropertiesPayload = props.componentPropertiesPayload
    let componentTypeComponentPropertiesList
    let componentTypeComponentRelationships = props.componentTypeComponentRelationships // relationshipData.resources // props.componentTypeComponentRelationships.data
    let modelRelationshipData = ''
    let parentComponentRelationshipList = ''
    let outgoingComponentRelationshipList = ''
    let incomingComponentRelationshipList = ''
    let childComponentRelationshipList = ''
    let startNode = {}
    let showProperties = props.showTabs.showProperty
    let showRelationships = props.showTabs.showRelationship
    let showProperty = function (event) {
      let payload = {'showProperty': ' active show', 'showRelationship': ''}
      props.setCurrentTab(payload)
    }
    let showRelationship = function (event) {
      let payload = {'showProperty': '', 'showRelationship': ' active show'}
      props.setCurrentTab(payload)
    }
    let dropDownClass = ''
    if (props.isDropDownOpen) { dropDownClass = 'm-dropdown--open' } else { dropDownClass = '' }
    let openDropDown = function (event) {
      event.preventDefault()
      props.setDropdownFlag(true)
    }
    let closeDropDown = function (event) {
      event.preventDefault()
      props.setDropdownFlag(false)
    }
    let editComponent = function (event) {
      event.preventDefault()
      // props.setEditComponentFlag(true)
      let payload = {}
      payload.isEditComponent = true
      payload.copiedComponentProperties = {}
      payload.copiedComponentProperties.property = props.componentTypeComponentProperties
      payload.copiedComponentProperties.component = props.componentTypeComponentData
      props.copyComponentProperties(payload)
      console.log('component properties', props.componentTypeComponentProperties)
    }
    let cancelEditComponent = function (event) {
      event.preventDefault()
      console.log('copy component properties', copiedComponentProperties)
      console.log('original component properties', componentTypeComponentProperties)
      props.restoreComponentProperties(props.copiedComponentProperties)
      props.setEditComponentFlag(false)
      props.setDropdownFlag(false)
    }
    let saveComponentProperty = function (event) {
      // props.setEditComponentFlag(false)
      // props.setDropdownFlag(false)
      // let payload = {}
      // payload.componentId = props.componentTypeComponentData.resources[0].id
      // payload.property = componentPropertiesPayload.property
      // payload.component = componentPropertiesPayload.component
      // props.updateComponentTypeComponentProperties(payload)
      // props.updateComponentTypeComponent(payload)
      props.setConfirmationModalOpenStatus(true)
    }
    let closeConfirmationModal = function (event) {
      event.preventDefault()
      console.log('close confirmation model')
      props.setConfirmationModalOpenStatus(false)
    }
    let submitUpdates = function (event) {
      event.preventDefault()
      props.setEditComponentFlag(false)
      props.setDropdownFlag(false)
      let payload = {}
      payload.componentId = props.componentTypeComponentData.resources[0].id
      payload.property = componentPropertiesPayload.property
      payload.component = componentPropertiesPayload.component
      props.updateComponentTypeComponentProperties(payload)
      props.updateComponentTypeComponent(payload)
      props.setConfirmationModalOpenStatus(false)
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
      toastr.success('The ' + componentTypeComponentName + ' was successfully updated', 'Good Stuff!')
    }
    let editTextProperty = function (index, childIndex, value) {
      console.group('Input Changed')
      console.log(index)
      console.log(componentTypeComponentProperties[index].properties[childIndex])
      let payload
      let typeProperty = componentTypeComponentProperties[index].properties[childIndex].type_property
      if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'Integer') {
        componentTypeComponentProperties[index].properties[childIndex].int_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/int_value`, 'value': value }
        // if (typeof value !== 'number') {
        //   console.log('check if', value, typeof value)
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = true
        // } else {
        //   console.log('check else', value)
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = false
        // }
      } else if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'Decimal') {
        componentTypeComponentProperties[index].properties[childIndex].float_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/float_value`, 'value': value }
        // if (typeof value !== 'number') {
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = true
        // } else {
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = false
        // }
      } else if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'DateTime') {
        componentTypeComponentProperties[index].properties[childIndex].date_time_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/date_time_value`, 'value': value }
        // if (typeof value !== 'string') {
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = true
        // } else {
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = false
        // }
      } else if (componentTypeComponentProperties[index].properties[childIndex].property_type.key === 'Text') {
        componentTypeComponentProperties[index].properties[childIndex].text_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/text_value`, 'value': value }
        // if (typeof value !== 'string') {
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = true
        // } else {
        //   componentTypeComponentProperties[index].properties[childIndex].showMessage = false
        // }
      } else {
        componentTypeComponentProperties[index].properties[childIndex].other_value = value
        payload = { 'op': 'replace', 'path': `/${typeProperty}/other_value`, 'value': value }
        componentTypeComponentProperties[index].properties[childIndex].showMessage = false
      }
      if (componentPropertiesPayload.property.length === 0) {
        componentPropertiesPayload.property.push(payload)
      } else {
        if (payload.path === componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1].path) {
          componentPropertiesPayload.property[componentPropertiesPayload.property.length - 1] = payload
        } else {
          componentPropertiesPayload.property.push(payload)
        }
      }
      let editPayload = {}
      editPayload.component = componentTypeComponentData
      editPayload.property = {resources: componentTypeComponentProperties}
      props.editComponentProperties(editPayload)
      props.pushComponentPropertyPayload(componentPropertiesPayload)
    }
    let editComponentName = function (event) {
      let value = event.target.value
      let payload = { 'op': 'replace', 'path': '/name', 'value': value }
      let componentPayload
      if (value === '') {
        componentTypeComponentData.resources[0].nameMessage = true
      } else {
        componentTypeComponentData.resources[0].nameMessage = false
      }
      if (componentPropertiesPayload.component.length === 0) {
        componentPropertiesPayload.component.push(payload)
      } else if (componentPropertiesPayload.component.length === 1) {
        if (componentPropertiesPayload.component[0].path === '/name') {
          componentPropertiesPayload.component[0].value = value
        } else {
          componentPropertiesPayload.component.push(payload)
        }
      } else {
        componentPayload = componentPropertiesPayload.component.map((payload, index) => {
          if (payload.path === '/name') {
            payload.value = value
            return payload
          } else {
            return payload
          }
        })
        componentPropertiesPayload.component = componentPayload
      }
      componentTypeComponentData.resources[0].name = value
      let editPayload = {}
      editPayload.component = componentTypeComponentData
      editPayload.property = {resources: componentTypeComponentProperties}
      props.editComponentProperties(editPayload)
    }
    let editComponentDescription = function (event) {
      let value = event.target.value
      let payload = { 'op': 'replace', 'path': '/description', 'value': value }
      let componentPayload
      if (componentPropertiesPayload.component.length === 0) {
        componentPropertiesPayload.component.push(payload)
      } else if (componentPropertiesPayload.component.length === 1) {
        if (componentPropertiesPayload.component[0].path === '/description') {
          componentPropertiesPayload.component[0].value = value
        } else {
          componentPropertiesPayload.component.push(payload)
        }
      } else {
        componentPayload = componentPropertiesPayload.component.map((payload, index) => {
          if (payload.path === '/description') {
            payload.value = value
            return payload
          } else {
            return payload
          }
        })
        componentPropertiesPayload.component = componentPayload
      }
      componentTypeComponentData.resources[0].description = value
      let editPayload = {}
      editPayload.component = componentTypeComponentData
      editPayload.property = {resources: componentTypeComponentProperties}
      props.editComponentProperties(editPayload)
    }
    // Model ADD new Connections Code
    // let firstSelectboxSelected = props.addNewConnectionSettings.firstSelectboxSelected
    // let secondSelectboxSelected = props.addNewConnectionSettings.secondSelectboxSelected
    let openModal = function (event) {
      // event.preventDefault()
      props.setModalOpenStatus(true)
    }
    let closeModal = function (event) {
      // event.preventDefault()
      props.setModalOpenStatus(false)
      let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': ''}
      props.setAddConnectionSettings(payload)
      props.setRelationshipsValue({'resources': newRelationshipArray})
    }
    let addConnectionClass = props.addNewConnectionSettings.showCreateConnectionButton ? '' : 'disabled ' + styles.pointerDisabled
    let addRelationshipClass = props.addNewConnectionSettings.showAddRelationshipButton ? '' : 'disabled ' + styles.pointerDisabled
    let SelectedData
    let selectComponentOptions = ''
    let selectComponentOptions1 = ''
    let optionItems = ''
    let newRelationshipArray = props.addNewConnectionSettings.newConnectionArray
    // Action for first select
    let handleFirstSelect = function (newValue: any, actionMeta: any) {
      console.group('Value Changed first select')
      console.log(newValue)
      console.log(`action: ${actionMeta.action}`)
      console.groupEnd()
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          let index = newValue.id
        // let constraintObject = props.componentTypeComponentConstraints.resources[index]
          let constraintObject = _.find(props.componentTypeComponentConstraints.resources, function (obj) {
                                      return parseInt(obj.id) === parseInt(index)
                                  })
          let displayText
          if (constraintObject.constraint_type === 'Parent') {
            displayText = constraintObject.target_component_type.name + ' is ' + constraintObject.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
          } else if (constraintObject.constraint_type === 'Child') {
            displayText = constraintObject.target_component_type.name + ' is ' + constraintObject.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
          } else if (constraintObject.constraint_type === 'ConnectTo') {
            displayText = props.componentTypeComponentData.resources[0].name + ' ' + constraintObject.connection_type.name + ' ' + constraintObject.target_component_type.name
          } else if (constraintObject.constraint_type === 'ConnectFrom') {
            displayText = props.componentTypeComponentData.resources[0].name + ' ' + constraintObject.connection_type.name + ' ' + constraintObject.target_component_type.name
          }
          let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': true, 'firstSelectboxIndex': newValue, 'secondSelectboxSelected': false, 'slectedConstraintObject': constraintObject, 'relationshipText': displayText, 'selectedComponentObject': {}}
          props.setAddConnectionSettings(payload)
        } else {
          let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': newValue, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'selectedComponentObject': {}}
          props.setAddConnectionSettings(payload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'selectedComponentObject': {}}
        props.setAddConnectionSettings(payload)
      }
    }
    let addRelationShip = function () {
      let displayName = props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText
      let targetComponent = {}
      let payload = {}
      payload.op = 'add'
      payload.value = {}
      payload.value.target_component = {}
      if (typeof props.addNewConnectionSettings.selectedComponentObject.id !== 'undefined') {
        payload.value.target_component.id = props.addNewConnectionSettings.selectedComponentObject.id
      }
      payload.value.target_component.name = props.addNewConnectionSettings.selectedComponentObject.name
      payload.value.target_component.component_type = {}
      payload.value.target_component.component_type.id = props.addNewConnectionSettings.slectedConstraintObject.target_component_type.id
      payload.value.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
      payload.value.connection = {}
      payload.value.connection.connection_type = props.addNewConnectionSettings.slectedConstraintObject.connection_type.id
      if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'Parent') {
        payload.path = '/parent'
      } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'Child') {
        payload.path = '/children'
      } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'ConnectTo') {
        payload.path = '/'
      } else if (props.addNewConnectionSettings.slectedConstraintObject.constraint_type === 'ConnectFrom') {
        payload.path = '/'
      }
      targetComponent.name = props.addNewConnectionSettings.selectedComponentObject.name
      targetComponent.id = props.addNewConnectionSettings.selectedComponentObject.id
      targetComponent.component_type = props.addNewConnectionSettings.slectedConstraintObject.target_component_type
      let component = {}
      component.name = props.componentTypeComponentData.resources[0].name
      component.id = props.componentTypeComponentData.resources[0].id
      let newConnection = {}
      newConnection.display_name = displayName
      newConnection.relationship_type = props.addNewConnectionSettings.slectedConstraintObject.constraint_type
      newConnection.component = component
      // eslint-disable-next-line
      newConnection.target_component = targetComponent
      newConnection.connection = props.addNewConnectionSettings.slectedConstraintObject.connection_type
      newRelationshipArray.push(newConnection)
      let isParentSelected = newConnection.relationship_type === 'Parent'
      console.log('New relation Ships', newRelationshipArray)
      let settingPayload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': null, 'secondSelectboxSelected': false, 'isParentSelected': isParentSelected, 'newConnectionArray': newRelationshipArray, 'showCreateConnectionButton': true, 'slectedConstraintObject': {}, 'selectedComponentObject': {}}
      props.setAddConnectionSettings(settingPayload)
      componentPropertiesPayload.relationship.push(payload)
      props.pushComponentPropertyPayload(componentPropertiesPayload)
      // let updatePayload = {}
      // let arry = []
      // arry.push(payload)
      // updatePayload.componentId = props.componentTypeComponentData.resources[0].id
      // updatePayload.relationship = arry
      // props.updateComponentTypeComponentRelationships(updatePayload)
      // console.log('add payload', updatePayload)
    }
    let addConnections = function () {
      console.log(componentPropertiesPayload.relationship)
      props.setRelationshipsValue({'resources': newRelationshipArray})
      let payload = {}
      payload.componentId = props.componentTypeComponentData.resources[0].id
      payload.relationship = componentPropertiesPayload.relationship
      props.updateComponentTypeComponentRelationships(payload)
      showToaster()
      closeModal()
    }
    let handleSecondSelect = function (newValue: any, actionMeta: any) {
      console.group('Value Changed')
      console.log(newValue)
      console.log(`action: ${actionMeta.action}`)
      console.groupEnd()
      if (actionMeta.action === 'select-option') {
        if (newValue !== null) {
          // let index = newValue.value
          let componentObject = newValue // props.componentTypeComponents.resources[index]
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': false, 'selectedComponentObject': componentObject, 'componentText': componentObject.name}
          props.setAddConnectionSettings(payload)
        } else {
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'isNewComponent': false, 'selectedComponentObject': {}, 'componentText': ''}
          props.setAddConnectionSettings(payload)
        }
      }
      if (actionMeta.action === 'clear') {
        let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'isNewComponent': false, 'selectedComponentObject': {}, 'componentText': ''}
        props.setAddConnectionSettings(payload)
      }
      if (actionMeta.action === 'create-option') {
        if (newValue !== null) {
          let componentObject = {}
          componentObject.name = newValue.value // props.componentTypeComponents.resources[index]
          let showAddRelationshipButton = newValue.value.length >= 1
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name, 'newComponentName': componentObject.name, 'showAddRelationshipButton': showAddRelationshipButton}
          props.setAddConnectionSettings(payload)
        } else {
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'selectedComponentObject': {}, 'componentText': ''}
          props.setAddConnectionSettings(payload)
        }
      }
    }
    let handleInputChange = function (inputValue: any, actionMeta: any) {
      console.group('Input Changed')
      console.log(inputValue)
      console.log(`action: ${actionMeta.action}`)
      console.groupEnd()
    }
    let showToaster = function () {
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
      toastr.success('We\'ve added the new relationships to the ' + componentTypeComponentName + '', 'Connecting the dots!')
    }
    let removeRelationship = function (index) {
      let newConnection = props.addNewConnectionSettings.newConnectionArray
      newConnection.splice(index, 1)
      let showCreateConnectionButton = newConnection.length > 0 || false
      let payload = {...props.addNewConnectionSettings, 'newConnectionArray': newConnection, 'showCreateConnectionButton': showCreateConnectionButton}
      props.setAddConnectionSettings(payload)
      props.setRelationshipsValue({'resources': newConnection})
      console.log(JSON.stringify(newConnection))
      modelRelationshipData = newConnection
    }
    let handleNewComponent = function (event) {
      console.log(event.target.value)
      let newComponent = event.target.value
      let componentObject = {}
      componentObject.name = newComponent
      let showAddRelationshipButton = newComponent.length >= 1
      console.log(newComponent.length >= 1)
      let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': newComponent, 'newComponentName': newComponent, 'showAddRelationshipButton': showAddRelationshipButton}
      props.setAddConnectionSettings(payload)
    }

    if (props.componentTypeComponentConstraints !== '' && props.componentTypeComponents !== '') {
      SelectedData = props.componentTypeComponentConstraints.resources.filter(function (constraint) {
          if (constraint.target_component_type !== null && constraint.connection_type !== null) {
          return constraint
          }
        }).map(function (constraint, index) {
        if (constraint.target_component_type !== null && constraint.connection_type !== null) {
          let data = {}
          console.log('inside component constraints', constraint)
          if (constraint.constraint_type === 'Parent') {
            data.display_name = constraint.target_component_type.name + ' is ' + constraint.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
            data.isParent = true
          } else if (constraint.constraint_type === 'Child') {
            data.display_name = constraint.target_component_type.name + ' is ' + constraint.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
            data.isParent = false
          } else if (constraint.constraint_type === 'ConnectTo') {
            data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
            data.isParent = false
          } else if (constraint.constraint_type === 'ConnectFrom') {
            data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
            data.isParent = false
          }
          data.disabled = true
          data.id = constraint.id
          data.constraint_type = constraint.constraint_type
          data.name = constraint.name
          data.is_disabled = true
          data.value = constraint.id
          data.label = data.display_name
          return data
        } else {
          return false
        }
      })
      optionItems = SelectedData.map((option, index) =>
        <option key={index} value={option.id}>{option.display_name}</option>
      )
      optionItems.unshift(<option key={-1} value={'-1'}>{'--Choose Relationship Type--'}</option>)
      selectComponentOptions = props.componentTypeComponents.resources.map((option, index) =>
        <option key={index} value={index}>{option.name}</option>
      )
      selectComponentOptions.unshift(<option key={-1} value={'-1'}>{'--Search Server--'}</option>)

      selectComponentOptions1 = props.componentTypeComponents.resources.map((component, index) => {
        let option = {...component}
        option.value = component.name
        option.label = component.name
        return option
      })
    }

    if (props.componentTypeComponentData !== '') {
      componentTypeComponentName = props.componentTypeComponentData.resources[0].name
      componentNameMessage = props.componentTypeComponentData.resources[0].nameMessage
      componentTypeComponentDescription = props.componentTypeComponentData.resources[0].description
      startNode.name = props.componentTypeComponentData.resources[0].name
      startNode.title = props.componentTypeComponentData.resources[0].name
    }

    if (typeof componentTypeComponentProperties !== 'undefined') {
      console.log('original', componentTypeComponentProperties)
      componentTypeComponentPropertiesList = componentTypeComponentProperties.map(function (property, index) {
        let propertyProperties = property.properties
        let childProperties = propertyProperties.map(function (childProperty, childIndex) {
          let value
          let htmlElement
          // console.log('childProperty', childProperty)
          if (childProperty.property_type.key === 'Integer') {
            value = childProperty.int_value
            htmlElement = function () {
              return (<div className='form-group m-form__group has-danger'>
                <input type='number' className='col-8 input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {childProperty.showMessage && (<div className='form-control-feedback'>should be Number</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'Decimal') {
            value = childProperty.float_value
            htmlElement = function () {
              return (<div className='form-group m-form__group has-danger'>
                <input type='number' className='col-8 input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {childProperty.showMessage && (<div className='form-control-feedback'>should be Number</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'DateTime') {
            value = childProperty.date_time_value
            htmlElement = function () {
              return (<div className='form-group m-form__group has-danger'>
                <input type='text' className='col-8 input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {childProperty.showMessage && (<div className='form-control-feedback'>should be Text</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'Text') {
            value = childProperty.text_value
            htmlElement = function () {
              return (<div className='form-group m-form__group has-danger'>
                <input type='text' className='col-8 input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />
                {childProperty.showMessage && (<div className='form-control-feedback'>should be Text</div>)}
              </div>)
            }
          } else if (childProperty.property_type.key === 'List') {
            let childPropertyOption = childProperty.value_set.values.map((option, opIndex) => {
              option.label = option.name
              option.value = option.id
              return option
            })
            // value = childProperty.value_set_value
            htmlElement = function () {
              return (<Select
                className='col-4 input-sm form-control m-input'
                placeholder='Select Options'
                isClearable
                // defaultValue={childPropertyOption[0]}
                // isDisabled={false}
                // isLoading={false}
                // isClearable={true}
                isSearchable={false}
                name='selectProperty'
                options={childPropertyOption}
              />)
            }
          } else {
            value = childProperty.other_value
            htmlElement = function () {
              return (<input type='text' className='col-3 input-sm form-control m-input' value={value} onChange={(event) => { editTextProperty(index, childIndex, event.target.value) }} placeholder='Enter Here' />)
            }
          }
          return (
            <tr key={'child' + childIndex}>
              <td><p className={styles.labelbold}>{childProperty.name}</p></td>
              <td>
                {!props.isEditComponent && (<p>{value}</p>)}
                {props.isEditComponent && htmlElement()}
              </td>
            </tr>
          )
        })
        return (
          <tbody>
            <tr key={index}>
              <td><p className={styles.labelbold}>Type</p></td>
              <td><p>{property.name}</p></td>
            </tr>
            {childProperties}
          </tbody>
        )
      })
    } else {
      console.log('check properties else', props)
    }

    if (componentTypeComponentRelationships !== '') {
      modelRelationshipData = componentTypeComponentRelationships.resources
      let parent = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Parent'})
      let outgoing = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'ConnectTo'})
      outgoing = _.orderBy(outgoing, ['connection.name', 'target_component.name'], ['asc', 'asc'])
      let incoming = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'ConnectFrom'})
      incoming = _.orderBy(incoming, ['connection.name', 'target_component.name'], ['asc', 'asc'])
      let child = _.filter(componentTypeComponentRelationships.resources, {'relationship_type': 'Child'})

      let parentComponentRelationshipListFn = function () {
        if (parent.length > 0) {
          let childElementList = parent.map(function (element, i) {
          return (<span><a>{element.target_component.name}</a><br /></span>)
        })
        return (
          <div className='m-accordion__item'>
            <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].relationship_type} aria-expanded='true'>
              <span className='m-accordion__item-title'>{parent[0].component.name} {parent[0].relationship_type} {'Components'}</span>
              <span className='m-accordion__item-mode' />
            </div>
            <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + parent[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
              <div className='m-accordion__item-content'>
                {childElementList}
              </div>
            </div>
          </div>
          )
        } else {
          console.log('parent else')
          return false
        }
      }
      let childComponentRelationshipListFn = function () {
        if (child.length > 0) {
          let childElementList = child.map(function (element, i) {
          return (<span><a>{element.target_component.name}</a><br /></span>)
        })
        return (
          <div className='m-accordion__item'>
            <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].relationship_type} aria-expanded='true'>
              <span className='m-accordion__item-title'>{child[0].component.name} {child[0].relationship_type} {'Components'}</span>
              <span className='m-accordion__item-mode' />
            </div>
            <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + child[0].relationship_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
              <div className='m-accordion__item-content'>
                {childElementList}
              </div>
            </div>
          </div>
          )
        } else {
          console.log('child else')
          return false
        }
      }
      let outgoingComponentRelationshipListFn = function () {
        if (outgoing.length > 0) {
          let outgoingElements = []
          var outgoingGroup = _.chain(outgoing)
          .groupBy('connection.name')
          .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
          .value()
          for (let connectionKey in outgoingGroup) {
            if (outgoingGroup.hasOwnProperty(connectionKey)) {
              // console.log(connectionKey, '-->>', outgoingGroup[connectionKey])
              for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
                if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                  // console.log(targetComponentTypeKey, '-->>', outgoingGroup[connectionKey][targetComponentTypeKey])
                  let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                    return (<span><a>{element.target_component.name}</a><br /></span>)
                  })
                  outgoingElements.push(
                    <div className='m-accordion__item'>
                      <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + targetComponentTypeKey} aria-expanded='false'>
                        <span className='m-accordion__item-title'>{outgoingGroup[connectionKey][targetComponentTypeKey][0].component.name} {connectionKey} {targetComponentTypeKey}</span>
                        <span className='m-accordion__item-mode' />
                      </div>
                      <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + targetComponentTypeKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                        <div className='m-accordion__item-content'>
                          {childElementList}
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            }
          }
          return outgoingElements
        } else {
          console.log('outgoing else')
          return false
        }
      }
      let incomingComponentRelationshipListFn = function () {
        if (incoming.length > 0) {
          var incomingGroup = _.chain(incoming)
          .groupBy('connection.name')
          .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
          .value()
          let incomingElements = []
          for (let connectionKey in incomingGroup) {
            if (incomingGroup.hasOwnProperty(connectionKey)) {
              // console.log(connectionKey, '-->>', incomingGroup[connectionKey])
              for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
                if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                  // console.log(targetComponentTypeKey, '-->>', incomingGroup[connectionKey][targetComponentTypeKey])
                  let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                    return (<span><a>{element.target_component.name}</a><br /></span>)
                  })
                  incomingElements.push(
                    <div className='m-accordion__item'>
                      <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + targetComponentTypeKey} aria-expanded='true'>
                        <span className='m-accordion__item-title'>{targetComponentTypeKey} {connectionKey} {incomingGroup[connectionKey][targetComponentTypeKey][0].component.name}</span>
                        <span className='m-accordion__item-mode' />
                      </div>
                      <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + targetComponentTypeKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2'>
                        <div className='m-accordion__item-content'>
                          {childElementList}
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            }
          }
          return incomingElements
        } else {
          console.log('incoming else')
          return false
        }
      }

      parentComponentRelationshipList = parentComponentRelationshipListFn()
      outgoingComponentRelationshipList = outgoingComponentRelationshipListFn()
      incomingComponentRelationshipList = incomingComponentRelationshipListFn()
      childComponentRelationshipList = childComponentRelationshipListFn()
    }

    return (
      <div className={styles.borderline}>
        <div className={'row' + styles.description}>
          <div className='col-md-12 row'>
            <i className={' fa fa-share'} />
            {!props.isEditComponent && (<h2 className='col-3'>{componentTypeComponentName}</h2>)}
            {props.isEditComponent && (<div className='form-group m-form__group has-danger'>
              <input type='text' className='col-8 form-control m-input' onChange={editComponentName} value={componentTypeComponentName} placeholder='Component Name' aria-describedby='basic-addon2' />
              {componentNameMessage && (<div className='form-control-feedback'>Component name required</div>)}
            </div>)}
            {!props.isEditComponent && (<div className={'col-3 pull-rig m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-left m-dropdown--align-push ' + dropDownClass}>
              <a href='javascript:void(0);' className='m-portlet__nav-link m-dropdown__toggle btn btn-secondary m-btn m-btn--icon m-btn--pill' onClick={openDropDown}>
                <i className='la la-ellipsis-h' />
              </a>
              <div className='m-dropdown__wrapper' style={{zIndex: 101}}>
                <span className='m-dropdown__arrow m-dropdown__arrow--left m-dropdown__arrow--adjust' style={{right: 'auto', left: '29.5px'}} />
                <div className='m-dropdown__inner'>
                  <div className='m-dropdown__body'>
                    <div className='m-dropdown__content'>
                      <ul className='m-nav'>
                        <li className='m-nav__section m-nav__section--first'>
                          <span className='m-nav__section-text'>Quick Actions</span>
                        </li>
                        <li className='m-nav__item'>
                          <a href='javascript:void(0);' onClick={editComponent} className='m-nav__link'>
                            <i className='m-nav__link-icon flaticon-edit-1' />
                            <span className='m-nav__link-text'>Update Properties</span>
                          </a>
                        </li>
                        {/* <li className='m-nav__item'>
                          <a href='' className='m-nav__link' onClick={openDeleteModal}>
                            <i className='m-nav__link-icon flaticon-delete-1' />
                            <span className='m-nav__link-text'>Delete</span>
                          </a>
                        </li> */}
                        <li className='m-nav__separator m-nav__separator--fit' />
                        <li className='m-nav__item'>
                          <a href='javascript:void(0);' className='btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm' onClick={closeDropDown}>Cancel</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
            {props.isEditComponent && (<div className='col-4 clearfix'>
              <button onClick={cancelEditComponent} className='btn btn-outline-info btn-sm'>Cancel</button>
              <button onClick={saveComponentProperty} className='btn btn-outline-info btn-sm'>Save</button>
            </div>)}
            {!props.isEditComponent && (<p className='col-12'>{componentTypeComponentDescription}</p>)}
            {props.isEditComponent && (<input type='text' className='col-6 form-control m-input' onChange={editComponentDescription} value={componentTypeComponentDescription} placeholder='Component Description' aria-describedby='basic-addon2' />)}
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 col-md-6' >
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs' role='tablist'>
                <li className='nav-item'>
                  <a className={'nav-link' + showProperties} data-toggle='tab' onClick={showProperty} href='javascript:void(0);'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className={'nav-link' + showRelationships} data-toggle='tab' onClick={showRelationship} href='javascript:void(0);'>RelationShips</a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className={'tab-pane' + showProperties} id='m_tabs_3_1' role='tabpanel'>
                  <table className={'table ' + styles.borderless}>
                    {componentTypeComponentPropertiesList}
                  </table>
                </div>
                <div className={'tab-pane' + showRelationships} id='m_tabs_3_2' role='tabpanel'>
                  <div className='pull-right'>
                    <button onClick={openModal} className={'btn btn-sm btn-outline-info pull-right'}>Add Connections</button>
                  </div>
                  <div className='accordion m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist' aria-multiselectable='true'>
                    {parentComponentRelationshipList}
                    {outgoingComponentRelationshipList}
                    {incomingComponentRelationshipList}
                    {childComponentRelationshipList}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-6 col-md-6'>
            <div className={styles.modelsection}>
              <h2>{componentTypeComponentName} Model Diagram</h2><br />
              <div className='row'>
                <div id='divPaperWrapper' style={divStyle}>
                  <ComponentModelComponent startNode={startNode} relationships={modelRelationshipData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReactModal isOpen={props.modalIsOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={false}
            // className={''}
            style={''} >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={styles.modalStyle}>
              <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>{'How is the ' + componentTypeComponentName + ' related to other things'}</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='form-group m-form__group row'>
                      <label htmlFor='SelectRelationship' className='col-5 col-form-label'>Choose Relationship Type</label>
                      <div className='col-7'>
                        <Select
                          className='input-sm form-control m-input'
                          placeholder='Choose Relationships Type'
                          isClearable
                          isOptionDisabled={(option) => { return (option.isParent && props.addNewConnectionSettings.isParentSelected) }}
                          // defaultValue={childPropertyOption[0]}
                          // isDisabled={false}
                          // isLoading={false}
                          // isClearable={true}
                          value={props.addNewConnectionSettings.firstSelectboxIndex}
                          // clearValue={() => { return true }}
                          onChange={handleFirstSelect}
                          isSearchable={false}
                          name='selectConstraint'
                          options={SelectedData}
                        />
                      </div>
                    </div>
                    {props.addNewConnectionSettings.firstSelectboxSelected === true && (
                      <div className='form-group m-form__group row'>
                        <label htmlFor='SelectRelatedComponent' className='col-5 col-form-label'>Choose Select Related Component</label>
                        <div className='col-7'>
                          {/* <select className='form-control m-input' onBlur={handleSecondSelect} >{selectComponentOptions}</select> */}
                          <CreatableSelect
                            isClearable
                            className='form-control m-input'
                            // name='component-select'
                            // value={props.addNewConnectionSettings.secondSelectboxValue}
                            onChange={handleSecondSelect}
                            onInputChange={handleInputChange}
                            options={selectComponentOptions1}
                            // isOptionDisabled={(option) => option.is_disabled === true}
                          />
                        </div>
                        <div className='m--space-10' />
                      </div>
                    )}
                    {props.addNewConnectionSettings.secondSelectboxSelected === true && !props.addNewConnectionSettings.isNewComponent && (
                      <div className='row'>
                        <p className='col-8'>{props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText}</p>
                        <div className='col-4'>
                          <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' '}>Add Relationships</button>
                        </div>
                        <div className='m--space-10' />
                      </div>
                    )}
                    {props.addNewConnectionSettings.secondSelectboxSelected === true && props.addNewConnectionSettings.isNewComponent && (
                      <div className='row'>
                        <p className='col-5'>{props.addNewConnectionSettings.relationshipText + ' '}</p>
                        <input type='text' className='col-4 form-control m-input' onChange={handleNewComponent} value={props.addNewConnectionSettings.newComponentName} placeholder='New Component' aria-describedby='basic-addon2' />
                        <div className='col-3'>
                          <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' ' + addRelationshipClass}>Add Relationships</button>
                        </div>
                        <div className='m--space-10' />
                      </div>
                    )}
                    <div className='col-md-12'>
                      <div className='m--space-10' />
                      <div className='m--space-10' />
                      <hr size='3' />
                      {props.addNewConnectionSettings.newConnectionArray.length > 0 &&
                        props.addNewConnectionSettings.newConnectionArray.map(function (connection, index) {
                          return (
                            <div className='row'>
                              <p className='col-8'>{connection.display_name}</p>
                              <div className='col-4'>
                                <a href='javscript:void(0);' onClick={() => { removeRelationship(index) }} >remove</a>
                              </div>
                            </div>)
                        })
                      }
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button onClick={closeModal} className='btn btn-sm btn-outline-info'>Cancel</button>
                    <button onClick={addConnections} className={'btn btn-sm btn-info ' + addConnectionClass}>Add Connections</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
          <ReactModal isOpen={props.successmodalIsOpen}
            style={customStyles} >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={styles.modalwidth}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>Confirmation</h4>
                  </div>
                  <div className='modal-body'>
                    <p className={styles.confirmsg}>Some of the required properties do not have any values.</p>
                    <p className={styles.confirmsg}>Are you sure you want to continue?</p>
                  </div>
                  <div className='modal-footer'>
                    <button onClick={closeConfirmationModal} className='btn btn-sm btn-outline-info'>Back</button>
                    <button onClick={submitUpdates} id='m_login_signup' className='btn btn-sm btn-info'>Submit Updates</button>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    )
}

ComponentTypeComponent.propTypes = {
  // setAddConnectionSettings: PropTypes.func,
  // setRelationshipsValue: PropTypes.func,
  // updateComponentTypeComponentRelationships: PropTypes.func,
  // copyComponentProperties: PropTypes.func,
  // restoreComponentProperties: PropTypes.func,
  // editComponentProperties: PropTypes.func,
  // pushComponentPropertyPayload: PropTypes.func,
  // updateComponentTypeComponentProperties: PropTypes.func,
  // updateComponentTypeComponent: PropTypes.func,
  // setConfirmationModalOpenStatus: PropTypes.func,
  successmodalIsOpen: PropTypes.any,
  componentPropertiesPayload: PropTypes.any,
  copiedComponentProperties: PropTypes.any,
  addNewConnectionSettings: PropTypes.any,
  componentTypeComponentData: PropTypes.any,
  componentTypeComponentProperties: PropTypes.any,
  componentTypeComponents: PropTypes.any,
  componentTypeComponentConstraints: PropTypes.any,
  showTabs: PropTypes.any,
  isEditComponent: PropTypes.any,
  // setCurrentTab: PropTypes.func,
  // setEditComponentFlag: PropTypes.func,
  modalIsOpen: PropTypes.any,
  // setModalOpenStatus: PropTypes.func
  componentTypeComponentRelationships: PropTypes.any,
  isDropDownOpen: PropTypes.any
}
