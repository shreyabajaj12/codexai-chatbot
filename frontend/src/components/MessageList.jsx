import React from 'react'
import { useSelector } from 'react-redux'
import MessageBubble from './MessageBubble'

const MessageList = () => {
    const { conversation, selectedConversation } = useSelector(state => state.conversation)
    const { message } = useSelector(state => state.message)
  return (
    <div className='flex-1 overflow-y-auto px-6 py-6 space-y-5 
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
             
        {message.length==0 || !selectedConversation?(
            <div className='h-full flex flex-col items-center justify-center gap-4 text-center'>
                <div className='flex flex-col gap-1.5'>
                    <h1 className='text-[20px] font-semibold text-slate-400 tracking-tight'>CodexAI</h1>
                    <p className='text-[15px] font-semibold text-slate-400 tracking-tight'>How can I help you?</p>
                    <p className='text-[13px] text-slate-600 max-w-[260px] lending-relaxed'>Ask me anything - code, ideas, explanation, or just a quick question.</p>
                </div>
            </div>
        ):
        <div>
            {message.map((msg,i)=>(
                <div>
                    <MessageBubble role={msg?.role} content={msg?.content}/>
                </div>
            ))}
        </div>
        }
    </div>
  )
}

export default MessageList
