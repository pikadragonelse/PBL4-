import { FriendBox } from '../../component/friend-box';
import { Inbox } from '../../component/inbox';
import { Sidebar } from '../../component/sidebar';
import { DetailInfoInbox } from '../../component/detail-info-inbox';
import { Wrapper } from '../../component/wrapper';
import { useLocation } from 'react-router';
import React, { useState } from 'react';

import { Drawer } from '../../component/drawer';
import { FormUserInfo } from '../../component/form-user-info';

export const MessengerPage = ({ BrokerInstance }) => {
    const location = useLocation();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [idUserGetInfo, setIdUserGetInfo] = useState(undefined);

    return (
        <Wrapper type="wrapper-app">
            <Sidebar user={location.state} setIdUserGetInfo={setIdUserGetInfo} setIsOpenDrawer={setIsOpenDrawer} />
            <FriendBox
                setIdUserGetInfo={setIdUserGetInfo}
                user={location.state}
                useSubscribe={BrokerInstance.useSubscribe}
                sendToBroker={BrokerInstance.sendToBroker}
                setIsOpenDrawer={setIsOpenDrawer}
            />
            <Inbox user={location.state} useSubscribe={BrokerInstance.useSubscribe} />
            <DetailInfoInbox useSubscribe={BrokerInstance.useSubscribe} />
            <Drawer isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer}>
                <FormUserInfo
                    user={location.state}
                    setIsOpenDrawer={setIsOpenDrawer}
                    isOpen={isOpenDrawer}
                    idUserGetInfo={idUserGetInfo}
                    setIdUserGetInfo={setIdUserGetInfo}
                />
            </Drawer>
        </Wrapper>
    );
};
