import React from 'react'
import './detail.css'
import { auth } from '../../../lib/firebase'
import avatar from '../../images/avatar.png'
import arrowDown from '../../images/arrowDown.png'
import arrowUp from '../../images/arrowUp.png'
import download from '../../images/download.png'
const Detail = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src={avatar} alt="" />
        <h2>Ajay Kumar</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src={arrowDown} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src={arrowUp} alt="" />
          </div>
          <div className='photos'>

            <div className='photoItem'>
              <div className="photoDetail">
                <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src={download} alt=""  className="icons"  />
            </div>
            <div className='photoItem'>
                <div className="photoDetail">
                  <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                <img src={download} alt=""  className="icons" />
                </div>
                
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className='logout' onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  )
}

export default Detail
