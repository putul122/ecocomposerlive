import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Breadcrumb (props) {
  let breadcrumb = props.breadcrumb
  let pageName
  let breadcrumbItems = ''
  if (typeof breadcrumb !== 'undefined') {
    pageName = breadcrumb.title
    if (typeof breadcrumb.items !== 'undefined') {
      breadcrumbItems = breadcrumb.items.map(function (object, index) {
        if (object.separator) {
          return (<li key={index} className='m-nav__separator'>-</li>)
        } else {
          return (
            <li key={index} className='m-nav__item'>
              <a href={object.href} className='m-nav__link'>
                <span className='m-nav__link-text'>{object.name}</span>
              </a>
            </li>
          )
        }
      })
    }
  }

  return (
    <div className='m-subheader '>
      <div className='d-flex align-items-center'>
        <div className='mr-auto'>
          <h3 className='m-subheader__title m-subheader__title--separator'>{pageName}</h3>
          <ul className='m-subheader__breadcrumbs m-nav m-nav--inline'>
            <li className='m-nav__item m-nav__item--home'>
              <Link to='/home' className='m-nav__link m-nav__link--icon'>
                <i className='m-nav__link-icon la la-home' />
              </Link>
            </li>
            <li className='m-nav__separator'>-</li>
            {breadcrumbItems}
          </ul>
        </div>
        <div>
          <div className='m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push' aria-expanded='true'>
            <a href='javascript:void(o);' className='m-portlet__nav-link btn btn-lg btn-secondary  m-btn m-btn--outline-2x m-btn--air m-btn--icon m-btn--icon-only m-btn--pill  m-dropdown__toggle'>
              <i className='la la-plus m--hide' />
              <i className='la la-ellipsis-h' />
            </a>
            <div className='m-dropdown__wrapper'>
              <span className='m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust' />
              <div className='m-dropdown__inner'>
                <div className='m-dropdown__body'>
                  <div className='m-dropdown__content'>
                    <ul className='m-nav'>
                      <li className='m-nav__section m-nav__section--first m--hide'>
                        <span className='m-nav__section-text'>Quick Actions</span>
                      </li>
                      <li className='m-nav__item'>
                        <a href='' className='m-nav__link'>
                          <i className='m-nav__link-icon flaticon-share' />
                          <span className='m-nav__link-text'>Activity</span>
                        </a>
                      </li>
                      <li className='m-nav__item'>
                        <a href='' className='m-nav__link'>
                          <i className='m-nav__link-icon flaticon-chat-1' />
                          <span className='m-nav__link-text'>Messages</span>
                        </a>
                      </li>
                      <li className='m-nav__item'>
                        <a href='' className='m-nav__link'>
                          <i className='m-nav__link-icon flaticon-info' />
                          <span className='m-nav__link-text'>FAQ</span>
                        </a>
                      </li>
                      <li className='m-nav__item'>
                        <a href='' className='m-nav__link'>
                          <i className='m-nav__link-icon flaticon-lifebuoy' />
                          <span className='m-nav__link-text'>Support</span>
                        </a>
                      </li>
                      <li className='m-nav__separator m-nav__separator--fit' />
                      <li className='m-nav__item'>
                        <a href='' className='btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm'>Submit</a>
                      </li>
                    </ul>
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

Breadcrumb.propTypes = {
  breadcrumb: PropTypes.any
}
