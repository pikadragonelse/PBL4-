import { faComments, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../avatar';
import { Logo } from '../logo';
import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../modal';
import { FormAddFriend } from '../form-add-friend';


import './sidebar.css';
import { useRef } from 'react';

export const Sidebar = () => {

    const modalParentsRef = useRef(null);

    return (
        <div className="sidebar-main">
            <div className="sidebar-nav">
                <Modal ref={modalParentsRef} content={<FormAddFriend/>} type="add-friend"/>
                <Link to='/' className="sidebar-logo">
                    <Logo type="logo-sidebar" />
                </Link>
                <FontAwesomeIcon icon={faComments} className="sidebar-icon"/>
                <FontAwesomeIcon icon={faCircleUser} className="sidebar-icon"/>
                <FontAwesomeIcon icon={faPhoneVolume} className="sidebar-icon"/>
                <FontAwesomeIcon onClick={() => modalParentsRef.current.openModal()} icon={faUserPlus} className="sidebar-icon "/>
            </div>
            <div className="sidebar-footer">
                <div className="avatar-sidebar-container">
                    <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
                </div>
            </div>
        </div>
    );
};
