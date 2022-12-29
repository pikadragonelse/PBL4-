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
    mutualFriends,
    setIsReloadListFriend,
    listFriendUser,
}) => {
    const [listRequest, setListRequest] = useState([]);
    const [resetState, setResetState] = useState(false);

    const getAllMyFriendRequest = () => {
        fetch(`http://localhost:8080/api/friend/get-all-my-friend-request`, {
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

    useEffect(() => {
        getAllMyFriendRequest();
    }, [resetState]);

    const checkIsRequest = () => {
        return listRequest.some((item) => item.idFriend === friend.idFriend);
    };

    const checkIsFriend = () => {
        if (listFriendUser != null) {
            return listFriendUser.some((item) => item.idFriend === friend.idFriend);
        }
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
            .then(() => {
                setResetState((prev) => (prev = !prev));
            })
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

    const deleteFriend = (idFriend) => {
        fetch(`http://localhost:8080/api/friend/delete-friend?idFriend=${idFriend}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then(() => {
                setIsReloadListFriend((prev) => (prev = !prev));
                setResetState((prev) => (prev = !prev));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <li
            onClick={() => {
                setIsOpenDrawer(true);
                setIdUserGetInfo(friend.idFriend || friend.idUser);
                try {
                    setIsOpenModal(false);
                } catch (error) {}
            }}
            className="list-friend-item"
        >
            <div className="list-friend-info">
                <div className="list-friend-item-container-avt">
                    <Avatar src={avatar} />
                </div>
                <div className="list-friend-item-container-text">
                    <h2 className="list-friend-item-name">{nameUser}</h2>
                    <p className="list-friend-item-text">
                        {mutualFriends !== 0 ? `Mutual friends: ${mutualFriends}` : ''}
                    </p>
                </div>
            </div>
            <div className="list-friend-item-button">
                {friend.idFriend !== user.id ? (
                    type === 'addFriendToGroup' ? (
                        <Button
                            primary
                            typeDecor={
                                listAddToGroup.some((item) => item.friendId === friend.idFriend) === true
                                    ? 'cancel'
                                    : ''
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
                            onClick={(e) => {
                                e.stopPropagation();
                                if (listRequest[0] != null) {
                                    sendRequestAddFriend(checkIsRequest());
                                } else {
                                    sendRequestAddFriend(false);
                                }
                                if (checkIsFriend() === true) {
                                    deleteFriend(friend.idFriend);
                                }
                            }}
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsAccept((prev) => (prev = !prev));
                                    acceptFriend(false);
                                }}
                                className="deny-button"
                            >
                                Deny
                            </Button>
                        </div>
                    )
                ) : (
                    ''
                )}
            </div>
        </li>
    );
};
