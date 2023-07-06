import React, { useRef, useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { UserContext } from '../context/UserContext';
import Image from './Image';
import RobotImage from '../assets/robot.webp';
import { FiCopy } from 'react-icons/fi';

const ChatMessage = (props) => {
  const { user } = useContext(UserContext);

  const { message, aiModels, selectedAiModel, participants } = props;
  const { id, created_at, content, user_id } = message;
  const participant = participants.filter((p) => p.id === user_id)?.[0] || {};
  const avatar = participant.avatar || 'https://i.imgur.com/HeIi0wU.png';
  const ai = aiModels.includes(user_id);

  const codeRef = useRef('');
  const [copied, setCopied] = useState(false);

  return (
    <div
      key={id}
      className={`${ai && 'ai flex-row-reverse bg-light-white'} message`}
    >
      <div
        className={`${
          (ai || user_id !== user?.id) && 'ai flex-row-reverse'
        } message w-11/12 max-w-[800px] mx-auto px-4`}
      >
        {[selectedAiModel.toLowerCase(), message.user_id].includes('dall-e') && ai ? (
          <Image url={content} />
        ) : (
          <div className="message__wrapper group">
            <div className="relative">
              <ReactMarkdown
                className={`message__markdown mx-auto ${
                  message.user_id === 'chatterai'
                    ? 'text-center bg-gray-200 bg-transparent'
                    : ai || user_id !== user?.id
                    ? 'text-left'
                    : 'text-right'
                } text-base leading-tight`}
                children={content}
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(
                      className || 'language-js'
                    );
                    codeRef.current = String(children).replace(/\n$/, '');
                    return !inline && match ? (
                      <div className="relative m-3 mb-6">
                        <SyntaxHighlighter
                          children={codeRef.current}
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                        <CopyToClipboard
                          text={codeRef.current}
                          onCopy={() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 3000);
                          }}
                        >
                          <button className="absolute top-0 right-0 p-2 pt-3 m-2 text-light-white">
                            <FiCopy />
                          </button>
                        </CopyToClipboard>
                        {copied && (
                          <span className="absolute bottom-0 right-0 p-2 text-light-white">
                            Copied to clipboard!
                          </span>
                        )}
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}{' '}
                      </code>
                    );
                  },
                }}
              />
                {message.user_id !== 'chatterai' && (
                  <CopyToClipboard
                    text={content}
                    onCopy={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 3000);
                    }}
                  >
                    <button className={`absolute -top-5 p-2 py-4 pt-3 m-2 hidden group-hover:block ${ai || user_id !== user?.id ? 'right-8' : 'left-8'}`}>
                      <FiCopy />
                    </button>
                  </CopyToClipboard>
              )}
              {copied && (
                  <span className={`absolute top-4 p-2 text-slate-500 ${ai || user_id !== user?.id  ? 'right-8' : 'left-8'}`}>
                  Copied to clipboard!
                </span>
              )}
            </div>
            
            <div
              className={`${
                message.user_id === 'chatterai'
                  ? 'text-center font-bold text-blue-600'
                  : ai || user_id !== user?.id
                  ? 'text-left'
                  : 'text-right'
              } message__createdAt mt-2`}
            >
              {moment(created_at).calendar()}
            </div>
          </div>
        )}

        {message.user_id !== 'chatterai' && (
          <div className="message__pic">
            {ai ? (
              <div className="avatar">
                <div className="w-8 border rounded-full">
                  <img src={RobotImage} alt="robot" />
                </div>
              </div>
            ) : (
              <div className="avatar">
                <div className="w-8 border rounded-full">
                  <img src={avatar} alt="profile pic" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
