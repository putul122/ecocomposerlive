import React from 'react'
import styles from './componentTypeComponentComponent.scss'
import PropTypes from 'prop-types'
import relationshipData from './mockData'
// import ComponentTypeComponentsData from './mockGetComponentTypeComponents'
// import ComponentTypeConstraintsData from './mockGetComponentTypeConstraints'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
// import Modal from 'react-modal'
var divStyle = {
  width: '95%',
  height: '30%',
  'overflow-y': 'scroll',
  'overflow-x': 'scroll',
  'border': '1px solid #000000'
}
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     border: 'none',
//     background: 'none',
//     transform: 'translate(-50%, -50%)'
//   }
// }

export default function ComponentTypeComponent (props) {
    console.log('component type component properties', props)
    let componentTypeComponentName
    let componentTypeComponentDescription
    let componentTypeComponentProperties = props.componentTypeComponentProperties.resources
    let componentTypeComponentPropertiesList
    let componentTypeComponentRelName
    let componentTypeComponentChildName
    let componentTypeComponentRelationshipsList
    let componentTypeComponentRelationships = relationshipData.resources // props.componentTypeComponentRelationships.data
    let parentComponentRelationshipList
    let outgoingComponentRelationshipList
    let incomingComponentRelationshipList
    let childComponentRelationshipList
    let startNode = {}
    // let openModal = function (event) {
    //   event.preventDefault()
    //   props.setModalOpenStatus(true)
    // }
    // let closeModal = function () {
    //   props.setModalOpenStatus(false)
    // }
    // let SelectedData
    // let optionItems = ''
    // let handleFirstSelect = function (event) {
    //   console.log(event.target.value)
    // }
    console.log('name', componentTypeComponentRelName)
    console.log('name', componentTypeComponentChildName)
    console.log('name', componentTypeComponentRelationshipsList)

    if (props.componentTypeComponentData !== '') {
      componentTypeComponentName = props.componentTypeComponentData.resources[0].name
      componentTypeComponentDescription = props.componentTypeComponentData.resources[0].description
      startNode.name = props.componentTypeComponentData.resources[0].name
      startNode.title = props.componentTypeComponentData.resources[0].name
      // SelectedData = ComponentTypeConstraintsData.resources.map(function (constraint, index) {
      //   let data = {}
      //   if (constraint.constraint_type === 'Parent') {
      //     data.display_name = constraint.target_component_type.name + ' is ' + constraint.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
      //   } else if (constraint.constraint_type === 'Child') {
      //     data.display_name = constraint.target_component_type.name + ' is ' + constraint.connection_type.name + ' of ' + props.componentTypeComponentData.resources[0].name
      //   } else if (constraint.constraint_type === 'ConnectTo') {
      //     data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
      //   } else if (constraint.constraint_type === 'ConnectFrom') {
      //     data.display_name = props.componentTypeComponentData.resources[0].name + ' ' + constraint.connection_type.name + ' ' + constraint.target_component_type.name
      //   }
      //   data.constraint_type = constraint.constraint_type
      //   data.name = constraint.name
      //   data.is_disabled = false
      //   return data
      // })
      // optionItems = SelectedData.map((option) =>
      //   <option key={option.name} value={option}>{option.display_name}</option>
      // )
      // optionItems.unshift(<option key={0}>{'--Choose Relationship Type--'}</option>)
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
    if (props.componentTypeComponentData !== '') {
      componentTypeComponentRelName = props.componentTypeComponentData.resources[0].component_type_name
      componentTypeComponentChildName = props.componentTypeComponentData.resources[0].name
    }

    if (componentTypeComponentRelationships !== '') {
      let parent = _.filter(componentTypeComponentRelationships, {'constraint_type': 'Parent'})
      let outgoing = _.filter(componentTypeComponentRelationships, {'constraint_type': 'Outgoing'})
      outgoing = _.orderBy(outgoing, ['connection_type_name', 'target_component_type_name'], ['asc', 'asc'])
      let incoming = _.filter(componentTypeComponentRelationships, {'constraint_type': 'Incoming'})
      incoming = _.orderBy(incoming, ['connection_type_name', 'related_component_name'], ['asc', 'asc'])
      let child = _.filter(componentTypeComponentRelationships, {'constraint_type': 'Child'})

      parentComponentRelationshipList = function () {
        let childElementList = parent.map(function (element, i) {
          return (<a>{element.related_component_name}</a>)
        })
        return (
          <div className='m-accordion__item'>
            <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + parent[0].constraint_type} aria-expanded='false'>
              <span className='m-accordion__item-title'>{parent[0].component_name} {parent[0].relationship_type} {'Components'}</span>
              <span className='m-accordion__item-mode' />
            </div>
            <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + parent[0].constraint_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2' style={{}}>
              <div className='m-accordion__item-content'>
                {childElementList}
              </div>
            </div>
          </div>
          )
      }
      childComponentRelationshipList = function () {
        let childElementList = child.map(function (element, i) {
          return (<span><a>{element.related_component_name}</a><br /></span>)
        })
        return (
          <div className='m-accordion__item'>
            <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + child[0].constraint_type} aria-expanded='false'>
              <span className='m-accordion__item-title'>{child[0].component_name} {child[0].constraint_type} {'Components'}</span>
              <span className='m-accordion__item-mode' />
            </div>
            <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + child[0].constraint_type} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2' style={{}}>
              <div className='m-accordion__item-content'>
                {childElementList}
              </div>
            </div>
          </div>
          )
      }
      outgoingComponentRelationshipList = function () {
        let outgoingElements = []
        var outgoingGroup = _.chain(outgoing)
        .groupBy('connection_type_name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component_type_name))
        .value()
        for (let connectionKey in outgoingGroup) {
          if (outgoingGroup.hasOwnProperty(connectionKey)) {
            console.log(connectionKey, '-->>', outgoingGroup[connectionKey])
            for (let targetComponentTypeKey in outgoingGroup[connectionKey]) {
              if (outgoingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                console.log(targetComponentTypeKey, '-->>', outgoingGroup[connectionKey][targetComponentTypeKey])
                let childElementList = outgoingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span><a>{element.target_component_name}</a><br /></span>)
                })
                outgoingElements.push(
                  <div className='m-accordion__item'>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + targetComponentTypeKey} aria-expanded='false'>
                      <span className='m-accordion__item-title'>{outgoingGroup[connectionKey][targetComponentTypeKey][0].component_name} {connectionKey} {targetComponentTypeKey}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + targetComponentTypeKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2' style={{}}>
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
      }
      incomingComponentRelationshipList = function () {
        var incomingGroup = _.chain(incoming)
        .groupBy('connection_type_name')
        .mapValues(connectionTypeGroup => _.groupBy(connectionTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component_type_name))
        .value()
        let incomingElements = []
        for (let connectionKey in incomingGroup) {
          if (incomingGroup.hasOwnProperty(connectionKey)) {
            console.log(connectionKey, '-->>', incomingGroup[connectionKey])
            for (let targetComponentTypeKey in incomingGroup[connectionKey]) {
              if (incomingGroup[connectionKey].hasOwnProperty(targetComponentTypeKey)) {
                console.log(targetComponentTypeKey, '-->>', incomingGroup[connectionKey][targetComponentTypeKey])
                let childElementList = incomingGroup[connectionKey][targetComponentTypeKey].map(function (element, i) {
                  return (<span><a>{element.related_component_name}</a><br /></span>)
                })
                incomingElements.push(
                  <div className='m-accordion__item'>
                    <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href={'#m_accordion_2_item_1_body' + targetComponentTypeKey} aria-expanded='false'>
                      <span className='m-accordion__item-title'>{targetComponentTypeKey} {connectionKey} {incomingGroup[connectionKey][targetComponentTypeKey][0].component_name}</span>
                      <span className='m-accordion__item-mode' />
                    </div>
                    <div className='m-accordion__item-body collapse' id={'m_accordion_2_item_1_body' + targetComponentTypeKey} role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2' style={{}}>
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
      }
    }

    return (
      <div className={styles.borderline}>
        <div className={'row' + styles.description}>
          <i className={styles.iconcenter + ' fa fa-share'} />
          <div className='col-md-12'>
            <h2 className='col-md-6'>{componentTypeComponentName}</h2>
            {/* <div className='col-md-6'>
              <button type='button' onClick={openModal} id='m_login_signup' className={styles.buttonbg}>Add Connections</button>
            </div> */}
            <p className='col-md-12'>{componentTypeComponentDescription}</p>
          </div>
          {/* <div>
            <Modal isOpen={props.modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles} >
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
                      <form>
                        <div className='form-group m-form__group'>
                          <label htmlFor='exampleSelect1'>Choose Relationship Type</label>
                          <select className='form-control m-input' onBlur={handleFirstSelect} >{optionItems}</select>
                        </div>
                      </form>
                    </div>
                    <div className='modal-footer'>
                      <button type='button' id='m_login_signup' className={styles.buttonbg}>Add Connections</button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div> */}
        </div>
        <div className='row'>
          <div className='col-sm-6 col-md-6' >
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs nav-fill' role='tablist'>
                <li className='nav-item'>
                  <a className='nav-link active show' data-toggle='tab' data-target='#m_tabs_3_1' href='#m_tabs_3_1'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' data-target='#m_tabs_3_2' href='#m_tabs_3_2'>RelationShips</a>
                </li>
              </ul>
              <div className={styles.tabcontentborder}>
                <div className='tab-content'>
                  <div className='tab-pane active' id='m_tabs_3_1' role='tabpanel'>
                    <table className={'table ' + styles.borderless}>
                      {componentTypeComponentPropertiesList}
                    </table>
                  </div>
                  <div className='tab-pane' id='m_tabs_3_2' role='tabpanel'>
                    <div className='m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist'>
                      {parentComponentRelationshipList()}
                      {outgoingComponentRelationshipList()}
                      {incomingComponentRelationshipList()}
                      {childComponentRelationshipList()}
                    </div>
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
                  <ComponentModelComponent startNode={startNode} relationships={componentTypeComponentRelationships} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

ComponentTypeComponent.propTypes = {
  componentTypeComponentData: PropTypes.any,
  componentTypeComponentProperties: PropTypes.any
  // modalIsOpen: PropTypes.any
  // setModalOpenStatus: PropTypes.func,
  // componentTypeComponentRelationships: PropTypes.any
}
