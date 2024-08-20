import React, { useEffect } from 'react'
import List from './list/List'
import Chat from './chats/Chat'
import Detail from './detail/Detail'
import Login from './login/Login'
import Notification from './notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth} from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore'
const ChatApp = ({ open }) => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();

  //const user = false;

  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
     
      fetchUserInfo(user?.uid);


    });

    return ()=>{
      unSub();
    }
  }, [fetchUserInfo])

  // console.log(currentUser);


  return (
    <div className='container'>
      {
        currentUser ? (
          <>
            <List open={open} />
            <Chat />
            
          </>
        ) : (
          <Login />
        )
      }
      <Notification />
    </div>
  )
}

export default ChatApp
