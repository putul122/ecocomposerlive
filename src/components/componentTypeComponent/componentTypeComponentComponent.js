import React from 'react'
import styles from './componentTypeComponentComponent.scss'
import PropTypes from 'prop-types'
// import relationshipData from './mockData'
// import ComponentTypeComponentsData from './mockGetComponentTypeComponents'
// import ComponentTypeConstraintsData from './mockGetComponentTypeConstraints'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
// import Select from 'react-select'
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

export default function ComponentTypeComponent (props) {
    console.log('component type component properties', props)
    console.log('Component Constraints ------', props.componentTypeComponentConstraints)
    console.log('Component Components ------>', props.componentTypeComponents)
    let componentTypeComponentName
    let componentTypeComponentDescription
    let componentTypeComponentProperties = props.componentTypeComponentProperties.resources
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
    // Model ADD new Connections Code
    let firstSelectboxSelected = props.addNewConnectionSettings.firstSelectboxSelected
    let secondSelectboxSelected = props.addNewConnectionSettings.secondSelectboxSelected
    let openModal = function (event) {
      // event.preventDefault()
      props.setModalOpenStatus(true)
    }
    let closeModal = function (event) {
      // event.preventDefault()
      props.setModalOpenStatus(false)
      let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': ''}
      props.setAddConnectionSettings(payload)
    }
    let addConnectionClass = props.addNewConnectionSettings.showCreateConnectionButton ? '' : 'disabled ' + styles.pointerDisabled
    let addRelationshipClass = props.addNewConnectionSettings.showAddRelationshipButton ? '' : 'disabled ' + styles.pointerDisabled
    let SelectedData
    let selectComponentOptions = ''
    let selectComponentOptions1 = ''
    let optionItems = ''
    let newRelationshipArray = props.addNewConnectionSettings.newConnectionArray
    // Action for first select
    let handleFirstSelect = function (event) {
      if (event.target.value !== '-1' && event.target.value !== '') {
        let index = event.target.value
        // let constraintObject = props.componentTypeComponentConstraints.resources[index]
        let constraintObject = _.find(props.componentTypeComponentConstraints.resources, function (obj) {
                                    return parseInt(obj.id) === parseInt(index)
                                })
        console.log('handel first constraint object', constraintObject)
        console.log('handel first constraint index', index)
        console.log('handel first constraint object full', props.componentTypeComponentConstraints.resources)
        console.log('selected options', optionItems)
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
        let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': true, 'firstSelectboxIndex': event.target.value, 'secondSelectboxSelected': false, 'slectedConstraintObject': constraintObject, 'relationshipText': displayText, 'selectedComponentObject': {}}
        props.setAddConnectionSettings(payload)
      } else {
        let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'firstSelectboxIndex': event.target.value, 'secondSelectboxSelected': false, 'slectedConstraintObject': {}, 'relationshipText': '', 'selectedComponentObject': {}}
        props.setAddConnectionSettings(payload)
      }
    }
    // let handleSecondSelect = function (event) {
    //   if (event.target.value !== '-1' && event.target.value !== '') {
    //     let index = event.target.value
    //     let componentObject = props.componentTypeComponents.resources[index]
    //     let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name}
    //     props.setAddConnectionSettings(payload)
    //   } else {
    //     let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': false, 'selectedComponentObject': {}, 'componentText': ''}
    //     props.setAddConnectionSettings(payload)
    //   }
    // }
    let addRelationShip = function () {
      let displayName = props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText
      let targetComponent = {}
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
      console.log('New relation Ships', newRelationshipArray)
      let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'secondSelectboxSelected': false, 'newConnectionArray': newRelationshipArray, 'showCreateConnectionButton': true, 'slectedConstraintObject': {}, 'selectedComponentObject': {}}
      props.setAddConnectionSettings(payload)
    }
    let addConnections = function () {
      props.setRelationshipsValue({'resources': newRelationshipArray})
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
          let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'isNewComponent': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name, 'newComponentName': componentObject.name}
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
          } else if (constraint.constraint_type === 'Child') {
            data.display_name = constraint.target_component_type.name + ' is ' + constraint.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
          } else if (constraint.constraint_type === 'ConnectTo') {
            data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
          } else if (constraint.constraint_type === 'ConnectFrom') {
            data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
          }
          data.disabled = true
          data.id = constraint.id
          data.constraint_type = constraint.constraint_type
          data.name = constraint.name
          data.is_disabled = true
          return data
        } else {
          return false
        }
      })
      console.log('selected data', SelectedData)
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
      componentTypeComponentDescription = props.componentTypeComponentData.resources[0].description
      startNode.name = props.componentTypeComponentData.resources[0].name
      startNode.title = props.componentTypeComponentData.resources[0].name
    }

    if (typeof componentTypeComponentProperties !== 'undefined') {
      componentTypeComponentPropertiesList = componentTypeComponentProperties.map(function (property, index) {
        let propertyProperties = property.properties
        let childProperties = propertyProperties.map(function (childProperty, index) {
          let value
          if (childProperty.property_type.key === 'Integer') {
            value = childProperty.int_value
          } else if (childProperty.property_type.key === 'Decimal') {
            value = childProperty.float_value
          } else if (childProperty.property_type.key === 'DateTime') {
            value = childProperty.date_time_value
          } else if (childProperty.property_type.key === 'Text') {
            value = childProperty.text_value
          } else if (childProperty.property_type.key === 'List') {
            value = childProperty.value_set_value
          } else {
            value = childProperty.other_value
          }
          return (
            <tr key={'child' + index}>
              <td><p className={styles.labelbold}>{childProperty.name}</p></td>
              <td><p>{value}</p></td>
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
          <i className={styles.iconcenter + ' fa fa-share'} />
          <div className='col-md-12'>
            <h2 className='col-md-6'>{componentTypeComponentName}</h2>
            <p className='col-md-12'>{componentTypeComponentDescription}</p>
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
                        <select
                          className='form-control m-input'
                          // value={}
                          onBlur={handleFirstSelect}
                          >{optionItems}</select>
                      </div>
                    </div>
                    {firstSelectboxSelected === true && (
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
                    {secondSelectboxSelected === true && !props.addNewConnectionSettings.isNewComponent && (
                      <div className='row'>
                        <p className='col-8'>{props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText}</p>
                        <div className='col-4'>
                          <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' '}>Add Relationships</button>
                        </div>
                        <div className='m--space-10' />
                      </div>
                    )}
                    {secondSelectboxSelected === true && props.addNewConnectionSettings.isNewComponent && (
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
        </div>
      </div>
    )
}

ComponentTypeComponent.propTypes = {
  // setAddConnectionSettings: PropTypes.func,
  // setRelationshipsValue: PropTypes.func,
  addNewConnectionSettings: PropTypes.any,
  componentTypeComponentData: PropTypes.any,
  componentTypeComponentProperties: PropTypes.any,
  componentTypeComponents: PropTypes.any,
  componentTypeComponentConstraints: PropTypes.any,
  showTabs: PropTypes.any,
  // setCurrentTab: PropTypes.func,
  modalIsOpen: PropTypes.any,
  // setModalOpenStatus: PropTypes.func
  componentTypeComponentRelationships: PropTypes.any
}
