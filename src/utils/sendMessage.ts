

export interface ChatCompletionRequestMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}
export const sendMessage = async (messages: ChatCompletionRequestMessage[]) => {
  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
