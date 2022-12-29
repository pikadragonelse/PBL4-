import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Button } from '../button';
import { Modal } from '../modal';
import { Tag } from '../tag';
import { ListFriendItem } from './list-friend-item';
import { FormNoti } from '../form-noti';

import './form-add-friend.css';

const stateCreateGroupMap = {
    true: 'successful',
    false: 'error',
};

const contentStateCreateGroupMap = {
    true: 'Success to create group.',
    false: 'Something wrong! Please try again later.',
};

export const FormAddFriend = ({
    setIsOpen,
    isOpen,
    user,
    type,
    className,
    setIsOpenDrawer,
    setIdUserGetInfo,
    listFriendUserInfo,
    setIsReloadListFriend,
    isSearch,
    setIsSearch,
    searchTxt,
}) => {
    const [listFriend, setListFriend] = useState([]);
    const [listFriendRecommend, setListFriendRecommend] = useState([]);
    const [listAddToGroup, setListAddToGroup] = useState([]);
    const [stateCreateGroup, setStateCreateGroup] = useState(false);
    const [isOpenNotify, setIsOpenNotify] = useState(false);

    let listAddToGroupTemp = useRef([]);

    const listFriendMap = {
        addFriendToGroup: listFriend,
        addFriend: listFriendRecommend,
        showAllFriend: listFriendUserInfo,
    };

    useEffect(() => {
        if (isSearch === true) {
            searchUserRecommend();
            setIsSearch(false);
        }
    }, [isSearch]);

    const searchUserRecommend = () => {
        fetch(`http://localhost:8080/api/friend/search-recommend-friend?search=${searchTxt}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setListFriendRecommend(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllFriend = () => {
        fetch('http://localhost:8080/api/friend/get-all-friend', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setListFriend(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllRecommendFriend = () => {
        fetch('http://localhost:8080/api/friend/recommend-friend', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setListFriendRecommend(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const createGroupMessage = () => {
        fetch('http://localhost:8080/api/group/create-group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
            body: JSON.stringify(listAddToGroupTemp.current.map((item) => item.friendId)),
        })
            .then((response) => response.json())
            .then(() => {
                setIsOpen(false);
                setIsOpenNotify(true);
                setStateCreateGroup(true);
            })
            .catch(() => {
                setIsOpenNotify(true);
                setStateCreateGroup(true);
            });
    };

    useEffect(() => {
        if (isOpen === true && (type === 'addFriendToGroup' || type === 'showAllFriend')) {
            getAllFriend();
        } else if (isOpen === true && type === 'addFriend') {
            getAllRecommendFriend();
        }
        listAddToGroupTemp.current = [];
        setListAddToGroup([]);
    }, [isOpen]);

    const handlePushFriendToList = (friend) => {
        if (listAddToGroupTemp.current.some((item) => item.friendId === friend.friendId) === false) {
            listAddToGroupTemp.current.push(friend);
            setListAddToGroup(listAddToGroupTemp.current);
        }
    };

    const handlePopFriendFromList = (friendId) => {
        listAddToGroupTemp.current.forEach((item) =>
            item.friendId === friendId ? listAddToGroupTemp.current.pop(item) : '',
        );
        setListAddToGroup(listAddToGroupTemp.current);
    };

    return (
        <div className={`form-add-friend-body ${className}`}>
            <Modal
                content={
                    <FormNoti setIsOpenModal={setIsOpenNotify} content={contentStateCreateGroupMap[stateCreateGroup]} />
                }
                title={stateCreateGroupMap[stateCreateGroup]}
                isOpenModalRequest={isOpenNotify}
                setIsOpenModalRequest={setIsOpenNotify}
            />
            {type === 'addFriendToGroup' ? (
                <div className="form-add-friend-list-friend-group">
                    {listAddToGroup != null
                        ? listAddToGroup.map((item) => (
                              <Tag
                                  key={item.friendId}
                                  onClick={() => {
                                      handlePopFriendFromList(item.friendId);
                                  }}
                              >
                                  {item.friendName}
                              </Tag>
                          ))
                        : ''}
                </div>
            ) : (
                ''
            )}

            <ul className="list-friend-recommend">
                {listFriendMap[type] != null
                    ? listFriendMap[type].map((item) => (
                          <ListFriendItem
                              friend={item}
                              user={user}
                              key={item.name}
                              avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
                              nameUser={item.name}
                              type={type}
                              handlePushFriendToList={handlePushFriendToList}
                              handlePopFriendFromList={handlePopFriendFromList}
                              listAddToGroup={listAddToGroup}
                              setIsOpenDrawer={setIsOpenDrawer}
                              setIdUserGetInfo={setIdUserGetInfo}
                              setIsOpenModal={setIsOpen}
                              listFriend={listFriendUserInfo}
                              mutualFriends={item.mutualFriends}
                              setIsReloadListFriend={setIsReloadListFriend}
                          />
                      ))
                    : ''}
            </ul>
            {type === 'addFriendToGroup' ? (
                <div
                    onClick={() => {
                        createGroupMessage();
                        setIsOpen(false);
                    }}
                    className="form-add-friend-button"
                >
                    <Button primary>Create group</Button>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
