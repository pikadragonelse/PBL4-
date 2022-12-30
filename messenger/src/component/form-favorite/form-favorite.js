import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from '../button';
import { Tag } from '../tag';

import './form-favorite.css';
import { api } from '../../api';

export const FormFavorite = ({ user, isOpen, setIsOpenFavoriteFrom }) => {
    const [listFavoriteUser, setListFavoriteUser] = useState([]);
    const filterFavorite = (listFavoritesMap) => {
        let listFavorites = [];
        Object.keys(listFavoritesMap).forEach((item) => {
            if (listFavoritesMap[item] !== 2.5 && item !== 'idUserFavorite') {
                listFavorites.push(item.replace('_', ' '));
            }
        });
        return listFavorites;
    };

    const convertListToSendServer = (listFavoritesMap) => {
        let listFavorites = [];
        listFavoritesMap.forEach((item) => {
            listFavorites.push(item.replace(' ', '_'));
        });
        return listFavorites;
    };

    const checkMyFavorite = (favorite) => {
        return listFavoriteUser.some((item) => item === favorite);
    };
    const map = [
        'code',
        'an uong',
        'ca nhac',
        'choi game',
        'coffee',
        'doc sach',
        'du lich',
        'nau an',
        'the thao',
        'xem phim',
    ];

    const checkIsSelect = () => {
        let listNonSelect = [];
        map.forEach((item) => {
            if (listFavoriteUser.some((favorite) => favorite === item) === false) {
                listNonSelect.push(item);
            }
        });
        return convertListToSendServer(listNonSelect);
    };

    const getAllFavoriteOfUser = () => {
        fetch(`${api}/api/user/get-user-favorite`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setListFavoriteUser(filterFavorite(data));
            })
            .catch((error) => console.log(error));
    };

    const updateFavoriteUser = (listFavorites) => {
        const listToSendServer = {};
        let score = 5;
        convertListToSendServer(listFavorites).forEach((item) => {
            listToSendServer[item] = `${score}f`;
            score--;
        });

        checkIsSelect().forEach((item) => (listToSendServer[item] = '2.5f'));

        fetch(`${api}/api/user/add-user-favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user.type} ${user.token}`,
            },
            body: JSON.stringify(listToSendServer),
        })
            .then(() => setIsOpenFavoriteFrom(false))
            .catch((error) => console.log(error));
    };

    const addToListFavoriteUser = (favorite) => {
        if (listFavoriteUser.length < 5) {
            setListFavoriteUser([...listFavoriteUser, favorite]);
        }
    };

    const removeFromListFavorite = (favorite) => {
        if (listFavoriteUser.length > 0) {
            setListFavoriteUser(listFavoriteUser.filter((item) => item !== favorite));
        }
    };

    useEffect(() => {
        getAllFavoriteOfUser();
    }, [isOpen]);

    return (
        <div className="form-favorite-container">
            <div className="form-favorite">
                {map.map((item) => (
                    <Tag
                        key={item}
                        addToListFavoriteUser={addToListFavoriteUser}
                        type={checkMyFavorite(item) === false ? `choiceFavoriteTag` : ''}
                        removeFromListFavorite={removeFromListFavorite}
                    >
                        {item}
                    </Tag>
                ))}
            </div>
            <Button onClick={() => updateFavoriteUser(listFavoriteUser)} className="form-favorite-btn" primary>
                Save
            </Button>
        </div>
    );
};
