import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { FaPlus } from 'react-icons/fa';

const InviteUsers = () => {
  const [tags, setTags] = React.useState([]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  }

  const handleAddition = (tag) => {
    if (!validateEmail(tag.text)) {
      window.alert('Please enter a valid email address.')
      
      return;
    };

    setTags([...tags, tag]);
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    const removedTag = newTags.splice(currPos, 1)[0];
    newTags.splice(newPos, 0, removedTag);

    // re-render
    setTags(newTags);
  }

  const handleSendInvites = () => {
    const emailAddresses = tags.map(tag => tag.text);
    console.log('Sending invites to: ', emailAddresses);

    // Add your logic here to send invite link to the emails
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
        Invite Users
      </h2>
      <p className="mt-2 text-center text-sm leading-5 text-gray-600">
        Enter email addresses and press Enter or the comma key to add. Click "Send Link" when ready.
      </p>

      <div className="flex justify-center mt-6">
        <div className="flex items-center">
          <FaPlus size={18} className="mr-2 text-blue-500" />
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            delimiters={delimiters}
            placeholder="Add new email"
            inline={false}
            inputFieldPosition="top"
            classNames={{
              tagInputField: 'border p-2 rounded w-11/12 mt-1',
              tag: 'bg-blue-100 rounded px-2 py-1 mx-1 my-1 inline-flex',
              remove: 'cursor-pointer ml-2',
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button onClick={handleSendInvites} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Send Link
        </button>
      </div>
    </div>
  );
}

export default InviteUsers;
