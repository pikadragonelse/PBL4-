import React, { useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from '../avatar';
import { Button } from '../button';
import { FormAddFriend } from '../form-add-friend/form-add-friend';
import { Tag } from '../tag';
import { FormUserInfoBlock } from './form-user-info-block';

import './form-user-info.css';

const blockInfoMap = ['Introduce', 'Contact', 'Favorites'];
const blockInfoIntroduceItemMap = ['Date of birth', 'Address', 'Gender'];
const blockInfoContactItemMap = ['Email', 'Phone number'];

const blockInfoSubMap = {
    Introduce: blockInfoIntroduceItemMap,
    Contact: blockInfoContactItemMap,
};

export const FormUserInfo = ({ user, idUserGetInfo, isOpen, setIsOpenDrawer, setIdUserGetInfo }) => {
    const [userInfo, setUserInfo] = useState({});
    const [userInfoMap, setUserInfoMap] = useState({});
    const [listFriend, setListFriend] = useState([]);

    const filterFavorite = (listFavoritesMap) => {
        let listFavorites = [];
        Object.keys(listFavoritesMap).forEach((item) => {
            if (listFavoritesMap[item] !== 2.5 && item !== 'idUserFavorite') {
                listFavorites.push(item.replace('_', ' '));
            }
        });
        return listFavorites;
    };

    const getAllFriend = () => {
        fetch(`http://localhost:8080/api/friend/get-all-friend?idUser=${idUserGetInfo}`, {
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

    const getInfoUser = () => {
        fetch(`http://localhost:8080/api/user/get-info-user?idUser=${idUserGetInfo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUserInfo(data.user);
                setUserInfoMap({
                    'Date of birth': data.user.dateOfBirthUser || '',
                    Address: data.user.addressUser || '',
                    Gender: data.user.genderUser === true ? 'Male' : 'Female',
                    Email: data.user.emailUser || '',
                    'Phone number': data.user.phoneUser || '',
                    userFavorite: data.user.userFavorite != null ? filterFavorite(data.user.userFavorite) : '',
                });
                filterFavorite(data.user.userFavorite);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (idUserGetInfo != null) {
            setListFriend([]);
            getInfoUser();
            getAllFriend();
        }
    }, [idUserGetInfo]);

    return (
        <div className={`form-user-info`}>
            <div className="form-user-info-header">
                <div className="form-user-info-avt-container">
                    <Avatar src={`${process.env.PUBLIC_URL}/avatar.jpg`} />
                </div>
                <div className="form-user-info-header-info">
                    <h2 className="form-user-info-nickname">{userInfo.nameUser}</h2>
                    <p className="form-user-info-hometown">{userInfo.homeTownUser}</p>
                </div>
                {idUserGetInfo !== user.id ? (
                    <Button className="form-user-info-button" primary>
                        Add friend
                    </Button>
                ) : (
                    ''
                )}
            </div>
            <div className="form-user-info-body">
                <div className="form-user-info-list-friend-container">
                    <h2 className="form-user-info-list-friend-title">List friend</h2>
                    <FormAddFriend
                        user={user}
                        isOpen={isOpen}
                        type="showAllFriend"
                        className="form-user-info-list-friend"
                        listFriendUserInfo={listFriend}
                        setIsOpenDrawer={setIsOpenDrawer}
                        setIdUserGetInfo={setIdUserGetInfo}
                    />
                </div>
                <div className="form-user-info-personal">
                    {blockInfoMap.map((item) => (
                        <FormUserInfoBlock key={item} title={item}>
                            {blockInfoSubMap[item] != null
                                ? blockInfoSubMap[item].map((info) => (
                                      <li key={info} className="form-user-info-personal-item">{`${info}: ${
                                          userInfoMap != null ? userInfoMap[info] : ''
                                      }`}</li>
                                  ))
                                : ''}
                            <div className="form-user-info-favorite-container">
                                {item === 'Favorites' && userInfoMap.userFavorite != null
                                    ? userInfoMap.userFavorite.map((favorite) => (
                                          <Tag key={favorite} type="favoriteTag">
                                              {favorite}
                                          </Tag>
                                      ))
                                    : ''}
                            </div>
                        </FormUserInfoBlock>
                    ))}
                </div>
            </div>
        </div>
    );
};
