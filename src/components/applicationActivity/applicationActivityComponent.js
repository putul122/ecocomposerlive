import React from 'react'
import styles from './applicationActivityComponent.scss'
import PropTypes from 'prop-types'
// import _ from 'lodash'
// import ReactHtmlParser from 'react-html-parser'
// import messageData from './GetMessages'
export default function ApplicationActivity (props) {
  console.log('activity message props', props.activityMessages, props)
  let activityMessages = props.activityMessages
  let activityMessagesList = ''
  if (activityMessages !== '') {
    // activityMessagesList = activityMessages.resources.map(function (messageGroup, index) {
    //   let contextIconlink = messageGroup.links.find(function (link) { return link.rel === 'context_icon' })
    //   let context = messageGroup.context_name
    //   let discussion = messageGroup.discussion_name
    //   // let messageList = messageGroup.map(function (message, i) {
    //   let userIconlink = messageGroup.links.find(function (link) { return link.rel === 'author_avatar' })
    //   let messageContent = messageGroup.name.replace(/<m i=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
    //   .replace(/<r i=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
    //   .replace(/<r i=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
    //   .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
    //     // return (<li><img src={userIconlink.href} alt={message.user} />{ReactHtmlParser(messageContent)}</li>)
    //   // })
    //   return (
    //     <li key={index} >
    //       <div className={styles.groupspace}>
    //         <img src={contextIconlink ? contextIconlink.href : ''} alt={context} /><div className={styles.tooltip}><a href=''>{context}</a><span className={styles.tooltiptext}>{discussion}</span></div>::<a href='javascript:void(0);'>{discussion}</a>
    //         <ul>
    //           <li><img src={userIconlink.href} alt={messageGroup.author_name} />{ReactHtmlParser(messageContent)}</li>
    //         </ul>
    //       </div>
    //     </li>
    //   )
    // })
  }

  // if (activityMessages !== '') {
  //   let result = []
  //   let temp = []
  //   let equal
  //   for (var i = 0; i < activityMessages.length; i += 1) {
  //       if (equal !== ((activityMessages[i] && activityMessages[i + 1] && activityMessages[i].context === activityMessages[i + 1].context) && (activityMessages[i] && activityMessages[i + 1] && activityMessages[i].discussion_name === activityMessages[i + 1].discussion_name))) {
  //         if (activityMessages[i + 1]) {
  //           if (equal !== undefined && !equal) {
  //               result.push(temp)
  //               temp = []
  //           }
  //           if (i + 1 < activityMessages.length) {
  //             equal = (activityMessages[i].context === activityMessages[i + 1].context && activityMessages[i].discussion_name === activityMessages[i + 1].discussion_name)
  //           }
  //         } else {}
  //       }
  //       if (i + 1 < activityMessages.length) {
  //         temp.push(activityMessages[i])
  //     } else {
  //       if (equal) {
  //         temp.push(activityMessages[i])
  //       } else {
  //         result.push(temp)
  //         temp = []
  //         result.push(activityMessages[i])
  //       }
  //     }

  //     if (i + 1 === activityMessages.length) {
  //       if (temp.length) {
  //         result.push(temp)
  //       }
  //       if (result.length > 0) {
  //         activityMessagesList = result.map(function (messageGroup, index) {
  //           console.log('------>messag ', index, messageGroup)
  //           let contextIconlink = messageGroup[0].links.find(function (link) { console.log(link); return link.rel === 'context_icon' })
  //           console.log(contextIconlink)
  //           // let context = messageGroup[0].context_name
  //           // let discussion = messageGroup[0].discussion_name
  //           // let messageList = messageGroup.map(function (message, i) {
  //           //   let userIconlink = message.links.find(function (link) { return link.rel === 'author_avatar' })
  //           //   let messageContent = message.name.replace(/reference/g, 'a').replace(/mention/g, 'a').replace(/ix=0/g, 'href=\'\'').replace(/ix=1/g, 'href=\'\'')
  //           //   return (<li><img src={userIconlink.href} alt={message.user} />{ReactHtmlParser(messageContent)}</li>)
  //           // })
  //           // return (
  //           //   <li key={index} >
  //           //     <div className={styles.groupspace}>
  //           //       <img src={contextIconlink ? contextIconlink.href : ''} alt={context} /><div className={styles.tooltip}><a href=''>{context}</a><span className={styles.tooltiptext}>{discussion}</span></div>::<a href='javascript:void(0);'>{discussion}</a>
  //           //       <ul>
  //           //         {messageList}
  //           //       </ul>
  //           //     </div>
  //           //   </li>
  //           // )
  //         })
  //       }
  //     }
  //   }
  // }

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
