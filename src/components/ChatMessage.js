import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import { MdComputer } from 'react-icons/md';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from './Image';

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { message, aiModels, selected, participants } = props;
  const { id, created_at, content, user_id } = message;
  const { avatar } = participants.filter((p) => p.id === user_id)?.[0] || {};
  const ai = aiModels.includes(user_id);
  
  return (
    <div
      key={id}
      className={`${ai && 'ai flex-row-reverse bg-light-white'} message`}>
    <div
      className={`${ai && 'ai flex-row-reverse'} message w-11/12 max-w-[1000px] mx-auto`}>
      {selected === 'DALL-E' && ai ? (
        <Image url={content} />
      ) : (
        <div className='message__wrapper '>
          <ReactMarkdown
            className={`message__markdown ${ai ? 'text-left' : 'text-right'}`}
            children={content}
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || 'language-js');
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={oneDark}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}{' '}
                  </code>
                );
              },
            }}
          />

          <div
            className={`${ai ? 'text-left' : 'text-right'} message__createdAt`}>
            {moment(created_at).calendar()}
          </div>
        </div>
      )}

      <div className='message__pic'>
        {ai ? (
          <div className='avatar'>
            <div className='w-8 border rounded-full'>
              <MdComputer className='w-6 h-full mx-auto' />
            </div>
          </div>
        ) : (
          <div className='avatar'>
            <div className='w-8 border rounded-full'>
              <img src={avatar} alt='profile pic' />
            </div>
          </div>
        )}
      </div>
      </div>
      </div>
  );
};

export default ChatMessage;
