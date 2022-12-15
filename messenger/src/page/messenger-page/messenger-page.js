import { FriendBox } from '../../component/friend-box';
import { Inbox } from '../../component/inbox';
import { Sidebar } from '../../component/sidebar';
import { DetailInfoInbox } from '../../component/detail-info-inbox';
import { Wrapper } from '../../component/wrapper';
import { useLocation } from 'react-router';
import React from 'react';
import { createBroker } from '../../broker';

export const MessengerPage = () => {
    const location = useLocation();

    const BrokerInstance = createBroker();

    return (
        <Wrapper type="wrapper-app">
            <Sidebar />
            <FriendBox
                user={location.state}
                useSubscribe={BrokerInstance.useSubscribe}
                sendToBroker={BrokerInstance.sendToBroker}
            />
            <Inbox user={location.state} useSubscribe={BrokerInstance.useSubscribe} />
            <DetailInfoInbox />
        </Wrapper>
    );
};
