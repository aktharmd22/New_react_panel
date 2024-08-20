import React from 'react'
import './mian.css'
import ChatApp from './componets/ChatApp'
const Mian = ({open}) => {
  return (
    <div className='container'>
      <ChatApp open={open} />
    </div>
  )
}

export default Mian
