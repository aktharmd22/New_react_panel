import React, { useState } from 'react'
import avatar from '../../../../images/avatar.png'
import './addUser.css'
import { db } from '../../../../../lib/firebase'
import { collection, query, getDocs, where, doc, setDoc, serverTimestamp, arrayUnion, updateDoc } from 'firebase/firestore'
import { useUserStore } from '../../../../../lib/userStore'

const AddUser = () => {
  const [user, setUser] = useState(null)
  const {currentUser} = useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username))
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data())
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userchatsRef = collection(db, "userchats")
    try {
      const newChatRef = doc(chatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      })
      await updateDoc(doc(userchatsRef, user.id),{
        chats:arrayUnion({
          chatId:newChatRef.id,
          lastMessage: "",
          receiverId :currentUser.id,
          updatedAt:Date.now(),
        }),
      })
      await updateDoc(doc(userchatsRef, currentUser.id),{
        chats:arrayUnion({
          chatId:newChatRef.id,
          lastMessage: "",
          receiverId :user.id,
          updatedAt:Date.now(),
        }),
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='addUser'>
      <form action="" onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name="username" />
        <button type="submit">Search</button>
      </form>
      {user && <div className='user'>
        <div className='detail'>
          <img src={user.avatar ||  `https://ui-avatars.com/api/?name=${user.username}&background=random`} alt="" />
          <span className=''>{user.username}</span>
        </div>
        <button onClick={handleAdd} className=''>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
