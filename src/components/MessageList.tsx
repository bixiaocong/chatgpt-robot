"use client"
import { useMessages } from '../utils/useMessages'
import { useRef, useEffect } from 'react'

const MessagesList = () => {
  const { messages, isLoadingAnswer } = useMessages()
  const list = useRef<HTMLDivElement>(null)
  // 监听 messages 的变化，当 messages 变化时，滚动到最新的消息
  useEffect(() => {
    if (list.current) {
      list.current.scrollTop = list.current.scrollHeight
    }
  }, [messages?.length])
  return (
    <div className="max-w-3xl h-full overflow-y-auto mx-auto pt-8 pb-[135px]" ref={list}>
      {messages?.map((message, i) => {
        const isUser = message.role === 'user'
        if (message.role === 'system') return null
        return (
          <div
            id={`message-${i}`}
            className={`flex mb-4 fade-up ${isUser ? 'justify-end' : 'justify-start'}`}
            key={i}
          >
            {!isUser && <img src="/1.png" className="w-9 h-9 rounded-full" alt="avatar" />}
            <div
              style={{ maxWidth: 'calc(100% - 45px)' }}
              className={`group relative px-3 py-2 rounded-lg ${
                isUser
                  ? 'mr-2 bg-gradient-to-br from-primary-700 to-primary-600 text-white'
                  : 'ml-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              {message.content.trim()}
            </div>
            {isUser && (
              <img
                src="/person.png"
                className="w-9 h-9 rounded-full cursor-pointer"
                alt="avatar"
              />
            )}
          </div>
        )
      })}
      {isLoadingAnswer && (
        <div className="flex justify-start mb-4">
          <img src="/1.png" className="w-9 h-9 rounded-full" alt="avatar" />
          <div className="loader ml-2 p-2.5 px-4 bg-gray-200 dark:bg-gray-800 rounded-full space-x-1.5 flex justify-between items-center relative">
            <span className="block w-3 h-3 rounded-full"></span>
            <span className="block w-3 h-3 rounded-full"></span>
            <span className="block w-3 h-3 rounded-full"></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesList
