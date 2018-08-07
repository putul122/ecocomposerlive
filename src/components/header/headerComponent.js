import React from 'react'
import PropTypes from 'prop-types'
import ApplicationActivity from '../../containers/applicationActivity/applicationActivityContainer'
import { Redirect } from 'react-router-dom'

export default function HeaderComponent (props) {
  let isQuickSlideOpen = props.isQuickSlideOpen
  let quickSlideClass = 'm-quick-sidebar--off'
  let isLoginSlideOpen = props.isLoginSlideOpen
  let loginSlideClass = 'm-dropdown--close'
  console.log('header props----------------------------', props)
  // console.log('isLoginSlideOpen', isLoginSlideOpen)

  if (isQuickSlideOpen) {
    quickSlideClass = 'm-quick-sidebar--on'
  } else {
    quickSlideClass = 'm-quick-sidebar--off'
  }
  let openQuickSlide = function (event) {
    event.preventDefault()
    console.log(' open quick', props)
    quickSlideClass = 'm-quick-sidebar--on'
    props.setQuickslideFlag(true)
  }

  let closeQuickSlide = function (event) {
    event.preventDefault()
    console.log(' close quick', props)
    quickSlideClass = 'm-quick-sidebar--off'
    props.setQuickslideFlag(false)
  }

  if (isLoginSlideOpen) {
    loginSlideClass = 'm-dropdown--open'
  } else {
    loginSlideClass = ''
  }
  let openLoginSlide = function (event) {
    // alert('HIII')
    event.preventDefault()
    console.log(' open login', props)
    loginSlideClass = 'm-dropdown--open'
    props.setLoginslideFlag(true)
  }
  let logOut = function (event) {
    event.preventDefault()
    console.log('log out')
    localStorage.clear()
    return (
      <Redirect to='/' push />
    )
  }

  let closeLoginSlide = function (event) {
    event.preventDefault()
    console.log(' close login', props)
    loginSlideClass = 'm-dropdown--close'
    props.setLoginslideFlag(false)
  }
  return (
    <div>
      <header id='m_header' className='m-grid__item    m-header ' m-minimize-offset='200' m-minimize-mobile-offset='200' >
        <div className='m-container m-container--fluid m-container--full-height'>
          <div className='m-stack m-stack--ver m-stack--desktop'>
            {/* <!-- BEGIN: Brand --> */}
            <div className='m-stack__item m-brand '>
              <div className='m-stack m-stack--ver m-stack--general'>
                <div className='m-stack__item m-stack__item--middle m-brand__logo'>
                  <a href='index.html' className=''>
                    <img alt='' src='/assets/ECO Conductor.png' width='60px' height='60px' />
                  </a>
                </div>
                <div className='m-stack__item m-stack__item--middle m-brand__tools'>

                  {/* <!-- BEGIN: Responsive Aside Left Menu Toggler --> */}
                  <a href='javascript:;' id='m_aside_left_offcanvas_toggle' className='m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block'>
                    <span />
                  </a>
                  {/* <!-- END --> */}

                  {/* <!-- BEGIN: Responsive Header Menu Toggler --> */}
                  <a id='m_aside_header_menu_mobile_toggle' href='javascript:;' className='m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block'>
                    <span />
                  </a>
                  {/* <!-- END --> */}

                  {/* <!-- BEGIN: Topbar Toggler --> */}
                  <a id='m_aside_header_topbar_mobile_toggle' href='javascript:;' className='m-brand__icon m--visible-tablet-and-mobile-inline-block'>
                    <i className='flaticon-more' />
                  </a>
                  {/* <!-- BEGIN: Topbar Toggler --> */}
                </div>
              </div>
            </div>
            {/* <!-- END: Brand --> */}
            <div className='m-stack__item m-stack__item--fluid m-header-head' id='m_header_nav'>
              {/* <!-- BEGIN: Topbar --> */}
              { props.isLoggedin && (<div id='m_header_topbar' className='m-topbar  m-stack m-stack--ver m-stack--general'>
                <div className='m-stack__item m-topbar__nav-wrapper'>
                  <ul className='m-topbar__nav m-nav m-nav--inline'>
                    <li className='m-nav__item m-topbar__notifications m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--open' id='search-container' >
                      <a href='' className='m-nav__link m-dropdown__toggle' onClick={openQuickSlide} id='m_topbar_notification_icon'>
                        <span className='m-nav__link-icon m-topbar__usericon'>
                          <span className='m-nav__link-icon-wrapper'><i className='flaticon-music-2' /></span>
                        </span>
                      </a>
                      <div >
                        {/* <Modal isOpen={props.modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles} >
                          <ApplicationActivity />
                        </Modal> */}
                      </div>
                    </li>
                    <li className={'m-nav__item m-topbar__user-profile  m-dropdown  m-dropdown--medium m-dropdown--arrow  m-dropdown--align-right  m-dropdown--mobile-full-width m-dropdown--skin-light ' + loginSlideClass}>
                      <a href='' className='m-nav__link' onClick={openLoginSlide}>
                        <span className='m-topbar__userpic m--hide'>
                          <img src='assets/app/media/img/users/user4.jpg' className='m--img-rounded m--marginless m--img-centered' alt='' />
                        </span>
                        <span className='m-nav__link-icon m-topbar__usericon'>
                          <span className='m-nav__link-icon-wrapper'><i className='flaticon-user-ok' /></span>
                        </span>
                        <span className='m-topbar__username m--hide'>Nick</span>
                      </a>
                      <div className='m-dropdown__wrapper'>
                        <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
                        <div className='m-dropdown__inner'>
                          <div className='m--align-right'>
                            <div className='m-card-user--skin-light'>
                              {/* <div className='m-card-user__pic'>
                                <img src='assets/app/media/img/users/user4.jpg' className='m--img-rounded m--marginless' alt='' />
                              </div> */}
                              <div className=' '>
                                {/* <span className='m-card-user__name m--font-weight-500'>Mark Andre</span> */}
                                <a href='' onClick={closeLoginSlide} ><i className='la la-close' /></a>
                              </div>
                            </div>
                          </div>
                          <div className='m-dropdown__body'>
                            <div className='m-dropdown__content'>
                              <ul className='m-nav m-nav--skin-light'>
                                {/* <li className='m-nav__section m--hide'>
                                  <span className='m-nav__section-text'>Section</span>
                                </li>
                                <li className='m-nav__item'>
                                  <a href='profile.html' className='m-nav__link'>
                                    <i className='m-nav__link-icon flaticon-profile-1' />
                                    <span className='m-nav__link-title'>
                                      <span className='m-nav__link-wrap'>
                                        <span className='m-nav__link-text'>My Profile</span>
                                        <span className='m-nav__link-badge'><span className='m-badge m-badge--success'>2</span></span>
                                      </span>
                                    </span>
                                  </a>
                                </li>
                                <li className='m-nav__item'>
                                  <a href='profile.html' className='m-nav__link'>
                                    <i className='m-nav__link-icon flaticon-share' />
                                    <span className='m-nav__link-text'>Activity</span>
                                  </a>
                                </li>
                                <li className='m-nav__item'>
                                  <a href='profile.html' className='m-nav__link'>
                                    <i className='m-nav__link-icon flaticon-chat-1' />
                                    <span className='m-nav__link-text'>Messages</span>
                                  </a>
                                </li>
                                <li className='m-nav__separator m-nav__separator--fit' />
                                <li className='m-nav__item'>
                                  <a href='profile.html' className='m-nav__link'>
                                    <i className='m-nav__link-icon flaticon-info' />
                                    <span className='m-nav__link-text'>FAQ</span>
                                  </a>
                                </li>
                                <li className='m-nav__item'>
                                  <a href='profile.html' className='m-nav__link'>
                                    <i className='m-nav__link-icon flaticon-lifebuoy' />
                                    <span className='m-nav__link-text'>Support</span>
                                  </a>
                                </li>
                                <li className='m-nav__separator m-nav__separator--fit' /> */}
                                <li className='m-nav__item'>
                                  <a href='javascript:void(0);' onClick={logOut} className='btn m-btn--pill    btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder'>Logout</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>) }
              {/* <!-- END: Topbar --> */}
            </div>
          </div>
        </div>
      </header>
      {/*  <!-- begin::Quick Sidebar --> */}
      <div id='m_quick_sidebar' className={'m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light ' + quickSlideClass}>
        <div className='m-quick-sidebar__content'>
          <span id='m_quick_sidebar_close' className='m-quick-sidebar__close'><a href='' onClick={closeQuickSlide} ><i className='la la-close' /></a></span>
          <ul id='m_quick_sidebar_tabs' className='nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand' role='tablist'>
            {/* <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link active' data-toggle='tab' href='#m_quick_sidebar_tabs_messenger' role='tab'>Activity Feeds</a>
            </li>
            <li className='nav-item m-tabs__item'>
              <a className='nav-link m-tabs__link' 		data-toggle='tab' href='#m_quick_sidebar_tabs_settings' role='tab'>Settings</a>
            </li> */}
          </ul>
          <ApplicationActivity />
          {/* <div className='tab-content'>
            <div className='tab-pane active' id='m_quick_sidebar_tabs_messenger' role='tabpanel'>
              <div className='m-messenger m-messenger--message-arrow m-messenger--skin-light'>
                <div className='m-messenger__messages m-scrollable'>
                  <ApplicationActivity />
                  <div className='m-messenger__wrapper'>
                    <div className='m-messenger__message m-messenger__message--in'>
                      <div className='m-messenger__message-pic'>
                        <img src='assets/app/media/img//users/user3.jpg' alt='' />
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
                  <div className='m-messenger__datetime'>2:30PM</div>
                </div>
                <div className='m-messenger__seperator' />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* <!-- end::Quick Sidebar -->		  */}
    </div>
  )
}

HeaderComponent.propTypes = {
  isLoggedin: PropTypes.any,
  // modalIsOpen: PropTypes.any,
  // setModalOpenStatus: PropTypes.func,
  isQuickSlideOpen: PropTypes.any,
  isLoginSlideOpen: PropTypes.any,
  // setQuickslideFlag: PropTypes.func,
  setLoginslideFlag: PropTypes.func
}
