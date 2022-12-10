import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { FriendBoxHeader } from './friend-box-header';
import React from 'react';

import './friend-box.css';
import { ListMessage } from './list-message';

export const FriendBox = ({ user, sendToBroker }) => {
    const listMessageContainerRef = useRef();
    const [isMask, setIsMask] = useState(false);

    const [listGroup, setListGroup] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/group/get-all-group?idUser=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setListGroup(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleScrollList = (event) => {
        if (event.target.scrollTop > 20) {
            setIsMask(true);
        } else {
            setIsMask(false);
        }
    };

    const handleSortByTimeNewestToLatest = (group1, group2) => {
        return group1.time - group2.time;
    };

    const listGroupAfterSort = listGroup.sort(handleSortByTimeNewestToLatest);

    return (
        <div className="friend-box">
            <FriendBoxHeader />
            <div
                onScroll={(event) => handleScrollList(event)}
                ref={listMessageContainerRef}
                className={`list-message-container ${isMask === true ? 'scroll-mask-list' : ''}`}
            >
                <ListMessage listGroup={listGroupAfterSort} sendToBroker={sendToBroker} />
            </div>
        </div>
    );
};
