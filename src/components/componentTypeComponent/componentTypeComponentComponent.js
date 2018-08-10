import React from 'react'
import styles from './componentTypeComponentComponent.scss'
import PropTypes from 'prop-types'
import relationshipData from './mockData'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
var divStyle = {
  width: '95%',
  height: '30%',
  'overflow-y': 'scroll',
  'overflow-x': 'scroll',
  'border': '1px solid #000000'
}

export default function ComponentTypeComponent (props) {
    let componentTypeComponentName
    let componentTypeComponentDescription
    let componentTypeComponentProperties = props.componentTypeComponentProperties.data
    let componentTypeComponentPropertiesList
    let componentTypeComponentRelName
    let componentTypeComponentChildName
    let componentTypeComponentRelationshipsList
    let componentTypeComponentRelationships = relationshipData.resources // props.componentTypeComponentRelationships.data
    let parentComponentRelationshipList
    let outgoingComponentRelationshipList
    let incomingComponentRelationshipList
    let childComponentRelationshipList

    console.log('name', componentTypeComponentRelName)
    console.log('name', componentTypeComponentChildName)
    console.log('name', componentTypeComponentRelationshipsList)

    if (props.componentTypeComponentData !== '') {
      componentTypeComponentName = props.componentTypeComponentData.resources[0].name
      componentTypeComponentDescription = props.componentTypeComponentData.resources[0].description
    }

    if (typeof componentTypeComponentProperties !== 'undefined') {
      componentTypeComponentPropertiesList = componentTypeComponentProperties.map(function (properties, index) {
        return (
          <tr key={index}>
            <td><p className={styles.labelbold}>{properties.resource.name}</p></td>
            <td><p>{properties.resource.value}</p></td>
          </tr>
        )
      })
    }
    if (props.componentTypeComponentData !== '') {
      componentTypeComponentRelName = props.componentTypeComponentData.resources[0].component_type_name
      componentTypeComponentChildName = props.componentTypeComponentData.resources[0].name
    }

    if (typeof componentTypeComponentRelationships !== 'undefined') {
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
              <span className='m-accordion__item-title'>{parent[0].component_name} {parent[0].constraint_type} {'Components'}</span>
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
          <div>
            <h2>{componentTypeComponentName}</h2>
            <p>{componentTypeComponentDescription}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6 col-md-6' >
            <div className={styles.tabsprops}>
              <ul className='nav nav-tabs nav-fill' role='tablist'>
                <li className='nav-item'>
                  <a className='nav-link active show' data-toggle='tab' href='#m_tabs_3_1'>Properties</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#m_tabs_3_2'>RelationShips</a>
                </li>
              </ul>
              <div className={styles.tabcontentborder}>
                <div className='tab-content'>
                  <div className='tab-pane active' id='m_tabs_3_1' role='tabpanel'>
                    {/* <ul>
                      {componentTypeComponentPropertiesList}
                    </ul> */}
                    <table className={'table ' + styles.borderless}>
                      <tbody>
                        {componentTypeComponentPropertiesList}
                      </tbody>
                    </table>
                  </div>
                  <div className='tab-pane' id='m_tabs_3_2' role='tabpanel'>
                    <div className='m-accordion m-accordion--bordered' id='m_accordion_2' role='tablist'>
                      {/* <div className='m-accordion__item'>
                        <div className='m-accordion__item-head collapsed' role='tab' id='m_accordion_2_item_1_head' data-toggle='collapse' href='#m_accordion_2_item_1_body' aria-expanded='false'>
                          <span className='m-accordion__item-title'>IVR</span>
                          <span className='m-accordion__item-mode' />
                        </div>
                        <div className='m-accordion__item-body collapse' id='m_accordion_2_item_1_body' role='tabpanel' aria-labelledby='m_accordion_2_item_1_head' data-parent='#m_accordion_2' style={{}}>
                          <div className='m-accordion__item-content'>
                            {componentTypeComponentRelationshipsList}
                          </div>
                        </div>
                      </div> */}
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
              {/* <img alt='model' src='https://via.placeholder.com/450x250?text=Model%20Visualization' /> */}
              <div className='row'>
                <div id='divPaperWrapper' style={divStyle}>
                  <ComponentModelComponent relationships={componentTypeComponentRelationships} />
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
  // componentTypeComponentRelationships: PropTypes.any
}
