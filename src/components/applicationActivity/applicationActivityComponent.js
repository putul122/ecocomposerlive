import React from 'react'
import styles from './applicationActivityComponent.scss'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import ReactHtmlParser from 'react-html-parser'
// import messageData from './GetMessages'
export default function ApplicationActivity (props) {
  console.log('activity message props', props.activityMessages, props)
  let activityMessages = props.activityMessages.resources ? props.activityMessages.resources : ''
  let activityMessagesList = ''
  // if (activityMessages !== '') {
  //   activityMessagesList = activityMessages.map(function (messageGroup, index) {
  //     // let contextIconlink = messageGroup.links.find(function (link) { return link.rel === 'context_icon' })
  //     let contextIconlink = 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-resources/icons/6'
  //     let context = messageGroup.discussion.context.name
  //     let discussion = messageGroup.discussion.name
  //     // let messageList = messageGroup.map(function (message, i) {
  //     // let userIconlink = messageGroup.links.find(function (link) { return link.rel === 'author_avatar' })
  //     let userIconlink = 'https://ecocomposermockapis.azurewebsites.net/ecocomposer-resources/icons/10'
  //     let messageContent = messageGroup.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
  //     .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
  //     .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
  //     .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
  //       // return (<li><img src={userIconlink.href} alt={message.user} />{ReactHtmlParser(messageContent)}</li>)
  //     // })
  //     return (
  //       <li key={index} >
  //         <div className={styles.groupspace}>
  //           <img src={contextIconlink} alt={context} /><div className={styles.tooltip}><a href=''>{context}</a><span className={styles.tooltiptext}>{discussion}</span></div>::<a href='javascript:void(0);'>{discussion}</a>
  //           <ul>
  //             <li><img src={userIconlink} alt={messageGroup.author.name} />{ReactHtmlParser(messageContent)}</li>
  //           </ul>
  //         </div>
  //       </li>
  //     )
  //   })
  // }

  if (activityMessages !== '') {
    let result = []
    let temp = []
    let equal
    for (var i = 0; i < activityMessages.length; i += 1) {
        if (equal !== ((activityMessages[i] && activityMessages[i + 1] && activityMessages[i].discussion.context.name === activityMessages[i + 1].discussion.context.name) && (activityMessages[i] && activityMessages[i + 1] && activityMessages[i].discussion.name === activityMessages[i + 1].discussion.name))) {
          if (activityMessages[i + 1]) {
            if (equal !== undefined && !equal) {
                result.push(temp)
                temp = []
            }
            if (i + 1 < activityMessages.length) {
              equal = (activityMessages[i].discussion.context.name === activityMessages[i + 1].discussion.context.name && activityMessages[i].discussion.name === activityMessages[i + 1].discussion.name)
            }
          } else {}
        }
        if (i + 1 < activityMessages.length) {
          temp.push(activityMessages[i])
      } else {
        if (equal) {
          temp.push(activityMessages[i])
        } else {
          result.push(temp)
          temp = []
          result.push(activityMessages[i])
        }
      }

      if (i + 1 === activityMessages.length) {
        if (temp.length) {
          result.push(temp)
        }
        if (result.length > 0) {
          // console.log('------>messag full', result)
          activityMessagesList = result.map(function (messageGroup, index) {
            // console.log('------>messag ', index, messageGroup)
            let contextIconlink = messageGroup[0].discussion.context.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + messageGroup[0].discussion.context.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/1'
            console.log('context icon link', contextIconlink)
            //   // let contextIconlink = messageGroup[0].links.find(function (link) { console.log(link); return link.rel === 'context_icon' })
          //   console.log(contextIconlink)
              let context = messageGroup[0].discussion.context.name
              let discussion = messageGroup[0].discussion.name
              let description = messageGroup[0].discussion.context.description
              let messageList = messageGroup.map(function (message, i) {
                // let userIconlink = message.links.find(function (link) { return link.rel === 'author_avatar' })
                let userIconlink = message.author.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + message.author.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18'
                let messageContent = message.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
                .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
                .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
                .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
                return (<li><img src={userIconlink} alt={message.author.name} />{ReactHtmlParser(messageContent)}</li>)
              })
            return (
              <li key={index} >
                <div className={styles.groupspace}>
                  <img src={contextIconlink} alt={context} /><div className={styles.tooltip}><a href='javascript:void(0);'>{context}</a><span className={styles.tooltiptext}>{description}</span></div>::<a href='javascript:void(0);'>{discussion}</a>
                  <ul>
                    {messageList}
                  </ul>
                </div>
              </li>
            )
          })
        }
      }
    }
  }

  return (
    <div className={styles.activityline}>
      <h2>Activity Feed </h2>
      <ul>
        {activityMessagesList}
      </ul>
    </div>
  )
}
ApplicationActivity.propTypes = {
  activityMessages: PropTypes.any
}
