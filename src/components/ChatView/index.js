import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import Filter from 'bad-words';
import { MdSend } from 'react-icons/md';
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import Dropdown from './Dropdown';
import Option from './Dropdown/Option';
import Temperature from './Dropdown/Temperature';
import AiModels from './Dropdown/AiModels';
import Participants from './Participants';
import ChatMessage from '../ChatMessage';
import Thinking from '../Thinking';
import { davinci } from '../../utils/davinci';
import { dalle } from '../../utils/dalle';

import service from '../../service';

const ChatView = ({ openChat, openChatType, setOpenChat, setMainModal, activeSpace, logout }) => {
  const { user } = useContext(UserContext);
  const { chats, setChats, messages, setMessages } = useContext(ChatContext);

  const [token, setToken] = useLocalStorage('token');
  const [refreshToken] = useLocalStorage('refreshToken');
  const [openaiApiKey] = useLocalStorage('openaiApiKey');

  const [, setGptConfirmation] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isGPTEnabled, setIsGPTEnabled] = useState(!!openaiApiKey);
  const [thinking, setThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [temperature, setTemperature] = useState(0.7);
  const [formValue, setFormValue] = useState('');
  const [participants, setParticipants] = useState([]);

  const aiModels = ['ChatGPT', 'GPT-4', 'DALL-E', 'Whisper'];
  const [selectedAiModel, setSelectedAiModel] = useState(aiModels[0]);

  const messagesEndRef = useRef();
  const inputRef = useRef();
  const dropdownRef = useRef();
  const aiModelsRef = useRef();

  const isPrivate = openChat?.type === 'private';
  const isCreator = user?.id === openChat?.created_by;
  const isParticipant = !!participants?.filter((p) => p.id === user?.id)?.length;

  const toggleGPT = () => {
    setIsGPTEnabled(!isGPTEnabled);
    setGptConfirmation(`GPT is now ${!isGPTEnabled ? 'Enabled' : 'Disabled'}`);

    setTimeout(() => {
      setGptConfirmation(null);
    }, 3000);
  };

  const changeToPublicDev = () => {
    if (
      window.confirm(
        'Are you sure you want to change this chat to public? This cannot be undone later.'
      )
    ) {
      setChats((prev) =>
        prev?.map((chat) => {
          if (chat.id === openChat?.id) {
            return { ...chat, type: 'public' };
          }
          return chat;
        })
      );
    }
  };

  const leaveChatDev = () => {
    if (window.confirm('Are you sure you want to leave this chat?')) {
      setChats((prev) => prev?.filter((chat) => chat.id !== openChat?.id));

      if (openChat.type === 'private') {
        setMessages((prev) =>
          prev?.map((msg) => {
            if (msg.conversation_id === openChat?.id) {
              return { ...msg, conversation_id: null };
            }

            return msg;
          })
        );
      }

      if (openChat.type === 'public') {
        setMessages((prev) =>
          prev?.map((msg) => {
            if (msg.conversation_id === openChat?.id) {
              return { ...msg, conversation_id: null };
            }
            return msg;
          })
        );
      }
    }
  };

  const options = [
    {
      value: 'See participants',
      show: isMobile && !isPrivate && !isCreator,
      callback: () => setMainModal('Participants'),
    },
    {
      value: 'Manage participants',
      show: !isPrivate && isCreator,
      callback: () => setMainModal('Manage Participants'),
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
  ].filter((option) => option.show);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMessage = async (newData, ai = false) => {
    const data = { user_id: user?.id, ...newData }
    const path = `/conversations/${data.conversation_id}/messages`;
    
    try {
      await service.post(path, data);

      setMessages((messages) => [...messages, { ...data, selected, ai }]);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChat = async () => {
    const data = {
      title: 'New Chat',
      created_by: user?.id,
      type: openChatType || 'private',
      organization_id: activeSpace?.id,
    };

    const newChat = await service.post('/conversations', data);

    return newChat;
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    // if (!openaiApiKey) {
    //   setMainModal('OpenAI API Key');
    //   return;
    // }

    const newChat = openChat || await createNewChat();
    const { id: conversation_id } = newChat;

    setChats((prev) => {
      if (!prev?.filter((chat) => chat.id === newChat.id)?.length) {
        return [...prev, newChat];
      }
      return prev;
    });
    setOpenChat(newChat);

    if (openChat && !isParticipant) {
      setParticipants((prev) => [...prev, user]);
    }

    if (isGPTEnabled) {
      setThinking(true);
    }

    const filter = new Filter();
    const cleanPrompt = filter.isProfane(formValue)
      ? filter.clean(formValue)
      : formValue;
    const newMsg = { content: cleanPrompt, conversation_id };

    setFormValue('');
    await updateMessage(newMsg, false);

    if (!isGPTEnabled) {
      return;
    }

    try {
      if (selected === 'ChatGPT') {
        const criteria = {
          prompt: cleanPrompt,
          temperature, messages,
          key: openaiApiKey
        };
        const response = await davinci(criteria);
        const data = response.data.choices[0].message.content;
        data && await updateMessage(data, true);
      } else if (selected === 'DALL-E') {
        const response = await dalle(cleanPrompt, openaiApiKey);
        const data = response.data.data[0].url;
        data && await updateMessage(data, true);
      }
    } catch (err) {
      window.alert(`Error: ${err} please try again later`);
    }

    setThinking(false);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      await sendMessage(e);
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
    const init = async () => {
      console.log('used openChat', openChat)
      const data = await service.get(`/chatview?chat=${openChat?.id}`);

      console.log({ data })

      setMessages(data.messages);
      setParticipants(data.participants);
    }

    if (openChat) {
      console.log({ openChat })
      init();
    }
  }, [openChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  isParticipant && inputRef.current.focus();

  return (
    <div className="chatview">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        {!openChat && (
          <Dropdown selected={selectedAiModel} dropdownRef={aiModelsRef}>
            <AiModels aiModels={aiModels} setSelected={setSelectedAiModel} />
          </Dropdown>
        )}
      </div>
      <main className="chatview__chatarea">
        {messages?.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            selected={selected}
            participants={participants}
            aiModels={aiModels.map((m) => m.toLowerCase())}
          />
        ))}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
        {!!participants?.length && openChat && (
          <Participants
            participants={participants}
            openChat={openChat}
          />
        )}
      </main>
      <form
        className="form flex items-center py-2 space-x-2"
        onSubmit={sendMessage}
      >
        <Dropdown
          className="flex-grow"
          classes="bottom-full"
          dropdownRef={dropdownRef}
          options={options}
          selected={selected}
          inverted={true}
          onChange={setSelected}
        >
          <Temperature temperature={temperature} onChange={setTemperature} />

          {options.map((option, index) => (
            <Option
              key={index}
              option={option}
              index={index}
              ref={dropdownRef}
              onChange={setSelected}
            />
          ))}
        </Dropdown>

        <div className="flex flex-grow items-stretch justify-between w-full space-x-4">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message flex-grow border border-gray-300 rounded-lg p-2"
            placeholder={!isParticipant ? 'Write a message to join chat.' : ''}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFormValue(e.target.value)}
          />

          <div className="flex flex-col justify-start items-end w-fit pr-6 ml-2">
            <button
              className={`
                flex items-center justify-center w-full h-7 rounded-full shadow-md 
                transition-all duration-200 ease-in-out transform hover:scale-105 
                ${isGPTEnabled ? 'bg-green-400' : 'bg-red-500'} 
                hover:${isGPTEnabled ? 'bg-green-500' : 'bg-red-600'}
              `}
              type='button'
              onClick={toggleGPT}
            >
              <span className="text-white font-semibold">GPT</span>
            </button>

            <div className="flex-grow flex items-center">
              <button
                type="submit"
                className={`
                  chatview__btn-send bg-dark-grey disabled:cursor-not-allowed bg-opacity-90 disabled:bg-dark-grey hover:bg-blue-900 hover:bg-opacity-80 text-white hover:text-white font-semibold py-2 px-4 
                  rounded-3xl shadow-lg transform hover:scale-105 disabled:scale-100 disabled:opacity-30 disabled:text-white
                  transition-all duration-200 ease-in-out outline-none
              `}
                disabled={!formValue}
                aria-disabled={!formValue}
              >
                <MdSend size={24} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatView;
