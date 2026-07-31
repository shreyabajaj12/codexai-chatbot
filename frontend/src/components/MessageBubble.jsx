import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
const MessageBubble = ({role,content,images}) => {
  const isUser=role=="user"
  return (
    <div className={`flex ${isUser? "justify-end":"justify-start"}`}>
      <div
      className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed
        ${
          isUser?
          "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm":
          "bg-white/[0.04] border border-white/[0.07] text-slate-200 rounded-tl-sm"
        }
        `}
      >
        {images.length >0 &&(
          <div className='flex flex-wrap gap-3 mt-4'>
            {images.map((img,i)=>(
              <img 
              key={i}
              loading="lazy"
              onError={(e)=>e.currentTarget.remove()}
              src={img} 
              className='w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition'
              alt="" />
            ))}
          </div>
        )}
        
        
        <Markdown>
        {content}
        </Markdown>
        </div>
      
    </div>
  )
}

export default MessageBubble
