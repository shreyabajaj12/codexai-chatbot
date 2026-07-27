import React from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/messageSlice'
import getMessages from '../features/getMessages'


const ChatArea = () => {
    const {selectedConversation}=useSelector(state=>state.conversation)
    const dispatch=useDispatch()
    useEffect(()=>{
        const getMessage=async()=>{
            if(selectedConversation){
                const data=await getMessages(selectedConversation?._id)
                dispatch(setMessage(data))
            }
        }
        getMessage()
    },[selectedConversation])
  return (
    <div className='flex-1 flex flex-col'>
        <Nav/>
        <MessageList/>
        <ChatInput/>
      
    </div>
  )
}

export default ChatArea
