import React, { useEffect } from 'react';
import { useState } from 'react';
import { ListFriendItem } from '../form-add-friend/list-friend-item';

import './form-friend-request.css';

export const FormFriendRequest = ({ user }) => {
    const [listRequest, setListRequest] = useState([]);
    const [isAccept, setIsAccept] = useState(false);
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

    useEffect(() => {
        getAllMyFriendRequest();
    }, [isAccept]);

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
                />
            ))}
        </div>
    );
};
