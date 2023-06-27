import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from '../ChatMessage';
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import Thinking from '../Thinking';
import Dropdown from './Dropdown';
import Option from './Dropdown/Option';
import Temperature from './Dropdown/Temperature';
import { MdSend } from 'react-icons/md';
import Filter from 'bad-words';
import { davinci } from '../../utils/davinci';
import { dalle } from '../../utils/dalle';
import service from '../../service';

import data from '../../data';

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
const ChatView = ({ openChat, logout }) => {
  const { user } = useContext(UserContext);
  const { setChats, messages, setMessages } = useContext(ChatContext);
  const [temperature, setTemperature] = useState(0.7);
  const [token, setToken] = useLocalStorage('token');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken');
  const [formValue, setFormValue] = useState('');
  const [thinking, setThinking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const messagesEndRef = useRef();
  const inputRef = useRef();
  const dropdownRef = useRef();

  const isPrivate = openChat?.type === 'private';
  const isCreator = user?.id === openChat?.created_by;

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

  const aiModels = ['ChatGPT', 'DALL-E'];
  const options = [
    { value: 'See participants', callback: showParticipants },
    { value: 'Invite someone...', callback: inviteUser, hidden: isPrivate },
    { value: 'Change to Public', callback: changeToPublicDev, hidden: !isCreator },
    { value: 'Leave Chat', callback: leaveChatDev },
  ].filter(option => !option.hidden);

  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
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

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
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
    inputRef.current.focus();

    // async function getMessages() {
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

    function getMessagesDev() {
      console.log('getMessagesDev')
      const newMessages = data.messages.filter(({ conversation_id }) => {
        return conversation_id === openChat.id;
      });

      setMessages(newMessages)
    }

    if (openChat) {
      getMessagesDev();
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
