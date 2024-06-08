"use client";
import MessageBottom from '../components/MessageBottom'
import MessagesList from '../components/MessageList'
import { MessagesProvider } from '../utils/useMessages'
import { ToastProvider } from '@apideck/components'

export default function Home() {
  return (
    <ToastProvider>
      <div className="h-screen bg-gray-50">
        <MessagesProvider>
          <MessagesList />
          <div className="fixed bottom-0 right-0 left-0">
            <MessageBottom />
          </div>
        </MessagesProvider>
      </div>
    </ToastProvider>
  );
}
