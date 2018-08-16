import React from 'react'
import styles from './componentTypeComponentComponent.scss'
import PropTypes from 'prop-types'
import relationshipData from './mockData'
import ComponentTypeComponentsData from './mockGetComponentTypeComponents'
import ComponentTypeConstraintsData from './mockGetComponentTypeConstraints'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
import Modal from 'react-modal'

var divStyle = {
  width: '95%',
  height: '30%',
  'overflow-y': 'scroll',
  'overflow-x': 'scroll',
  'border': '1px solid #000000'
}
const customStyles = {
  content: {
    top: '40%',
    left: '40%',
    right: 'auto',
    bottom: 'auto',
    width: '90%',
    // height: '600px',
    margin: 'auto',
    marginRight: '-50%',
    border: 'none',
    background: 'none',
    transform: 'translate(-50%, -50%)'
  }
}

export default function ComponentTypeComponent (props) {
    console.log('component type component properties', props)
    console.log(ComponentTypeComponentsData, relationshipData)
    console.log(ComponentTypeConstraintsData)
    console.log('Relationships', props.componentTypeComponentRelationships)
    console.log('add con set', props.addNewConnectionSettings)
    console.log('add con set func', props.setAddConnectionSettings)
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
    let openModal = function (event) {
      event.preventDefault()
      props.setModalOpenStatus(true)
    }
    let closeModal = function (event) {
      event.preventDefault()
      props.setModalOpenStatus(false)
    }
    let addConnectionClass = props.addNewConnectionSettings.showCreateConnectionButton ? '' : 'disabled'
    let SelectedData
    let selectComponentOptions = ''
    let optionItems = ''
    let newRelationshipArray = props.addNewConnectionSettings.newConnectionArray
    // Action for first select
    let handleFirstSelect = function (event) {
      if (event.target.value !== 0) {
        let index = event.target.value
        let constraintObject = ComponentTypeConstraintsData.resources[index]
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
        let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': true, 'secondSelectboxSelected': false, 'slectedConstraintObject': constraintObject, 'relationshipText': displayText}
        props.setAddConnectionSettings(payload)
      }
    }
    let handleSecondSelect = function (event) {
      let index = event.target.value
      let componentObject = ComponentTypeComponentsData.resources[index]
      let payload = {...props.addNewConnectionSettings, 'secondSelectboxSelected': true, 'selectedComponentObject': componentObject, 'componentText': componentObject.name}
      props.setAddConnectionSettings(payload)
    }
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
      let payload = {...props.addNewConnectionSettings, 'firstSelectboxSelected': false, 'secondSelectboxSelected': false, 'newConnectionArray': newRelationshipArray, 'showCreateConnectionButton': true, 'slectedConstraintObject': {}, 'selectedComponentObject': {}}
      console.log('New relation Ships', newRelationshipArray)
      props.setAddConnectionSettings(payload)
    }

    if (props.componentTypeComponentData !== '') {
      componentTypeComponentName = props.componentTypeComponentData.resources[0].name
      componentTypeComponentDescription = props.componentTypeComponentData.resources[0].description
      startNode.name = props.componentTypeComponentData.resources[0].name
      startNode.title = props.componentTypeComponentData.resources[0].name
      SelectedData = ComponentTypeConstraintsData.resources.map(function (constraint, index) {
        let data = {}
        if (constraint.constraint_type === 'Parent') {
          data.display_name = constraint.target_component_type.name + ' is ' + constraint.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
        } else if (constraint.constraint_type === 'Child') {
          data.display_name = constraint.target_component_type.name + ' is ' + constraint.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
        } else if (constraint.constraint_type === 'ConnectTo') {
          data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
        } else if (constraint.constraint_type === 'ConnectFrom') {
          data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
        }
        data.constraint_type = constraint.constraint_type
        data.name = constraint.name
        data.is_disabled = false
        return data
      })
      optionItems = SelectedData.map((option, index) =>
        <option key={index} value={index}>{option.display_name}</option>
      )
      optionItems.unshift(<option key={0}>{'--Choose Relationship Type--'}</option>)
      selectComponentOptions = ComponentTypeComponentsData.resources.map((option, index) =>
        <option key={index} value={index}>{option.name}</option>
      )
      selectComponentOptions.unshift(<option key={0}>{'--Search Server--'}</option>)
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
          return (<a>{element.target_component.name}</a>)
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
          <Modal isOpen={props.modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles} >
            {/* <button onClick={closeModal} ><i className='la la-close' /></button> */}
            <div className={styles.modalwidth}>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLabel'>{'How is the ' + componentTypeComponentName + ' related to other things'}</h4>
                    <button type='button' onClick={closeModal} className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <div className='col-md-12'>
                      <label className={''} htmlFor='exampleSelect1'>Choose Relationship Type</label>
                      <select className='form-control m-input' onBlur={handleFirstSelect} >{optionItems}</select>
                    </div>
                    {props.addNewConnectionSettings.firstSelectboxSelected && (
                      <div className='col-md-12'>
                        <label className={''} htmlFor='exampleSelect1'>Select Related Component</label>
                        <select className='form-control m-input' onBlur={handleSecondSelect} >{selectComponentOptions}</select>
                      </div>
                    )}
                    {props.addNewConnectionSettings.secondSelectboxSelected && (
                      <div className='col-md-12'>
                        <p>{props.addNewConnectionSettings.relationshipText + ' ' + props.addNewConnectionSettings.componentText}</p>
                        <button onClick={addRelationShip} className={'btn btn-sm btn-outline-info' + ' '}>Add Relationships</button>
                      </div>
                    )}
                    <div className='col-md-12'>
                      <hr size='3' />
                      {props.addNewConnectionSettings.newConnectionArray.length > 0 &&
                        props.addNewConnectionSettings.newConnectionArray.map(function (connection, index) {
                          return (<span><p>{connection.display_name}</p>&nbsp;&nbsp;&nbsp;<a>remove</a></span>)
                        })
                      }
                    </div>
                  </div>
                  <div className='modal-footer'>
                    {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
                    <button className={'btn btn-sm btn-info ' + addConnectionClass}>Add Connections</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    )
}

ComponentTypeComponent.propTypes = {
  componentTypeComponentData: PropTypes.any,
  componentTypeComponentProperties: PropTypes.any,
  showTabs: PropTypes.any,
  // setCurrentTab: PropTypes.func,
  modalIsOpen: PropTypes.any,
  // setModalOpenStatus: PropTypes.func
  componentTypeComponentRelationships: PropTypes.any,
  addNewConnectionSettings: PropTypes.any,
  setAddConnectionSettings: PropTypes.func
}
