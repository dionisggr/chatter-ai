import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from '../ChatMessage';
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import Thinking from '../Thinking';
import Dropdown from './Dropdown';
import Option from './Dropdown/Option';
import Temperature from './Dropdown/Temperature';
import Participants from './Participants';
import { MdSend } from 'react-icons/md';
import Filter from 'bad-words';
import { davinci } from '../../utils/davinci';
import { dalle } from '../../utils/dalle';
import service from '../../service';

import data from '../../data';

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = ({ openChat, setOpenChat, logout }) => {
  const { user } = useContext(UserContext);
  const { setChats, messages, setMessages } = useContext(ChatContext);
  const [temperature, setTemperature] = useState(0.7);
  const [token, setToken] = useLocalStorage('token');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken');
  const [formValue, setFormValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const messagesEndRef = useRef();
  const inputRef = useRef();
  const dropdownRef = useRef();

  const isPrivate = openChat?.type === 'private';
  const isCreator = user?.id === openChat?.created_by;
  const isParticipant = !!participants.filter((p) => p.id === user?.id).length;
  const aiModels = ['ChatGPT', 'DALL-E'];

  const showParticipants = () => {
    // Code here
  };

  const inviteUser = () => {
    // Code here
  };
    
  const changeToPublicDev = () => {
    setChats((prev) => prev.map((chat) => {
      if (chat.id === openChat.id) {
        return { ...chat, type: 'public' };
      }
      return chat;
    }));

    data.conversations = data.conversations.map((c) => {
      if (c.id === openChat.id) {
        return { ...c, type: 'public' };
      }
      return c;
    });
  };

  const leaveChatDev = () => {
    setChats((prev) => prev.filter((chat) => chat.id !== openChat.id));

    data.user_conversations = data.user_conversations.filter((c) => {
      return c.id !== openChat.id && c.created_by !== openChat.created_by;
    });

    if (openChat.type === 'private') {
      setMessages((prev) => prev.filter((msg) => msg.chat_id !== openChat.id));
    }

    if (openChat.type === 'public') {
      setMessages((prev) => prev.map((msg) => {
        if (msg.conversation_id === openChat.id) {
          return { ...msg, conversation_id: null };
        }
        return msg;
      }));
    }
  };

  const options = [
    {
      value: 'See participants',
      show: isMobile && !isPrivate && !isCreator,
      callback: showParticipants,
    },
    {
      value: 'Manage participants',
      show: !isPrivate && isCreator,
      callback: showParticipants,
    },
    {
      value: 'Invite someone...',
      show: !isPrivate && isParticipant,
      callback: inviteUser,
    },
    {
      value: 'Change to Public',
      show: isPrivate,
      callback: changeToPublicDev,
    },
    {
      value: 'Leave Chat',
      show: !isPrivate && isParticipant,
      callback: leaveChatDev,
    },
  ].filter(option => option.show);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMessage = (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`,
    };

    setMessages((messages) => [...messages, newMsg]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const key = window.localStorage.getItem('chatter-ai');
    if (!key) {
      setModalOpen(true);
      return;
    }

    const filter = new Filter();
    const cleanPrompt = filter.isProfane(formValue)
      ? filter.clean(formValue)
      : formValue;

    const newMsg = cleanPrompt;
    const aiModel = selected;

    setThinking(true);
    setFormValue('');
    updateMessage(newMsg, false, aiModel);

    try {
      if (aiModel === aiModels[0]) {
        const criteria = { prompt: cleanPrompt, temperature, messages, key };
        const response = await davinci(criteria);
        const data = response.data.choices[0].message.content;
        data && updateMessage(data, true, aiModel);
      } else if ('DALL-E') {
        const response = await dalle(cleanPrompt, key);
        const data = response.data.data[0].url;
        data && updateMessage(data, true, aiModel);
      }
    } catch (err) {
      window.alert(`Error: ${err} please try again later`);
    }

    setThinking(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    inputRef.current.focus();

    // const getMessages = async () => {
    //   const response = await service.get('/messages', token)

      // if (!response.ok) {
      //   const reauthorization = await service.reauthorize(response, refreshToken);

      //   if (reauthorization.ok) {
      //     const auth = await reauthorization.json();

      //     setToken(token);
      //   } else {
      //     logout();
      //   }
      // }

    //   const data = await response.json();
    //   const newMessages = data.filter(({ conversation_id }) => {
    //     return conversation_id === openChat.id;
    //   });

    //   setMessages(newMessages);
    // }

    const getMessagesDev = () => {
      const newMessages = data.messages.filter(({ conversation_id }) => {
        return conversation_id === openChat.id;
      });
      console.log({ newMessages })

      setMessages(newMessages)
    }

    const getParticipantsDev = () => {
      const newParticipantIds = data.user_conversations.filter(({ conversation_id }) => {
        return conversation_id === openChat.id;
      }).map(({ user_id }) => user_id);
      const newParticipants = data.users.filter(({ id }) => {
        return newParticipantIds.includes(id);
      });

      setParticipants(newParticipants);
    }

    if (openChat) {
      getMessagesDev();
      getParticipantsDev();
    } else {
      setMessages([]);
    }
  }, [user, openChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  return (
    <div className='chatview'>
      <main className='chatview__chatarea'>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
        <Participants participants={participants} />
      </main>
      <form className='form flex items-center' onSubmit={sendMessage}>
        <Dropdown
          options={options}
          selected={selected}
          setSelected={setSelected}
          dropdownRef={dropdownRef}
        >
          <Temperature
            temperature={temperature}
            setTemperature={setTemperature}
          />
          {options.map((option, index) => (
            <Option
              key={index}
              option={option}
              index={index}
              dropdownRef={dropdownRef}
              setSelected={setSelected}
            />
          ))}
        </Dropdown>
        <div className='flex items-stretch justify-between w-full'>
          <textarea
            ref={inputRef}
            className='chatview__textarea-message'
            placeholder={`${!isParticipant ? 'Write a message to join chat.' : '' }`}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button
            type='submit'
            className='chatview__btn-send'
            disabled={!formValue}>
            <MdSend size={30} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatView;
