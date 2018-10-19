import React from 'react'
import PropTypes from 'prop-types'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle.js'
import defaultMentionStyle from './defaultMentionStyle.js'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

export default function NewDiscussion (props) {
  console.log('props new discussion', props, props.isDiscussionModalOpen)
  let NameInputBox
  let closeDiscussionModal = function (event) {
    props.setDiscussionModalOpenStatus(false)
  }
  let handleChange = function (event) {
    let str = event.target.value
    let matches = str.match(/[^@!a-z$]\$[a-z]+/gi)
    let tags = []
    if (matches !== null) {
      matches.forEach(function (data, index) {
        let obj = {}
        obj.id = ++index
        obj.display = data.trim().substring(1, data.trim().length)
        tags.push(obj)
      })
    } else {
      tags.push({id: 1, display: '...'})
    }
    let payload = {}
    payload.message = str
    payload.tags = tags
    props.setMessageData(payload)
  }
  let createDiscussion = function (event) {
    let payload = {}
    payload.name = NameInputBox.value
    payload.context = {
          'artefact_type': {
          'key': props.type
          },
          'id': props.contextId
         }
    payload.discussion_type = {
        'key': 'User'
        }
    let message = props.newMessage
    let mentionArray = message.match(/\[(.*?)\]/g)
    let messagePayload = []
    let dataPayload = {}
    let mentions = []
    let references = []
    let tags = []
    if (mentionArray) {
      mentionArray.forEach(function (data, index) {
        data = data.substring(1, data.length - 1)
        let parts = data.toString().split(':')
        if (parts[1] === 'Mention') {
          let obj = {
            'artefact_type': {
              'key': 'User'
            },
            'id': parseInt(parts[2])
          }
          mentions.push(obj)
        } else if (parts[1] === 'Reference') {
          let obj = {
            'artefact_type': {
              'key': 'Component'
            },
            'id': parseInt(parts[2])
          }
          references.push(obj)
        } else if (parts[1] === 'Tag') {
          tags.push(parts[0])
        }
      })
    }
    dataPayload.name = message
    dataPayload.mentions = mentions
    dataPayload.references = references
    dataPayload.tags = tags
    messagePayload.push(dataPayload)
    payload.messages = messagePayload
    console.log(payload)
    props.createDiscussion && props.createDiscussion(payload)
    props.setDiscussionModalOpenStatus(false)
    let resetPayload = {}
    resetPayload.message = ''
    resetPayload.formattedTags = [{id: 1, display: '...'}]
    props.setMessageData(resetPayload)
  }
return (
  <div>
    <ReactModal isOpen={props.isDiscussionModalOpen}
      onRequestClose={closeDiscussionModal}
      className='modal-dialog modal-lg'
      style={{'content': {'top': '20%'}}}>
      <div className=''>
        <div >
          <div className='modal-content'>
            <div className='modal-header'>
              <h6>New Discussion</h6>
              <button type='button' onClick={closeDiscussionModal} className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              {/* <TextArea /> */}
              <form>
                <div className='form-group'>
                  <label htmlFor='component-name' className='form-control-label'>Subject:</label>
                  <input type='text' className='form-control' ref={input => (NameInputBox = input)} id='component-name' autoComplete='off' required />
                </div>
                <div className='form-group'>
                  <MentionsInput value={props.newMessage} placeholder={'for mentions use \'@\', for references use \'#\' and for tags use \'$\''} onChange={handleChange} markup='@[__display__:__type__:__id__]' style={defaultStyle}>
                    <Mention
                      type='Mention'
                      trigger='@'
                      data={props.formattedAccounts}
                      style={defaultMentionStyle}
                    />
                    <Mention
                      type='Reference'
                      trigger='#'
                      data={props.formattedModels}
                      style={defaultMentionStyle}
                    />
                    <Mention
                      type='Tag'
                      trigger='$'
                      data={props.formattedTags}
                      style={defaultMentionStyle}
                    />
                  </MentionsInput>
                </div>
              </form>
              {/* <TextInput onRequestOptions={handleRequestOptions} options={options} >{usersList}</TextInput> */}
            </div>
            <div className='modal-footer'>
              <button type='button' onClick={createDiscussion} id='m_login_signup' className='btn btn-outline-info btn-sm m-btn m-btn--custom'>Add Discussion</button>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  </div>
  )
}
NewDiscussion.propTypes = {
  type: PropTypes.any,
  isDiscussionModalOpen: PropTypes.any,
  formattedAccounts: PropTypes.any,
  formattedModels: PropTypes.any,
  formattedTags: PropTypes.any,
  newMessage: PropTypes.any,
  createDiscussion: PropTypes.func,
  setDiscussionModalOpenStatus: PropTypes.func,
  setMessageData: PropTypes.func,
  contextId: PropTypes.any
}
