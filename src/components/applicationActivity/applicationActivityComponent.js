import React from 'react'
import styles from './applicationActivityComponent.scss'
import PropTypes from 'prop-types'
import moment from 'moment'
// import _ from 'lodash'
import ReactHtmlParser from 'react-html-parser'
const liStyle = {
  margin: '0 0 6px 0'
}
export default function ApplicationActivity (props) {
  console.log('activity message props', props.activityMessages, props.notificationReceived, props)
  let activityMessages = props.activityMessages.resources ? props.activityMessages.resources : ''
  let activityMessagesList = ''
  let parseMessage = function (result) {
    let now = moment()
    activityMessagesList = result.map(function (messageGroup, index) {
      // console.log('------>messag ', index, messageGroup)
      // messageGroup = messageGroup.reverse()
      let contextIconlink = messageGroup[0].discussion.context.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + messageGroup[0].discussion.context.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/1'
      // console.log('context icon link', contextIconlink)
        let context = messageGroup[0].discussion.context.name
        let discussion = messageGroup[0].discussion.name
        let discussionId = messageGroup[0].discussion.id
        if (discussion === 'Default') {
          discussion = 'Event'
        }
        let description = messageGroup[0].discussion.context.description
        let contextHyperLink = 'javascript:void(0);'
        if (messageGroup[0].discussion.context.artefact_type.key === 'ComponentType') {
          contextHyperLink = '/component_types/' + messageGroup[0].discussion.context.id
        }
        if (messageGroup[0].discussion.context.artefact_type.key === 'Component') {
          contextHyperLink = '/components/' + messageGroup[0].discussion.context.id
        }
        let messageList = messageGroup.map(function (message, i) {
          // console.log('----------------> message', message)
          // let userIconlink = message.links.find(function (link) { return link.rel === 'author_avatar' })
          let userIconlink = message.author.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + message.author.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18'
          let messageContent = message.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
          .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
          let mentionArray = message.name.match(/\[(.*?)\]/g)
          if (mentionArray) {
            mentionArray.forEach(function (data, index) {
              data = data.substring(1, data.length - 1)
              let parts = data.toString().split(':')
              // eslint-disable-next-line
              // let str = `\\@\\[${data}\\]`
              // let reg = new RegExp(str, 'g')
              let match = '@[' + data + ']'
              if (parts[1] === 'Mention') {
                messageContent = messageContent.replace(match, '<a href="javascript:void(0);">@' + parts[0] + '</a>')
              } else if (parts[1] === 'Reference') {
                let msgContextHyperLink = 'javascript:void(0);'
                if (message.references.length > 0) {
                  message.references.forEach(function (reference, index) {
                    // console.log(reference)
                    let originalArtefactName = parts[0].replace(String.fromCharCode(8261), '[').replace(String.fromCharCode(8262), ']').replace(String.fromCharCode(8285), ':')
                    if (reference.name === originalArtefactName) {
                      if (reference.artefact_type.key === 'ComponentType') {
                        msgContextHyperLink = '/component_types/' + parts[2]
                      }
                      if (reference.artefact_type.key === 'Component') {
                        msgContextHyperLink = '/components/' + parts[2]
                      }
                    }
                  })
                }
                // console.log('reference data', parts, msgContextHyperLink)
                messageContent = messageContent.replace(match, `<a href="${msgContextHyperLink}" >#` + parts[0] + `</a>`)
                messageContent = messageContent.replace(String.fromCharCode(8261), '[').replace(String.fromCharCode(8262), ']').replace(String.fromCharCode(8285), ':')
              } else if (parts[1] === 'Tag') {
                messageContent = messageContent.replace(match, '#' + parts[0] + '')
              }
            })
          }
          let messageCreated = moment(message.created)
          let differenceInDays = now.diff(messageCreated, 'days')
          let messageTime = ''
          if (differenceInDays === 0) {
            messageTime = moment(message.created).fromNow()
          } else {
            messageTime = moment(message.created).format('DD MMM h:mA')
          }
          let timeContent = '<span class="pull-right">' + messageTime + '</span>'
          //  console.log(ReactHtmlParser(messageContent + timeContent))
          return (<li key={i}>
            <img src={userIconlink} alt={message.author.name} />{ReactHtmlParser('<span style="font-zise:10px">' + message.author.name + '</span>' + ':')} {ReactHtmlParser(messageContent + timeContent)}
            {props.notificationReceived && message.new && (<span className='m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger pull-right' />)}
          </li>)
        })
      let handleTitleClick = function (value) {
        let obj = {}
        obj.component = 'Activity Feed'
        obj.discussionId = value
        localStorage.setItem('clickFrom', JSON.stringify(obj))
        window.location.href = window.location.origin + contextHyperLink
      }
      return (
        <li key={index} style={liStyle} >
          <div className={styles.groupspace}>
            <img src={contextIconlink} alt={context} /><div className={styles.tooltip} style={{'fontSize': '14px'}} ><b><a onClick={(event) => { handleTitleClick(null) }} href='javascript:void(0);' >{context}</a></b><span className={styles.tooltiptext}>{description}</span></div>:&nbsp;<a onClick={(event) => { handleTitleClick(discussionId) }} href='javascript:void(0);'>{discussion}</a>
            <ul>
              {messageList}
            </ul>
          </div>
        </li>
      )
    })
  }
  if (activityMessages !== '') {
    let result = []
    let temp = []
    let equal
    for (var i = 0; i < activityMessages.length; i += 1) {
      if (activityMessages[i + 1]) {
        equal = ((activityMessages[i].discussion.context.id === activityMessages[i + 1].discussion.context.id) && (activityMessages[i].discussion.id === activityMessages[i + 1].discussion.id))
        if (equal) {
          temp.push(activityMessages[i])
        } else {
          // Not Equal
          temp.push(activityMessages[i])
          result.push(temp)
          temp = []
        }
      } else {
        // i is last
        temp.push(activityMessages[i])
        result.push(temp)
        // result = result.reverse()
        console.log('final result -------->', result)
        parseMessage(result)
      }
    }
  }

  return (
    <div className={styles.activityline}>
      {/* <h2>Activity Feed </h2> */}
      <ul>
        {activityMessagesList}
      </ul>
    </div>
  )
}
ApplicationActivity.propTypes = {
  activityMessages: PropTypes.any,
  notificationReceived: PropTypes.any
}
