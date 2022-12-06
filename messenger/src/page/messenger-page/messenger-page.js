import React from 'react';
import { FriendBox } from '../../component/friend-box';
import { Inbox } from '../../component/inbox';
import { Sidebar } from '../../component/sidebar';
import { DetailInfoInbox } from '../../component/detail-info-inbox';
import { Wrapper } from '../../component/wrapper';
import { useLocation } from 'react-router';

export const MessengerPage = () => {
    const location = useLocation();

    return (
        <Wrapper type="wrapper-app">
            <Sidebar />
            <FriendBox />
            <Inbox user={location.state} />
            <DetailInfoInbox />
        </Wrapper>
    );
};
