import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { FriendBoxHeader } from './friend-box-header';
import React from 'react';
import { ListMessage } from './list-message';
import { Loading } from '../loading';

import './friend-box.css';
import { Modal } from '../modal';
import { FormAddFriend } from '../form-add-friend';
import { api } from '../../api';

export const FriendBox = ({ user, sendToBroker, setIsOpenDrawer, setIdUserGetInfo }) => {
    const listMessageContainerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [isMask, setIsMask] = useState(false);
    const [listGroup, setListGroup] = useState([]);
    const [stateFriendBox, setStateFriendBox] = useState('general');
    const [isOpenModalAddFriendToGroup, setIsOpenModalAddFriendToGroup] = useState(false);

    const getAllGroup = () => {
        fetch(`${api}/api/group/get-all-group`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setListGroup(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            getAllGroup();
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    });

    const handleScrollList = (event) => {
        if (event.target.scrollTop > 20) {
            setIsMask(true);
        } else {
            setIsMask(false);
        }
    };

    const handleSortByTimeNewestToLatest = (group1, group2) => {
        const dateGroup1 = new Date(group1.time);
        const dateGroup2 = new Date(group2.time);
        if (dateGroup1.getTime() > dateGroup2.getTime()) {
            return -1;
        }
    };
    const listGroupMap = {
        general:
            listGroup != null && listGroup.length != null && listGroup.length !== 0
                ? listGroup.sort(handleSortByTimeNewestToLatest)
                : [],
        groups:
            listGroup != null && listGroup.length != null && listGroup.length !== 0
                ? listGroup.filter((item) => item.single === false)
                : [],
    };

    return (
        <div className="friend-box">
            <Modal
                title="Add friend to group"
                content={
                    <FormAddFriend
                        setIsOpen={setIsOpenModalAddFriendToGroup}
                        isOpen={isOpenModalAddFriendToGroup}
                        user={user}
                        setIsOpenDrawer={setIsOpenDrawer}
                        type="addFriendToGroup"
                        setIdUserGetInfo={setIdUserGetInfo}
                    />
                }
                isOpenModalRequest={isOpenModalAddFriendToGroup}
                setIsOpenModalRequest={setIsOpenModalAddFriendToGroup}
                type="add-friend"
            />
            <FriendBoxHeader
                setStateFriendBox={setStateFriendBox}
                setIsOpenModalAddFriendToGroup={setIsOpenModalAddFriendToGroup}
            />
            <div
                onScroll={(event) => handleScrollList(event)}
                ref={listMessageContainerRef}
                className={`list-message-container ${isMask === true ? 'scroll-mask-list' : ''}`}
            >
                <div className={`friend-box-loading-container ${isLoading === false ? 'loading-hidden' : ''}`}>
                    <Loading />
                </div>

                <ListMessage listGroup={listGroupMap[stateFriendBox]} sendToBroker={sendToBroker} />
            </div>
        </div>
    );
};
