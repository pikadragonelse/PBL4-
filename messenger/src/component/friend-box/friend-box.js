import React, { useRef, useState } from 'react';
import { FriendBoxHeader } from './friend-box-header';

import './friend-box.css';
import { ListMessage } from './list-message';

export const FriendBox = () => {
    const listMessageContainerRef = useRef();
    const [isMask, setIsMask] = useState(false);

    const handleScrollList = (event) => {
        if (event.target.scrollTop > 20) {
            setIsMask(true);
        } else {
            setIsMask(false);
        }
    };

    return (
        <div className="friend-box">
            <FriendBoxHeader />
            <div
                onScroll={(event) => handleScrollList(event)}
                ref={listMessageContainerRef}
                className={`list-message-container ${isMask === true ? 'scroll-mask-list' : ''}`}
            >
                <ListMessage />
            </div>
        </div>
    );
};
