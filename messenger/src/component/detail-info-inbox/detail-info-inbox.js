import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Avatar } from '../avatar';
import './detail-info-inbox.css';
import { Feature } from './feature';

export const DetailInfoInbox = ({ useSubscribe }) => {
    const { newestMessage } = useSubscribe('userInfoMain');
    return (
        <div className="detail-info-inbox">
            <div className="detail-info-inbox-container-avt">
                <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
            </div>
            <div className="detail-info-inbox-header">
                <h3 className="detail-info-inbox-nickname">{newestMessage.username}</h3>
                <p className="detail-info-inbox-alive">Online</p>
            </div>

            <div className="detail-info-inbox-wrap-icon">
                <div className="detail-info-inbox-container-icon">
                    <FontAwesomeIcon className="detail-info-inbox-icon" icon={faUser} />
                    <FontAwesomeIcon className="detail-info-inbox-icon" icon={faBell} />
                    <FontAwesomeIcon className="detail-info-inbox-icon" icon={faMagnifyingGlass} />
                </div>
            </div>

            <div className="detail-info-inbox-wrap-feature">
                <div className="detail-info-inbox-container-feature">
                    <Feature content="Customize chat" />
                    <Feature content="Files" />
                    <Feature content="Privacy and support" />
                </div>
            </div>
        </div>
    );
};
