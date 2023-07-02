import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from './Image';
import RobotImage from '../assets/robot.webp';
import { FiCopy } from 'react-icons/fi';

const ChatMessage = (props) => {
  const { message, aiModels, selected, participants } = props;
  const { id, created_at, content, user_id } = message;
  const participant = participants.filter((p) => p.id === user_id)?.[0] || {};
  const avatar = participant.avatar || 'https://i.imgur.com/HeIi0wU.png';
  const ai = aiModels.includes(user_id);

  const codeRef = useRef('');

  console.log({ message });

  return (
    <div
      key={id}
      className={`${ai && 'ai flex-row-reverse bg-light-white'} message`}
    >
      <div
        className={`${
          ai && 'ai flex-row-reverse'
        } message w-11/12 max-w-[800px] mx-auto`}
      >
        {selected === 'DALL-E' && ai ? (
          <Image url={content} />
        ) : (
          <div className="message__wrapper ">
            <ReactMarkdown
              className={`message__markdown mx-auto ${
                message.user_id === 'chatterai'
                  ? 'text-center bg-gray-200'
                  : ai
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
                    <div className="relative w-11/12 mx-auto mb-6">
                      {' '}
                      {/* <-- Add relative positioning and adjust width */}
                      <SyntaxHighlighter
                        children={codeRef.current}
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                      <CopyToClipboard text={codeRef.current}>
                        <button className="absolute top-0 right-0 p-2 pt-3 m-2 text-white">
                          {' '}
                          {/* <-- Position button and change color */}
                          <FiCopy />
                        </button>
                      </CopyToClipboard>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}{' '}
                    </code>
                  );
                },
              }}
            />

            <div
              className={`${
                message.user_id === 'chatterai'
                  ? 'text-center font-bold text-blue-600'
                  : ai
                  ? 'text-left'
                  : 'text-right'
              } message__createdAt`}
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
