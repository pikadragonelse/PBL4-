import React from 'react'

import './form-add-friend.css'
import { ListFriendRecommendItem } from './list-friend-recommend-item/list-friend-recommend-item'

export const FormAddFriend = () => {
  return (
    <div className="form-add-friend-body">
      <ul className="list-friend-recommend">
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
        <ListFriendRecommendItem
          avatar={`${process.env.PUBLIC_URL}/avatar.jpg`}
          nameUser="Long"
        />
      </ul>
    </div>
  )
}
