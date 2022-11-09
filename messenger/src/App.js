import { DetailInfoInbox } from './component/detail-info-inbox';
import { FriendBox } from './component/friend-box';
import React from 'react';
import { Inbox } from './component/inbox';
import { Sidebar } from './component/sidebar';
import { Wrapper } from './component/wrapper';
import './App.css';

const App = () => {
    return (
        <Wrapper type="wrapper-app">
            <Sidebar />
            <FriendBox />
            <Inbox idUser="" />
            <DetailInfoInbox />
        </Wrapper>
    );
};

export default App;
