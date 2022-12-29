import { faComments, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faHeartCirclePlus, faPhoneVolume, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '../avatar';
import { Logo } from '../logo';
import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../modal';
import { FormAddFriend } from '../form-add-friend';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import './sidebar.css';
import { FormFriendRequest } from '../form-friend-request';
import { FormFavorite } from '../form-favorite';
import { FormSearchFriend } from '../form-search-friend/form-search-friend';

const iconSideBarIconMap = [faComments, faCircleUser, faHeartCirclePlus, faUserPlus, faSearch];
export const Sidebar = ({ user, setIdUserGetInfo, setIsOpenDrawer }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenRequestList, setIsOpenRequestList] = useState(false);
    const [isOpenFavoriteFrom, setIsOpenFavoriteFrom] = useState(false);
    const [isOpenSearchFriend, setIsOpenSearchFriend] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const methodSidebarMap = {
        comments: () => {
            setIsOpenRequestList(true);
        },
        'circle-user': () => {
            setIsOpenDrawer(true);
            setIdUserGetInfo(user.id);
        },
        'heart-circle-plus': () => {
            setIsOpenFavoriteFrom(true);
        },
        'user-plus': () => {
            setIsOpenModal(true);
        },
        'magnifying-glass': () => {
            setIsOpenSearchFriend(true);
        },
    };

    const nameTooltipMap = {
        comments: 'Friend request',
        'circle-user': 'Your information',
        'heart-circle-plus': 'Favorites',
        'user-plus': 'Recommend new friend',
        'magnifying-glass': 'Search user',
    };

    return (
        <div className="sidebar-main">
            <div className="sidebar-nav">
                <Modal
                    isOpenModalRequest={isOpenRequestList}
                    setIsOpenModalRequest={setIsOpenRequestList}
                    content={
                        <FormFriendRequest isOpen={isOpenRequestList} setIsOpenDrawer={setIsOpenDrawer} user={user} />
                    }
                    title="Friend request"
                    type="add-friend"
                />
                <Modal
                    isOpenModalRequest={isOpenModal}
                    setIsOpenModalRequest={setIsOpenModal}
                    setSearchTxt={setSearchTxt}
                    setIsSearch={setIsSearch}
                    content={
                        <FormAddFriend
                            setIsOpenDrawer={setIsOpenDrawer}
                            type="addFriend"
                            isOpen={isOpenModal}
                            setIsOpen={setIsOpenModal}
                            user={user}
                            setIdUserGetInfo={setIdUserGetInfo}
                            isSearch={isSearch}
                            setIsSearch={setIsSearch}
                            searchTxt={searchTxt}
                        />
                    }
                    type="add-friend"
                    title="Add friend"
                />
                <Modal
                    isOpenModalRequest={isOpenFavoriteFrom}
                    setIsOpenModalRequest={setIsOpenFavoriteFrom}
                    content={
                        <FormFavorite
                            user={user}
                            isOpen={isOpenFavoriteFrom}
                            setIsOpenFavoriteFrom={setIsOpenFavoriteFrom}
                        />
                    }
                    title="Favorite"
                />

                <Modal
                    isOpenModalRequest={isOpenSearchFriend}
                    setIsOpenModalRequest={setIsOpenSearchFriend}
                    title="search user"
                    setSearchTxt={setSearchTxt}
                    setIsSearch={setIsSearch}
                    content={
                        <FormSearchFriend
                            searchTxt={searchTxt}
                            user={user}
                            setIsOpenDrawer={setIsOpenDrawer}
                            isOpenSearch={isOpenSearchFriend}
                            isSearch={isSearch}
                            setIsSearch={setIsSearch}
                            setIdUserGetInfo={setIdUserGetInfo}
                            setIsOpenSearchFriend={setIsOpenSearchFriend}
                        />
                    }
                    type="add-friend"
                />

                <Link to="/" className="sidebar-logo">
                    <Logo type="logo-sidebar" />
                </Link>
                {iconSideBarIconMap.map((item) => (
                    <Tippy
                        key={item.iconName}
                        content={nameTooltipMap[item.iconName]}
                        interactive={true}
                        placement="right"
                        duration={20}
                        className="sidebar-tippy"
                    >
                        <FontAwesomeIcon
                            onClick={() => {
                                methodSidebarMap[item.iconName]();
                            }}
                            icon={item}
                            className="sidebar-icon"
                        />
                    </Tippy>
                ))}
            </div>
            <div className="sidebar-footer">
                <div className="avatar-sidebar-container">
                    <Avatar src={process.env.PUBLIC_URL + '/avatar.jpg'} />
                </div>
            </div>
        </div>
    );
};
