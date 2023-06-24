import { useState } from 'react';

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `chats` array and the `addChat` function.
 */
const useSpaceCollection = () => {
  const [spaces, setSpaces] = useState([]);

  const upsertSpaces = (spaces) => {
    setSpaces((prev) => [...prev, ...spaces]);
  };

  return [spaces, setSpaces, upsertSpaces];
};

export default useSpaceCollection;
