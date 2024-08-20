import React, { useEffect, useState } from 'react'
import './chat.css'
import avatar from '../../images/avatar.png'
import phone from '../../images/phone.png'
import video from '../../images/video.png'
import info from '../../images/info.png'
import emoji from '../../images/emoji.png'
import image from '../../images/img.png'
import camera from '../../images/camera.png'
import mic from '../../images/mic.png'
import EmojiPicker from 'emoji-picker-react';
import { useRef } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
const Chat = () => {
  const [chat,setChat]= useState()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const endRef = useRef(null)
  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior : "smooth"});
  }, [])



  const handleEmoji =(e)=>{
    setText((prev)=> prev + e.emoji)
    setOpen(false)
  }

  return (
    <div className='chat' >
      <div className="top">
          <div className='user'>
            <img src={avatar} alt="" />
            <div className='texts'>
              <span>Ajay Kumar</span>
              <p>Lorem ipsum dolor, sit amet.</p>
            </div>
          </div>
          <div className='icons'>
            <img src={phone} alt="" />
            <img src={video} alt="" />
            <img src={info} alt="" />
          </div>
      </div>
      <div className="center">
        <div className='message'>
          <img src={avatar} alt="" />
          <div className='texts'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate sit expedita aliquam explicabo minima et assumenda id dignissimos reiciendis voluptates perferendis deserunt, minus eligendi quibusdam laborum dolorum rerum rem repellendus!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          <div className='texts'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate sit expedita aliquam explicabo minima et assumenda id dignissimos reiciendis voluptates perferendis deserunt, minus eligendi quibusdam laborum dolorum rerum rem repellendus!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <img src={avatar} alt="" />
          <div className='texts'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate sit expedita aliquam explicabo minima et assumenda id dignissimos reiciendis voluptates perferendis deserunt, minus eligendi quibusdam laborum dolorum rerum rem repellendus!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
       
          <div className='texts'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate sit expedita aliquam explicabo minima et assumenda id dignissimos reiciendis voluptates perferendis deserunt, minus eligendi quibusdam laborum dolorum rerum rem repellendus!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message'>
          <img src={avatar} alt="" />
          <div className='texts'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate sit expedita aliquam explicabo minima et assumenda id dignissimos reiciendis voluptates perferendis deserunt, minus eligendi quibusdam laborum dolorum rerum rem repellendus!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className='message own'>
          
          <div className='texts'>
            <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate sit expedita aliquam explicabo minima et assumenda id dignissimos reiciendis voluptates perferendis deserunt, minus eligendi quibusdam laborum dolorum rerum rem repellendus!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className='icons'>
        <img src={image} alt="" />
            <img src={camera} alt="" />
            <img src={mic} alt="" />
        </div>
        <input type="text" value={text} placeholder='Type a mesage...' onChange={(e)=> setText(e.target.value)} />
        <div className='emoji'>
          <img src={emoji} alt="emoji" onClick={()=>setOpen(prev=> !prev)}  />
          <div className='picker'>
          <EmojiPicker open={open} onEmojiClick={handleEmoji} />

          </div>
        </div>
        <button className='sendButton'>send</button>
      </div>
    </div>
  )
}

export default Chat
