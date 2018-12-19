import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ComponentModelComponent from '../componentModel/componentModelComponent'
import AsyncSelect from 'react-select/lib/Async'
var divStyle = {
    'overflowY': 'scroll',
    'overflowX': 'scroll',
    'border': '1px solid #000000'
}

export default function Explorer (props) {
  let searchTextBox = ''
  let userName = ''
  let email = ''
  let modelRelationshipData = props.filterSettings.modelRelationshipData
  let startNode = props.filterSettings.startNode
  let filterList = ''
  let componentRelationships = props.componentRelationships
  let componentOptions = []
  console.log(props, searchTextBox, userName, email)
  const loadOptions = (inputValue, callback) => {
    console.log('inputValue', inputValue)
    let payload = {
      'search': inputValue,
      'page_size': 10,
      'page': 1,
      'recommended': true
    }
    props.fetchComponents && props.fetchComponents(payload)
    setTimeout(() => {
      callback(componentOptions)
    }, 2000)
  }
  let handleInputChange = function (newValue: string) {
    const inputValue = newValue.replace(/\W/g, '')
    console.log('enter input change', inputValue)
    return inputValue
  }
  let handleCheckbox = function (value, data, index) {
    console.log('value:', value)
    console.log('data:', data)
    console.log(`index: ${index}`)
    let filterSettings = JSON.parse(JSON.stringify(props.filterSettings))
    data.isChecked = value
    filterSettings.filters[index] = data
    filterSettings.setRelationshipData = true
    props.setFilterSettings(filterSettings)
  }
  let handleComponentSelect = function (newValue: any, actionMeta: any) {
    if (actionMeta.action === 'select-option') {
      let payload = {
        'componentTypeComponentId': newValue.id
      }
      props.fetchcomponentTypeComponentRelationships && props.fetchcomponentTypeComponentRelationships(payload)
      let startNode = {}
      startNode.name = newValue.name
      startNode.title = newValue.name
      let filterSettings = {...props.filterSettings, 'selectedOption': newValue, 'modelRelationshipData': [], filters: [], 'startNode': startNode}
      props.setFilterSettings(filterSettings)
    }
    if (actionMeta.action === 'clear') {
      let filterSettings = {...props.filterSettings, 'selectedOption': null, 'modelRelationshipData': [], filters: [], 'startNode': {}}
      props.setFilterSettings(filterSettings)
    }
  }
  if (props.components && props.components !== '') {
    if (props.components.error_code === null) {
      componentOptions = props.components.resources.map(function (component, index) {
        component.value = component.id
        component.label = component.name
        return component
      })
    } else {}
  }
  if (componentRelationships !== '') {
    console.log(modelRelationshipData)
    // startNode.name = 'ABACUS Desktop Client v5.2'
    // startNode.title = 'ABACUS Desktop Client v5.2'
    if (componentRelationships.resources.length > 0) {
      var allGroup = _.chain(componentRelationships.resources)
      .groupBy('relationship_type')
      .mapValues(relationshipTypeGroup => _.groupBy(relationshipTypeGroup, targetComponentTypeGroup => targetComponentTypeGroup.target_component.component_type.name))
      .value()
      console.log('allGroup', allGroup)
    }
  }
  if (props.filterSettings.filters.length > 0) {
    filterList = props.filterSettings.filters.map(function (data, index) {
      return (<label key={index} htmlFor='filter' className=''>
        <input type='checkbox' checked={data.isChecked} onChange={(event) => { handleCheckbox(event.target.checked, data, index) }} className='' />{data.displayText + ' (' + data.data.length + ')'}
        <span className='m-list-search__result-item-text' />
      </label>)
    })
  }
    return (
      <div>
        <div id='tasksList'>
          {/* The table structure begins */}
          <div className='row' style={{'marginTop': '20px'}}>
            <div className='col-md-12'>
              <div className='m-portlet'>
                <div className='m-portlet__body'>
                  <div id='m_table_1_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                    <div className='row' style={{'marginBottom': '20px'}}>
                      <div className='col-sm-12 col-md-6'>
                        <div className='' id='m_table_1_length' style={{'display': 'flex'}}>
                          <h5 style={{'margin': '8px'}}>Select</h5>
                          {/* <Select
                            className='col-7 input-sm m-input'
                            placeholder='Enter Component Name'
                            isClearable
                            // defaultValue={dvalue}
                            // value={props.userActionSettings.selectedUser}
                            onChange={handleComponentSelect}
                            isSearchable
                            name={'component'}
                            options={componentOptions}
                          /> */}
                          <AsyncSelect
                            isClearable
                            className='col-7 input-sm m-input'
                            placeholder='Enter Component Name'
                            // cacheOptions
                            loadOptions={loadOptions}
                            onChange={handleComponentSelect}
                            defaultOptions
                            onInputChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className='row' style={{position: 'relative', overflow: 'auto', width: '100%'}}>
                    <div className='col-md-9 col-sm-12'>
                      <div style={divStyle}>
                        <ComponentModelComponent startNode={startNode} relationships={modelRelationshipData} />
                      </div>
                    </div>
                    <div className='col-md-3 col-sm-12'>
                      <div className='m-demo'>
                        <div className='m-demo__preview'>
                          <div className='m-list-search'>
                            <div className='m-list-search__results'>
                              <span className='m-list-search__result-category m-list-search__result-category--first'>Filter</span>
                              {/* <div className='m-list-search__result-item'>
                                <div className='m-checkbox-list'>
                                  <label role='checkbox' aria-checked='false' htmlFor='filter' className='m-checkbox' onClick={alert('hi')} onKeyDown={alert('hi')}>
                                    <input type='checkbox' className='' />Annual finance report
                                    <span className='m-list-search__result-item-text' />
                                  </label>
                                  <label htmlFor='filter' className='m-checkbox'>
                                    <input type='checkbox' className='' />Annual finance report
                                    <span className='m-list-search__result-item-text' />
                                  </label>
                                  <label htmlFor='filter' className='m-checkbox'>
                                    <input type='checkbox' className='' />Annual finance report
                                    <span className='m-list-search__result-item-text' />
                                  </label>
                                </div>
                              </div> */}
                              <div className='m-list-search__result-item'>
                                {filterList}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }
Explorer.propTypes = {
  components: PropTypes.any,
  filterSettings: PropTypes.any,
  componentRelationships: PropTypes.any
}
