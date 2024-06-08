"use client"
import { useToast } from '@apideck/components'
import type { ChatCompletionRequestMessage } from './sendMessage'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { sendMessage } from './sendMessage'

interface ContextProps {
  messages: ChatCompletionRequestMessage[]
  addMessage: (content: string) => Promise<void>
  isLoadingAnswer: boolean
}

const ChatsContext = createContext<Partial<ContextProps>>({})

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  useEffect(() => {
    const initializeChat = () => {
      const welcomeMessage: ChatCompletionRequestMessage = {
        role: 'assistant',
        content: '您好，请问有什么可以帮助您的?'
      }
      setMessages([welcomeMessage])
    }

    // When no messages are present, we initialize the chat the system message and the welcome message
    // We hide the system message from the user in the UI
    if (!messages?.length) {
      initializeChat()
    }
  }, [messages?.length, setMessages])

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true)
    try {
      const newMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content
      }
      const newMessages = [...messages, newMessage]

      // Add the user message to the state so we can see it immediately
      setMessages(newMessages)
      const { data } = await sendMessage(newMessages)
      if (!data.choices) {
        addToast({ title: data?.error?.message || '服务器错误，请重新提交您的问题', type: 'error' })
        return
      }
      const reply = data.choices[0].message

      // Add the assistant message to the state
      setMessages([...newMessages, reply])
      
    } catch (error) {
      console.log(error);
      // Show error when something goes wrong
      addToast({ title: '服务器错误，请重新提交您的问题', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps
}
