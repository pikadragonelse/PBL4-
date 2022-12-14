import { faCircleChevronRight, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../../avatar';
import React from 'react';

import './header-inbox.css';

const HeaderInbox = ({ useSubscribe }) => {
    const { newestMessage } = useSubscribe('userInfoSub');
    return (
        <div className="header-inbox">
            <div className="header-inbox-info">
                <div className="header-inbox-wrapper-img">
                    <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
                </div>

                <div className="header-inbox-main-info">
                    <p className="header-inbox-name-friend">{newestMessage.username}</p>
                    <p className="header-inbox-state-friend">online</p>
                </div>
            </div>
            <div className="header-inbox-method">
                <FontAwesomeIcon className="header-inbox-method-icon" icon={faPhone} />
                <FontAwesomeIcon className="header-inbox-method-icon" icon={faVideo} />
                <FontAwesomeIcon
                    className="header-inbox-method-special header-inbox-method-icon "
                    icon={faCircleChevronRight}
                />
            </div>
        </div>
    );
};

export { HeaderInbox };
