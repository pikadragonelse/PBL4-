import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Search } from '../search'


import './modal.css'
import { useRef } from 'react'

export const Modal = forwardRef(({ content, type }, modalParentsRef) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const modalRef = useRef(null);

  useImperativeHandle(
    modalParentsRef,
    () => {
      return {
        openModal() {
          setIsOpenModal(true);
        }
      }
    },
    [],
  )

  const handleAddFriend = (e, form) => {
      e.preventDefault();
  }

  return ReactDOM.createPortal(
    <div ref={modalRef} className={`modal-wrapper ${isOpenModal === true ? 'modal-open' : ''}`}>
      <div className="overlay-modal"></div>
      <form onSubmit={e => {
        const target = e.target;
        handleAddFriend(e, target);
      }} className="form">
        <div className="form-header">
          <h2 className="form-title">Add friend</h2>
          {type === 'add-friend' ? (
            <div className="form-add-friend-search-container">
              <Search className="form-add-friend-search" />
            </div>
          ) : (
            ''
          )}
          <FontAwesomeIcon onClick={() => setIsOpenModal(false)} icon={faTimes} className="form-close-icon" />
        </div>
        {content}
      </form>
    </div>,
    document.querySelector('body'),
  )
});
