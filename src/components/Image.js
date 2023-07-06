import React, { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { FaDownload, FaSync } from 'react-icons/fa';
import { dalle } from '../utils/dalle';
import service from '../service';

const Image = ({ chatId, messageId, url, openaiApiKey }) => {
  const { messages, setMessages } = useContext(ChatContext);

  const [isLoading, setIsLoading] = useState(false);
  
  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'image.png'; 

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleRegenerate = async () => {
    setIsLoading(true);

    if (messages.length >= 2) {
      const msg = messages.findIndex(m => m.id === messageId)
      const msgBefore = messages[msg - 1]?.content;

      console.log({ msgBefore, openaiApiKey })

      try {
        const response = await dalle(msgBefore, openaiApiKey);
        const base64Data = response.data.data[0].b64_json;
        const src = `data:image/png;base64,${base64Data}`;
        const path = `/conversations/${chatId}/messages/${messageId}`;
        
        await service.patch(path, { data: { content: src } });

        setMessages((prev) => {
          const last = prev.pop();

          return [...prev, { ...last, content: src }];
        });
      } catch (error) {
        console.error(error);
        alert('Something went wrong. Please try again.');
      }

      setIsLoading(false);
    }
  };

  return (
    <div className='relative group bg-slate-200 border-gray-200 shadow-md p-4 rounded-xl hover:shadow-lg transition-shadow duration-200'>
      <div 
        className='flex justify-center items-center w-full h-auto rounded-lg bg-gray-300' 
        style={{ minHeight: '300px', minWidth: '300px' }}
      >
        {isLoading ? (
          <div>Regenerating...</div>
        ) : (
          <img
            className='w-full h-auto rounded-lg'
            src={url}
            alt='dalle generated'
            loading='lazy'
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        )}
      </div>
      <div className="hidden group-hover:flex absolute bottom-0 right-0 p-2 gap-2">
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'
          onClick={handleDownload}
        >
          <FaDownload />
        </button>
        <button 
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'
          onClick={handleRegenerate}
        >
          <FaSync />
        </button>
      </div>
    </div>
  );
};

export default Image;
