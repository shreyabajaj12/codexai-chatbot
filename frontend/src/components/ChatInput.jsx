import { Mic, Paperclip, Send } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import sendMessage from '../features/sendMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setMessage } from '../redux/messageSlice'

const ChatInput = () => {
    const [value ,setValue]=useState("")
    const { selectedConversation } = useSelector(state => state.conversation)
    const { message } = useSelector(state => state.message)
    const dispatch =useDispatch()
    const handleSendMessage=async()=>{
        const payload={
            prompt:value.trim(),conversationId:selectedConversation?._id
        }

        // dispatch(
        //     setMessage([
        //         ...message,
        //         {
        //         role: "user",
        //         content: value.trim(), 
        //         },
        //     ])
        // );

        dispatch(addMessage({role:"user",content:value.trim()}))
        setValue("")
        const data =await sendMessage(payload)
        dispatch(addMessage({role:"assistant",content:data}))
        console.log(data)
    }
  return (
    <div className='w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/[0.06] bg-gray-950]'>
        <div className='flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3'>
        <textarea 
        value={value}
        placeholder='Ask anything...'
        onChange={(e)=>setValue(e.target.value)}
         className='w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 
        placeholder:text-slate-600 leading relaxed [scrollbar-wisth:none] [&::-webkit-scrollbar]:hidden 
        disabled:opacity-50
        '>
        </textarea>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1'>
                <button className='flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400
                    hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all
                    duration-150 bg-transparent cursor-pointer
                '>
                    <Paperclip size={16}/>
                </button>
                <button className='flex items-center  justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400
                    hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all
                    duration-150 bg-transparent cursor-pointer 
                '>
                    <Mic size={16}/>
                </button>
            </div>
            <button 
            onClick={handleSendMessage}
            disabled={!value}
            className={`flex items-center justify-center w-8 h-8 border-none cursor-pointer transition-all duration-150 ${value.trim()?"bg-linear-to-br from-indigo-500 to-violet-300 hover:opacity-90 text-white rounded-lg":"bg-white/[0.05] text-slate-600 cursor-not-allowed rounded-lg"}`}>
                <Send size={16}/>
            </button>
        </div>
        </div>
      
    </div>
  )
}

export default ChatInput
