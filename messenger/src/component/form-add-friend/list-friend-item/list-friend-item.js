import React, { useEffect, useState } from 'react';
import { Avatar } from '../../avatar';
import { Button } from '../../button';

import './list-friend-item.css';

const typeButtonMap = {
    addFriend: 'Add friend',
    addFriendToGroup: 'Add to group',
    accept: 'Accept',
};

export const ListFriendItem = ({
    friend,
    avatar,
    nameUser,
    type,
    handlePushFriendToList,
    handlePopFriendFromList,
    listAddToGroup,
    setIsOpenDrawer,
    setIdUserGetInfo,
    setIsOpenModal,
    user,
    setIsAccept,
    listFriend,
}) => {
    const [listRequest, setListRequest] = useState([]);
    const [resetState, setResetState] = useState(false);

    useEffect(() => {
        getAllMyFriendRequest();
    }, [resetState]);

    const checkIsRequest = () => {
        return listRequest.some((item) => item.idFriend === friend.idFriend);
    };

    const checkIsFriend = () => {
        if (listFriend != null) {
            return listFriend.some((item) => item.idFriend === friend.idFriend);
        }
    };

    const getAllMyFriendRequest = () => {
        fetch(`http://localhost:8080/api/friend/get-all-friend-request`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setListRequest(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const sendRequestAddFriend = (isRequest) => {
        fetch(
            `http://localhost:8080/api/friend/send-friend-request?idFriend=${friend.idFriend}&request=${!isRequest}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user.type} ${user.token}`,
                },
            },
        )
            .then(() => setResetState((prev) => (prev = !prev)))
            .catch((error) => {
                console.log(error);
            });
    };

    const acceptFriend = (isAccept) => {
        fetch(`http://localhost:8080/api/friend/reply-friend-request?idFriend=${friend.idFriend}&reply=${isAccept}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then(() => setResetState((prev) => (prev = !prev)))
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <li
            onClick={() => {
                setIsOpenDrawer(true);
                setIdUserGetInfo(friend.idFriend);
                setIsOpenModal(false);
            }}
            className="list-friend-item"
        >
            <div className="list-friend-info">
                <div className="list-friend-item-container-avt">
                    <Avatar src={avatar} />
                </div>
                <h2 className="list-friend-item-name">{nameUser}</h2>
            </div>
            <div className="list-friend-item-button">
                {type === 'addFriendToGroup' ? (
                    <Button
                        primary
                        typeDecor={
                            listAddToGroup.some((item) => item.friendId === friend.idFriend) === true ? 'cancel' : ''
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            listAddToGroup.some((item) => item.friendId === friend.idFriend) === true
                                ? handlePopFriendFromList(friend.idFriend)
                                : handlePushFriendToList({ friendId: friend.idFriend, friendName: friend.name });
                        }}
                        size="small"
                    >
                        {listAddToGroup.some((item) => item.friendId === friend.idFriend) === false
                            ? typeButtonMap[type]
                            : 'Cancel'}
                    </Button>
                ) : type === 'addFriend' || type === 'showAllFriend' ? (
                    <Button
                        primary
                        onClick={() => sendRequestAddFriend(checkIsRequest())}
                        typeDecor={checkIsRequest() === true || checkIsFriend() === true ? 'cancel' : ''}
                        size="small"
                    >
                        {checkIsRequest() === true || checkIsFriend() === true ? 'Cancel' : 'Add friend'}
                    </Button>
                ) : (
                    <div className="container-button-request">
                        <Button
                            size="small"
                            primary
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAccept((prev) => (prev = !prev));
                                acceptFriend(true);
                            }}
                        >
                            Accept
                        </Button>
                        <Button
                            size="small"
                            typeDecor="cancel"
                            onClick={() => {
                                setIsAccept((prev) => (prev = !prev));
                                acceptFriend(false);
                            }}
                            className="deny-button"
                        >
                            Deny
                        </Button>
                    </div>
                )}
            </div>
        </li>
    );
};
