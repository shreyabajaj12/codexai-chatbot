import { MessageCircleMore } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { setSelectedConversation } from '../redux/conversationSlice'

const Nav = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { message } = useSelector(state => state.message)

    return (
        <>
        {selectedConversation && 
        <div className='h-15 flex items-center px-5 border-b gap-2.5 border-white/[0.06] bg-gray-950'>
            <div className='flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/2'>
                <MessageCircleMore size={13}  className='text-indigo-400' />
            </div>
            <div className='text-[14px] font-semibold text-slate-100 tracking-tight'>
                {selectedConversation?.title || "New Chat"}
            </div>
            <div className='text-[10px] font-medium text-slate-600 bg-white/[0.04] border border-white/[0.06]
            px-2 py-0.5 rounded-full'>
                {message?.length} Messages
            </div>
        </div>}
        </>
)
}

export default Nav
