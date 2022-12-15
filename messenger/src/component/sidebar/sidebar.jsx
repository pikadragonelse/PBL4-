import { faComments, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faPhoneVolume, faUserPlus } from '@fortawesome/free-solid-svg-icons';
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

const iconSideBarIconMap = [faComments, faCircleUser, faPhoneVolume, faUserPlus];
export const Sidebar = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const methodSidebarMap = {
        comments: () => {
            setIsOpenModal(true);
        },
        'circle-user': () => {
            setIsOpenModal(true);
        },
        'phone-volume': () => {
            setIsOpenModal(true);
        },
        'user-plus': () => {
            setIsOpenModal(true);
        },
    };

    const nameTooltipMap = {
        comments: 'Stranger message',
        'circle-user': 'Your information',
        'phone-volume': 'Call history',
        'user-plus': 'Add new friend',
    };

    return (
        <div className="sidebar-main">
            <div className="sidebar-nav">
                <Modal
                    isOpenModalRequest={isOpenModal}
                    setIsOpenModalRequest={setIsOpenModal}
                    content={<FormAddFriend />}
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
