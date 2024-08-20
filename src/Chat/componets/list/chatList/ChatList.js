import React, { useEffect, useState } from 'react';
import './chatList.css';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import search from '../../../images/search.png';
import plus from '../../../images/plus.png';
import minus from '../../../images/minus.png'
// import avatar from '../../../images/avatar.png'
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../../lib/userStore';
import { db } from '../../../../lib/firebase';
const ChatList = ({open}) => {
    const [addMore, setAddMore] = useState(false)
  const [chats, setChats] = useState(false)
    const  {currentUser} = useUserStore()

    useEffect(()=>{
      

      const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
        const items = await res.data().chats;

        const promises = items.map(async(item)=>{
          const userDocRef = doc(db,"users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user}
        });
        const chatData = await Promise.all(promises)    
        setChats(chatData.sort((a, b) => b.user.updatedAt - a.user.updatedAt));

      });

      return ()=>{
        unSub()
      }
    },[currentUser.id])
    return (
      <div className='chatList'>
        <div className="search">
          <div className="searchBar">
            <img src={search} alt="" />
            <input type="text" placeholder='search' />
          </div>
          <img src={addMore ? minus : plus } alt="" className="add" onClick={()=>setAddMore((prev)=>!prev)} />
        </div>
        {chats && chats.map((chat)=>(
        <div className='item' key={chat.chatId}>
          <img src={chat.user.avatar || `https://ui-avatars.com/api/?name=${chat.user.username}&size=200`
} alt="" />
          <div className='texts'>
              <span>{chat.user.username}</span>
              <p>{chat.lastMessage}</p>
          </div>
        </div>))}
        {addMore && <AddUser />}
      </div>
    );
    
};

export default ChatList;
