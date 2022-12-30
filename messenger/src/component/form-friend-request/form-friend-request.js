import React, { useEffect } from 'react';
import { useState } from 'react';
import { ListFriendItem } from '../form-add-friend/list-friend-item';

import './form-friend-request.css';
import { api } from '../../api';

export const FormFriendRequest = ({ user, setIsOpenDrawer, isOpen }) => {
    const [listRequest, setListRequest] = useState([]);
    const [isAccept, setIsAccept] = useState(false);
    const getAllMyFriendRequest = () => {
        fetch(`${api}/api/friend/get-all-friend-request`, {
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
    }, [isAccept, isOpen]);

    return (
        <div className="form-friend-request">
            {listRequest.map((item) => (
                <ListFriendItem
                    key={item}
                    friend={item}
                    type="accept"
                    nameUser={item.name}
                    avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
                    user={user}
                    setIsAccept={setIsAccept}
                    setIsOpenDrawer={setIsOpenDrawer}
                />
            ))}
        </div>
    );
};
