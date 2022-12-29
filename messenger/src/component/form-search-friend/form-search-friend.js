import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ListFriendItem } from '../form-add-friend/list-friend-item';

import './form-search-friend.css';

export const FormSearchFriend = ({
    searchTxt,
    user,
    setIsOpenDrawer,
    isSearch,
    setIsSearch,
    setIdUserGetInfo,
    setIsOpenSearchFriend,
}) => {
    const [userResult, setUserResult] = useState({});

    const searchUser = () => {
        fetch(`http://localhost:8080/api/user/search-user-by-email?search=${searchTxt}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserResult(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (searchTxt !== '' && searchTxt != null) {
            searchUser();
            setIsSearch(false);
        }
    }, [isSearch]);

    return (
        <div className="form-search-friend">
            {userResult.user != null ? (
                <ListFriendItem
                    friend={userResult.user}
                    type="addFriend"
                    nameUser={userResult.user != null ? userResult.user.nameUser : ''}
                    avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
                    user={user}
                    setIsOpenDrawer={setIsOpenDrawer}
                    setIdUserGetInfo={setIdUserGetInfo}
                    setIsOpenModal={setIsOpenSearchFriend}
                    mutualFriends={userResult.mutualFriends}
                />
            ) : (
                ''
            )}
        </div>
    );
};
