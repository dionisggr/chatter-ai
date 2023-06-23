import { useState } from 'react'

/**
 * A custom hook for managing user data.
 *
 * @returns {Array} An array containing the `user` object, the `setUser` function, and the `clearUser` function.
 */
const useUserData = () => {
  const [user, setUser] = useState(null);

  /**
  * A function for setting user data.
  *
  * @param {Object} userData - The data to set for the user.
  */
  const updateUser = (userData) => {
    setUser(userData);
  }

  const clearUser = () => setUser(null)

  return [user, updateUser, clearUser];
}

export default useUserData;
