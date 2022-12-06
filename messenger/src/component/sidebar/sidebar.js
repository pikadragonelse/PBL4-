import { faUser, faComments, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Avatar } from '../avatar';
import { Logo } from '../logo';

import './sidebar.css';

export const Sidebar = () => {
    return (
        <div className="sidebar-main">
            <div className="sidebar-nav">
                <div className="sidebar-logo">
                    <Logo type="logo-sidebar" />
                </div>
                <FontAwesomeIcon icon={faComments} />
                <FontAwesomeIcon icon={faCircleUser} />
                <FontAwesomeIcon icon={faPhoneVolume} />
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="sidebar-footer">
                <div className="avatar-sidebar-container">
                    <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
                </div>
            </div>
        </div>
    );
};
