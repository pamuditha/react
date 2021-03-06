import React from 'react'
import { Chat, Divider } from '@stardust-ui/react'

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const items = [
  {
    content: (
      <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
    ),
    key: 'message-id-1',
  },
  {
    content: (
      <Chat.Message
        content="Hi"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        avatar={janeAvatar}
      />
    ),
    key: 'message-id-2',
  },
  {
    content: (
      <Chat.Message
        content="Would you like to grab a lunch?"
        author="John Doe"
        timestamp="Yesterday, 10:16 PM"
        mine
      />
    ),
    key: 'message-id-3',
  },
  {
    content: (
      <Chat.Message
        content="Sure! Let's try the new place downtown"
        author="Jane Doe"
        timestamp="Yesterday, 10:15 PM"
        avatar={janeAvatar}
      />
    ),
    key: 'message-id-4',
  },
  {
    content: <Divider content="Today" color="primary" important />,
    key: 'message-id-5',
  },
  {
    content: (
      <Chat.Message
        content="Let's have a call"
        author="John Doe"
        timestamp="Today, 11:15 PM"
        mine
      />
    ),
    key: 'message-id-6',
  },
]

const ChatExample = () => <Chat items={items} />

export default ChatExample
