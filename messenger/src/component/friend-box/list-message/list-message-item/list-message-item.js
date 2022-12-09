import React from 'react';

import { Avatar } from '../../../avatar';
import './list-message-item.css';

export const ListMessageItem = ({
    nameSender,
    lastMessage,
    timeMessage,
    idGroup,
    sendToBroker,
    isActive,
    setIdGroupActive,
}) => {
    let timeSend = new Date(timeMessage);
    let timeNow = Date.now();
    let distanceTime = timeNow - timeSend.getTime();
    let distanceTimeYears = Math.ceil(distanceTime / (1000 * 3600 * 24 * 7 * 30 * 365));
    let distanceTimeMonths = Math.ceil(distanceTime / (1000 * 3600 * 24 * 7 * 30));
    let distanceTimeWeeks = Math.ceil(distanceTime / (1000 * 3600 * 24 * 7));
    let distanceTimeDays = Math.ceil(distanceTime / (1000 * 3600 * 24));
    let distanceTimeHours = Math.ceil(distanceTime / (1000 * 3600));
    let distanceTimeMinutes = Math.ceil(distanceTime / (1000 * 60));

    let stringTimeShow = '';

    if (distanceTimeMinutes <= 59) {
        stringTimeShow = `${distanceTimeMinutes} minutes ago`;
    } else if (distanceTimeHours <= 23) {
        stringTimeShow = `${distanceTimeHours} hours ago`;
    } else if (distanceTimeDays <= 6) {
        stringTimeShow = `${distanceTimeDays} days ago`;
    } else if (distanceTimeWeeks <= 3) {
        stringTimeShow = `${distanceTimeWeeks} weeks ago`;
    } else if (distanceTimeMonths <= 11) {
        stringTimeShow = `${distanceTimeWeeks} months ago`;
    } else if (distanceTimeYears <= 5) {
        stringTimeShow = `${distanceTimeYears} years ago`;
    }

    return (
        <li
            onClick={() => {
                sendToBroker('default', idGroup);
                setIdGroupActive(idGroup);
            }}
            className={`list-message-friend-message ${isActive}`}
        >
            <div className="list-message-friend-avt-container">
                <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
            </div>
            <div className="list-message-friend-info">
                <h4 className="list-message-friend-nickname">{nameSender}</h4>
                <p className="list-message-friend-content">{lastMessage}</p>
            </div>
            <p className="list-message-message-time">{stringTimeShow}</p>
        </li>
    );
};
