import { useState, useCallback } from 'react';

/**
 * A custom hook for managing state that is persisted in the local storage as part of an object.
 *
 * @param {string} key - The key in the object stored in local storage where the state should be stored.
 * @param {any} initialValue - The initial value of the state.
 *
 * @returns {Array} An array containing the current value of the state
 * and a function to update it.
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem('chatter-ai');
      const parsedItem = item ? JSON.parse(item) : {};
      return parsedItem[key] || initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const storedItem = window.localStorage.getItem('chatter-ai');
      const parsedItem = storedItem ? JSON.parse(storedItem) : {};
      parsedItem[key] = valueToStore;
      window.localStorage.setItem('chatter-ai', JSON.stringify(parsedItem));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      const storedItem = window.localStorage.getItem('chatter-ai');
      const parsedItem = storedItem ? JSON.parse(storedItem) : {};
      delete parsedItem[key];
      window.localStorage.setItem('chatter-ai', JSON.stringify(parsedItem));
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  const clearStorage = useCallback(() => {
    try {
      const storedItem = window.localStorage.getItem('chatter-ai');
      const parsedItem = storedItem ? JSON.parse(storedItem) : {};
      const openaiApiKey = parsedItem.openaiApiKey;

      window.localStorage.setItem('chatter-ai',
        JSON.stringify({ openaiApiKey }),
      );      
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [storedValue, setValue, removeValue, clearStorage];
};

export default useLocalStorage;
