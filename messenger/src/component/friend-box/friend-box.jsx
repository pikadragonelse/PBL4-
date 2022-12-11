import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { FriendBoxHeader } from './friend-box-header';
import React from 'react';
import { ListMessage } from './list-message';
import { Loading } from '../loading';


import './friend-box.css';


export const FriendBox = ({ user, sendToBroker, useSubscribe }) => {
    const listMessageContainerRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [isMask, setIsMask] = useState(false);

    const [listGroup, setListGroup] = useState([]);

    const getAllGroup = () => {
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
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                <div className={`friend-box-loading-container ${isLoading === false ? 'loading-hidden' : ''}`}>
                    <Loading />
                </div>
                
                <ListMessage  listGroup={listGroupAfterSort} sendToBroker={sendToBroker} />
            </div>
        </div>
    );
};
