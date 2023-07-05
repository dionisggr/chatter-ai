import React, { useState, useRef, useEffect, useContext } from 'react';
import Filter from 'bad-words';
import { MdSend } from 'react-icons/md';
import { ChatContext } from '../../context/ChatContext';
import { UserContext } from '../../context/UserContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import Dropdown from './Dropdown';
import Option from './Dropdown/Option';
import Slider from './Dropdown/Slider';
import AiModels from './Dropdown/AiModels';
import Participants from './Participants';
import ChatMessage from '../ChatMessage';
import Thinking from '../Thinking';
import { davinci } from '../../utils/davinci';
import { dalle } from '../../utils/dalle';
import service from '../../service';

const ChatView = ({
  openChat,
  openChatType,
  setOpenChat,
  setMainModal,
  activeSpace,
  participants,
  setParticipants,
}) => {
  const { user } = useContext(UserContext);
  const { chats, setChats, messages, setMessages } = useContext(ChatContext);

  const [openaiApiKey, , , clearStorage] = useLocalStorage('openaiApiKey');

  const [, setGptConfirmation] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isGPTEnabled, setIsGPTEnabled] = useState(!!openaiApiKey);
  const [thinking, setThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [formValue, setFormValue] = useState('');

  const aiModels = ['ChatGPT', 'GPT-4', 'DALL-E'];
  const [selectedAiModel, setSelectedAiModel] = useState(aiModels[0]);

  const messagesEndRef = useRef();
  const inputRef = useRef();
  const dropdownRef = useRef();
  const aiModelsRef = useRef();

  const isPrivate = openChat?.type === 'private';
  const isCreator = user?.id === openChat?.created_by;
  const isParticipant = !!participants?.filter((p) => p.id === user?.id)
    ?.length;

  const toggleGPT = () => {
    if (!isGPTEnabled && !openaiApiKey) {
      setMainModal('OpenAI API Key');
    } else {
      setIsGPTEnabled(!isGPTEnabled);
      setGptConfirmation(`GPT is now ${!isGPTEnabled ? 'Enabled' : 'Disabled'}`);

      setTimeout(() => {
        setGptConfirmation(null);
      }, 3000);
    }
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

  const handleLeaveChat = async () => {
    if (window.confirm('Are you sure you want to leave this chat?')) {
      try {
        await service.post(`/chats/${openChat?.id}/leave`, {});

        if (openChat.type === 'public') {
          const newMsg = {
            content: `${user?.username || user?.first_name || user?.id} left the chat.`,
            user_id: 'chatterai',
          };

          await updateMessage(newMsg, true);

          setParticipants((prev) =>
            prev?.filter((participant) => participant.id !== user?.id)
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleJoinChat = async () => {
    try {
      await service.post(`/chats/${openChat?.id}/join`, {});

      setParticipants((prev) => [...prev, user]);

      const newMsg = {
        content: `${user?.username || user?.first_name || user?.email} joined the chat.`,
        user_id: 'chatterai',
      };
      await updateMessage(newMsg, true);
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    {
      value: 'See participants',
      show: isMobile && !isPrivate && !isCreator,
      callback: () => setMainModal('Manage Participants'),
    },
    {
      value: 'Manage participants',
      show: isCreator && !isPrivate,
      callback: () => setMainModal('Manage Participants'),
    },
    {
      value: 'Change to Public',
      show: isPrivate,
      callback: changeToPublicDev,
    },
  ].filter((option) => option.show);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMessage = async (newData, ai = false) => {
    const data = { user_id: user?.id, ...newData };
    const path = `/conversations/${openChat?.id}/messages`;
    try {
      await service.post(path, data);

      setMessages((messages) => [...messages, { ...data, selected, ai }]);
    } catch (error) {
      console.error(error);
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

    if (isGPTEnabled && !openaiApiKey) {
      setMainModal('OpenAI API Key');
      return;
    }

    const newChat = openChat || (await createNewChat());
    const { id: conversation_id } = newChat;

    if (!openChat) {
      setChats((prev) => {
        if (!prev?.filter((chat) => chat.id === newChat.id)?.length) {
          return [...prev, newChat];
        }
        return prev;
      });
      setOpenChat(newChat);
      setParticipants((prev) => [...prev, user]);

      await service.post(`/chats/${conversation_id}/join`, {});
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

    const history = messages
      .filter((msg) => msg.user_id !== 'chatterai')
      .map(({ content, user_id }) => {
        const role = aiModels.map((m) => m.toLowerCase()).includes(user_id)
          ? 'assistant'
          : 'user';

        return { content, role };
      });

    try {
      if (selectedAiModel === 'DALL-E') {
        const response = await dalle(cleanPrompt, openaiApiKey);
        const data = response.data.data[0].url;

        if (data) {
          await updateMessage(
            {
              content: data,
              conversation_id,
              user_id: selectedAiModel.toLowerCase(),
            },
            true
          );
        }
      } else {
        const criteria = {
          prompt: cleanPrompt,
          temperature,
          messages: history,
          key: openaiApiKey,
        };

        if (selectedAiModel !== 'ChatGPT') {
          criteria.model = selectedAiModel.toLowerCase();
        }

        const response = await davinci(criteria);
        const data = response.data.choices[0].message.content;
        const aiResponse = {
          content: data,
          conversation_id,
          user_id: selectedAiModel.toLowerCase(),
        };

        if (data) {
          await updateMessage(aiResponse, true);
        }
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
      try {
        const data = await service.get(`/chatview?chat=${openChat?.id}`);

        setMessages(data.messages);
        setParticipants(data.participants);
      } catch (error) {
        setMainModal('Login');
        clearStorage();
      }
    };

    if (openChat) {
      init();
    }
  }, [openChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  isParticipant && inputRef.current && !isMobile && inputRef.current.focus();

  console.log({ openChat })

  return (
    <div className="chatview">
      <div className="top-8 w-full flex justify-center z-10 absolute">
        {!openChat && (
          <Dropdown className="w-full flex justify-center" selected={selectedAiModel} dropdownRef={aiModelsRef}>
            <AiModels aiModels={aiModels} setSelected={setSelectedAiModel} />
          </Dropdown>
        )}
      </div>
      {isMobile && openChat && (
        <h1 className="text-xl py-1 text-center text-white bg-blue-600 bg-opacity-70 rounded-sm">{openChat.title}</h1>
      )}
      <main className="chatview__chatarea">
        {messages?.filter(m => m.type !== 'hidden')?.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            participants={participants}
            selectedAiModel={selectedAiModel}
            aiModels={aiModels.map((m) => m.toLowerCase())}
          />
        ))}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
        {!isMobile && !!participants?.length && openChat?.type === 'public' && (
          <Participants participants={participants} openChat={openChat} />
        )}
      </main>
      <form
        className={`form flex items-center py-2 space-x-2 z-50 h-fi border-t border-slate-300 ${isMobile ? 'fixed' : 'absolute'}`}
        onSubmit={sendMessage}
      >
        {!openChat || openChat?.type === 'private' || isParticipant ? (
          <>
            <Dropdown
              className="flex-grow ml-1 md:ml-3"
              classes="bottom-full"
              dropdownRef={dropdownRef}
              options={options}
              selected={selected}
              inverted={true}
              onChange={setSelected}
            >
              {options.map((option, index) => (
                <Option
                  key={index}
                  option={option}
                  index={index}
                  onChange={setSelected}
                />
              ))}
              <Slider
                key="Temperature"
                label="Temperature"
                min="0.0"
                max="2.0"
                step="0.1"
                value={temperature}
                setValue={setTemperature}
              />
              <Slider
                key="Maximum tokens"
                label="Maximum tokens"
                min="100"
                max="8000"
                step="100"
                value={maxTokens}
                setValue={setMaxTokens}
              />
              <Slider
                key="Presence penalty"
                label="Presence penalty"
                min="-2.0"
                max="2.0"
                step="0.01"
                value={presencePenalty}
                setValue={setPresencePenalty}
              />
              <Slider
                key="Frequency penalty"
                label="Frequency penalty"
                min="-2.0"
                max="2.0"
                step="0.01"
                value={frequencyPenalty}
                setValue={setFrequencyPenalty}
              />
              <Option
                key="Leave chat"
                index={options.length}
                onChange={setSelected}
                option={{
                  value: 'Leave Chat',
                  show: !isPrivate && isParticipant,
                  callback: handleLeaveChat,
                }}
              />
            </Dropdown>

            <div
              className={`flex ${
                isMobile ? 'flex-col' : 'flex-row space-x-4'
              } items-stretch justify-between w-full z-50`}
            >
              {isMobile && (
                <div className={`flex justify-end items-center mb-2 z-50 ${isMobile ? 'mr-2' : ''}`}>
                  <button
                    className={`
                      flex items-center justify-center h-7 rounded-full shadow-md ${isMobile ? 'w-fit px-8 absolute -translate-x-1/2 left-1/2' : 'w-full'}
                      transition-all duration-200 ease-in-out transform hover:scale-105
                      ${isGPTEnabled ? 'bg-green-400' : 'bg-red-500'} 
                      hover:${isGPTEnabled ? 'bg-green-500' : 'bg-red-600'}
                    `}
                    type="button"
                    onClick={toggleGPT}
                  >
                    <span className="text-white font-semibold min-w-fit">AI</span>
                  </button>

                  <button
                    type="submit"
                    className="
                      chatview__btn-send bg-dark-grey disabled:cursor-not-allowed bg-opacity-90 disabled:bg-dark-grey hover:bg-blue-900 hover:bg-opacity-80 text-white hover:text-white font-semibold py-2 px-4 
                      rounded-3xl shadow-lg transform hover:scale-105 disabled:scale-100 disabled:opacity-30 disabled:text-white
                      transition-all duration-200 ease-in-out outline-none"
                    disabled={!formValue}
                    aria-disabled={!formValue}
                  >
                    <MdSend size={24} className="mx-auto" />
                  </button>
                </div>
              )}

              <textarea
                ref={inputRef}
                className="chatview__textarea-message flex-grow border border-gray-300 bg-white bg-opacity-60 rounded-lg p-2"
                value={formValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setFormValue(e.target.value)}
              />

              {!isMobile && (
                <div className="flex flex-col justify-start items-end w-fit pr-6 ml-2">
                  <button
                    className={`
                      flex items-center justify-center w-full h-7 rounded-full shadow-md 
                      transition-all duration-200 ease-in-out transform self-center hover:scale-105 
                      ${isGPTEnabled ? 'bg-green-400' : 'bg-red-500'} 
                      hover:${isGPTEnabled ? 'bg-green-500' : 'bg-red-600'}
                    `}
                    type="button"
                    onClick={toggleGPT}
                  >
                    <span className="text-white font-semibold">AI</span>
                  </button>

                  <div className="flex-grow flex items-center">
                    <button
                      type="submit"
                      className="
                        chatview__btn-send bg-dark-grey disabled:cursor-not-allowed bg-opacity-90 disabled:bg-dark-grey hover:bg-blue-900 hover:bg-opacity-80 text-white hover:text-white font-semibold py-2 px-4 
                        rounded-3xl shadow-lg transform hover:scale-105 disabled:scale-100 disabled:opacity-30 disabled:text-white
                        transition-all duration-200 ease-in-out outline-none"
                      disabled={!formValue}
                      aria-disabled={!formValue}
                    >
                      <MdSend size={24} className="mx-auto" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full p-4 pb-8">
            <button
              type="button"
              className="
                bg-dark-grey hover:bg-blue-900 text-white hover:text-white font-semibold py-2 px-4 
                rounded-3xl shadow-lg transform hover:scale-105 
                transition-all duration-200 ease-in-out outline-none
                w-full max-w-xs"
              onClick={handleJoinChat}
            >
              Join Chat
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatView;
