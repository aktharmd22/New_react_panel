import React from 'react'
import './list.css'
import UserInfo from './userinfo/UserInfo'
import ChatList from './chatList/ChatList'
const List = ({open}) => {
  return (
    <div className='list'>
      <UserInfo open={open} />
      <ChatList open={open}  />
    </div>
  )
}

export default List
