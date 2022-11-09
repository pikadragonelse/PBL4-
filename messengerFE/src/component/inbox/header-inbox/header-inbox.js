import { faAngleRight, faCircleChevronRight, faCircleRight, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './header-inbox.css';

const HeaderInbox = () => {
    return (
        <div className="header-inbox">
            <div className="header-inbox-info">
                <div className="header-inbox-wrapper-img">
                    <img
                        className="header-inbox-avatar"
                        src="https://www.mordeo.org/files/uploads/2019/04/Spitz-Pet-Dog-4K-Ultra-HD-Mobile-Wallpaper-950x1689.jpg"
                        alt="avatar"
                    />
                </div>

                <div className="header-inbox-main-info">
                    <p className="header-inbox-name-friend">Long</p>
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
