import React from 'react'
import './userinfo.css'
import more from '../../../images/more.png'
import video from '../../../images/video.png'
import edit from '../../../images/edit.png'
import avatar from '../../../images/avatar.png'
import { useUserStore } from '../../../../lib/userStore'
const UserInfo = ({open}) => {
  const {currentUser} = useUserStore();

  return (
    <div className='userInfo'>
      <div className="user">
      <img src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.username}&background=random`} alt="" />

        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons flex">
        <img src={more} alt="" />
        <img src={video} alt="" />
        <img src={edit} alt="" />
      </div>
    </div>
  )
}

export default UserInfo
