import { FriendBox } from '../../component/friend-box';
import { Inbox } from '../../component/inbox';
import { Sidebar } from '../../component/sidebar';
import { DetailInfoInbox } from '../../component/detail-info-inbox';
import { Wrapper } from '../../component/wrapper';
import { useLocation } from 'react-router';
import React, { useEffect } from 'react';
import { createBroker } from '../../broker';
import useCookies from 'react-cookie/cjs/useCookies';
import { Cookies } from 'react-cookie';

export const MessengerPage = () => {
    const location = useLocation();
    const BrokerInstance = createBroker();
    const cookies = new Cookies();
    const [userCookies, setUserCookies, removeCookies] = useCookies(['userToken']);
    // setUserCookies('userToken', `${location.state.type} ${location.state.token}`, { path: '/' });

    useEffect(() => {
        // window.addEventListener('beforeunload', (e) => {
        //     e.preventDefault();
        console.log(123);
        removeCookies('userToken');
        // });
    }, []);

    return (
        <Wrapper type="wrapper-app">
            <Sidebar user={location.state} />
            <FriendBox
                user={location.state}
                useSubscribe={BrokerInstance.useSubscribe}
                sendToBroker={BrokerInstance.sendToBroker}
            />
            <Inbox user={location.state} useSubscribe={BrokerInstance.useSubscribe} />
            <DetailInfoInbox useSubscribe={BrokerInstance.useSubscribe} />
        </Wrapper>
    );
};
