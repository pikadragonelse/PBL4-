import React from 'react'
import { Avatar } from '../../avatar'
import { Button } from '../../button'

import './list-friend-recommend-item.css'

export const ListFriendRecommendItem = ({ avatar, nameUser }) => {
  return (
    <li className="list-friend-recommend-item">
      <div className="list-friend-recommend-info">
        <div className="list-friend-recommend-item-container-avt">
          <Avatar src={avatar} />
        </div>
        <h2 className="list-friend-recommend-item-name">{nameUser}</h2>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="list-friend-recommend-item-button"
      >
        <Button primary>Add friend</Button>
      </div>
    </li>
  )
}
