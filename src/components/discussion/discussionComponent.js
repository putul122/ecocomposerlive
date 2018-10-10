import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

export default function Discussion (props) {
  console.log('Discussion Components', props)
  let discussionList = ''
  let getMessages = function (data) {
    console.log(data)
    let payload = {
      id: data.id
    }
    props.setDiscussionId(data.id)
    props.fetchDiscussionMessages && props.fetchDiscussionMessages(payload)
  }
  let openSlide = function (event) {
    props.setQuickslideDiscussion('m-quick-sidebar--on')
  }
  let closeSlide = function (event) {
    props.setQuickslideDiscussion('m-quick-sidebar--off')
  }
  if (props.discussions && props.discussions !== '') {
    if (props.discussions.resources.length > 0) {
      discussionList = props.discussions.resources.map(function (data, index) {
        return (
          <div className='m-accordion__item'>
            <a className='m-accordion__item-head collapsed' onClick={() => getMessages(data)} role='tab' id={'m_accordion_7_item_1_head' + index} data-toggle='collapse' href={'#m_accordion_7_item_1_body' + index} aria-expanded='false'>
              {/* <span className='m-accordion__item-icon'><i className='fa flaticon-user-ok' /></span> */}
              <span className='m-accordion__item-title'>{data.name}</span>
              <span className='m-accordion__item-mode' />
            </a>
            <div className='m-accordion__item-body collapse' id={'m_accordion_7_item_1_body' + index} role='tabpanel' aria-labelledby={'m_accordion_7_item_1_head' + index} data-parent='#m_accordion_7'>
              <div className='m-accordion__item-content' />
            </div>
          </div>
        )
      })
    }
  }
  if (props.discussionMessages && props.discussionMessages !== '') {
    console.log(props.discussionId)
    discussionList = props.discussions.resources.map(function (data, index) {
      let childElement = ''
      if (props.discussionId === data.id) {
        childElement = props.discussionMessages.resources.map(function (cdata, cindex) {
          let userIconlink = cdata.author.icon ? 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/' + cdata.author.icon : 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18'
          let messageContent = cdata.name.replace(/<m ix=0>/g, '<a href="javascript:void(0);">@').replace(/<\/m>/g, '</a>')
          .replace(/<r ix=0>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<r ix=1>/g, '<a href="javascript:void(0);">#').replace(/<\/r>/g, '</a>')
          .replace(/<t>/g, ' #').replace(/<\/t>/g, '')
          return (<li><img src={userIconlink} alt={cdata.author.name} />{ReactHtmlParser(messageContent)}<span className='pull-right' style={{cursor: 'pointer'}}><i className='fa fa-reply' /></span></li>)
        })
      }
      return (
        <div className='m-accordion__item'>
          <a className='m-accordion__item-head collapsed' onClick={() => getMessages(data)} role='tab' id={'m_accordion_7_item_1_head' + index} data-toggle='collapse' href={'#m_accordion_7_item_1_body' + index} aria-expanded='false'>
            {/* <span className='m-accordion__item-icon'><i className='fa flaticon-user-ok' /></span> */}
            <span className='m-accordion__item-title'>{data.name}</span>
            <span className='m-accordion__item-mode' />
          </a>
          <div className='m-accordion__item-body collapse' id={'m_accordion_7_item_1_body' + index} role='tabpanel' aria-labelledby={'m_accordion_7_item_1_head' + index} data-parent='#m_accordion_7'>
            <div className='m-accordion__item-content' >
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <br />
                <div className='m-messenger__form'>
                  <div className='m-messenger__form-controls'>
                    <input type='text' name='' placeholder='New Messages' className='m-messenger__form-input' />
                  </div>
                  <div className='m-messenger__form-tools'>
                    <a href='javascript:void(0);' className='btn btn-sm btn-metal'>Reply</a>
                  </div>
                </div>
                <div className='m-messenger__seperator' />
                <ul>
                  {childElement}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div>
      <div id='m_quick_sidebar' className={'m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light ' + props.discussionSlide} >
        <div className='m-quick-sidebar__content'>
          <span id='m_quick_sidebar_close' className='m-quick-sidebar__close'><a href='javascript:void(0);' onClick={closeSlide} ><i className='la la-close' /></a></span>
          <ul id='m_quick_sidebar_tabs' className='nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand' role='tablist'>
            <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link active show' data-toggle='tab' href='#m_quick_sidebar_tabs_messenger' role='tab' aria-selected='false'>Discussions</a>
            </li>
            <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link' data-toggle='tab' href='#m_quick_sidebar_tabs_logs' role='tab' aria-selected='false'>Activity</a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active show' id='m_quick_sidebar_tabs_messenger' role='tabpanel'>
              <div className='m-accordion m-accordion--default m-accordion--solid m-accordion--section  m-accordion--toggle-arrow' id='m_accordion_7' role='tablist'>
                {discussionList}
              </div>
              {/* <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <div className='m-messenger__messages m-scrollable m-scroller ps ps--active-y' style={{height: '342px', overflow: 'hidden'}}>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--in'>
                      <div className='m-messenger__message-pic'>
                        <img src='./assets/app/media/img//users/user3.jpg' alt='' />
                      </div>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-username'>
											Megan wrote
										</div>
                          <div className='m-messenger__message-text'>
											Hi Bob. What time will be the meeting ?
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--out'>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-text'>
											Hi Megan. It's at 2.30PM
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--in'>
                      <div className='m-messenger__message-pic'>
                        <img src='./assets/app/media/img//users/user3.jpg' alt='' />
                      </div>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-username'>
											Megan wrote
										</div>
                          <div className='m-messenger__message-text'>
											Will the development team be joining ?
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--out'>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-text'>
											Yes sure. I invited them as well
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__datetime'>2:30PM</div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--in'>
                      <div className='m-messenger__message-pic'>
                        <img src='./assets/app/media/img//users/user3.jpg' alt='' />
                      </div>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-username'>
											Megan wrote
										</div>
                          <div className='m-messenger__message-text'>
											Noted. For the Coca-Cola Mobile App project as well ?
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--out'>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-text'>
											Yes, sure.
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--out'>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-text'>
											Please also prepare the quotation for the Loop CRM project as well.
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__datetime'>3:15PM</div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--in'>
                      <div className='m-messenger__message-no-pic m--bg-fill-danger'>
                        <span>M</span>
                      </div>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-username'>
											Megan wrote
										</div>
                          <div className='m-messenger__message-text'>
											Noted. I will prepare it.
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--out'>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-text'>
											Thanks Megan. I will see you later.
										</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--in'>
                      <div className='m-messenger__message-pic'>
                        <img src='./assets/app/media/img//users/user3.jpg' alt='' />
                      </div>
                      <div className='m-messenger__message-body'>
                        <div className='m-messenger__message-arrow' />
                        <div className='m-messenger__message-content'>
                          <div className='m-messenger__message-username'>
											Megan wrote
										</div>
                          <div className='m-messenger__message-text'>
											Sure. See you in the meeting soon.
										</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='m-messenger__seperator' />

                  <div className='m-messenger__form'>
                    <div className='m-messenger__form-controls'>
                      <input type='text' name='' placeholder='Type here...' className='m-messenger__form-input' />
                    </div>
                    <div className='m-messenger__form-tools'>
                      <a href='' className='m-messenger__form-attachment'>
                        <i className='la la-paperclip' />
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className='tab-pane' id='m_quick_sidebar_tabs_logs' role='tabpanel'>
              <div className='m-list-timeline m-scrollable m-scroller ps' style={{height: '452px', overflow: 'hidden'}}>
                <div className='m-list-timeline__group'>
                  <div className='m-list-timeline__heading'>
                      System Logs
                    </div>
                  <div className='m-list-timeline__items'>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>12 new users registered <span className='m-badge m-badge--warning m-badge--wide'>important</span></a>
                      <span className='m-list-timeline__time'>Just now</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>System shutdown</a>
                      <span className='m-list-timeline__time'>11 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-danger' />
                      <a href='' className='m-list-timeline__text'>New invoice received</a>
                      <span className='m-list-timeline__time'>20 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-warning' />
                      <a href='' className='m-list-timeline__text'>Database overloaded 89% <span className='m-badge m-badge--success m-badge--wide'>resolved</span></a>
                      <span className='m-list-timeline__time'>1 hr</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>System error</a>
                      <span className='m-list-timeline__time'>2 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>Production server down <span className='m-badge m-badge--danger m-badge--wide'>pending</span></a>
                      <span className='m-list-timeline__time'>3 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>Production server up</a>
                      <span className='m-list-timeline__time'>5 hrs</span>
                    </div>
                  </div>
                </div>
                <div className='m-list-timeline__group'>
                  <div className='m-list-timeline__heading'>
                      Applications Logs
                    </div>
                  <div className='m-list-timeline__items'>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>New order received <span className='m-badge m-badge--info m-badge--wide'>urgent</span></a>
                      <span className='m-list-timeline__time'>7 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>12 new users registered</a>
                      <span className='m-list-timeline__time'>Just now</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>System shutdown</a>
                      <span className='m-list-timeline__time'>11 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-danger' />
                      <a href='' className='m-list-timeline__text'>New invoices received</a>
                      <span className='m-list-timeline__time'>20 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-warning' />
                      <a href='' className='m-list-timeline__text'>Database overloaded 89%</a>
                      <span className='m-list-timeline__time'>1 hr</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>System error <span className='m-badge m-badge--info m-badge--wide'>pending</span></a>
                      <span className='m-list-timeline__time'>2 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>Production server down</a>
                      <span className='m-list-timeline__time'>3 hrs</span>
                    </div>
                  </div>
                </div>
                <div className='m-list-timeline__group'>
                  <div className='m-list-timeline__heading'>
                      Server Logs
                    </div>
                  <div className='m-list-timeline__items'>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>Production server up</a>
                      <span className='m-list-timeline__time'>5 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>New order received</a>
                      <span className='m-list-timeline__time'>7 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>12 new users registered</a>
                      <span className='m-list-timeline__time'>Just now</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>System shutdown</a>
                      <span className='m-list-timeline__time'>11 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-danger' />
                      <a href='' className='m-list-timeline__text'>New invoice received</a>
                      <span className='m-list-timeline__time'>20 mins</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-warning' />
                      <a href='' className='m-list-timeline__text'>Database overloaded 89%</a>
                      <span className='m-list-timeline__time'>1 hr</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>System error</a>
                      <span className='m-list-timeline__time'>2 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>Production server down</a>
                      <span className='m-list-timeline__time'>3 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-success' />
                      <a href='' className='m-list-timeline__text'>Production server up</a>
                      <span className='m-list-timeline__time'>5 hrs</span>
                    </div>
                    <div className='m-list-timeline__item'>
                      <span className='m-list-timeline__badge m-list-timeline__badge--state-info' />
                      <a href='' className='m-list-timeline__text'>New order received</a>
                      <span className='m-list-timeline__time'>1117 hrs</span>
                    </div>
                  </div>
                </div>
                <div className='ps__rail-x' style={{left: '0px', bottom: '0px'}}><div className='ps__thumb-x' style={{left: '0px', width: '0px'}} /></div>
                <div className='ps__rail-y' style={{top: '0px', right: '4px'}}><div className='ps__thumb-y' style={{top: '0px', height: '0px'}} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className='m-nav-sticky' style={{'marginTop': '30px'}}>
        <li className='m-nav-sticky__item' data-toggle='m-tooltip' title='' data-placement='left' data-original-title='Layout Builder'>
          <a href='javsscript:void(0);' onClick={openSlide}><i className='la la-angle-double-left' /></a>
        </li>
      </ul>
    </div>
  )
}
Discussion.propTypes = {
  discussionSlide: PropTypes.any,
  discussions: PropTypes.any,
  discussionMessages: PropTypes.any,
  discussionId: PropTypes.any
}
