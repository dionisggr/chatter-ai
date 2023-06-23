import { createContext } from 'react';
import useUserData from '../hooks/useUserData';

/**
 * UserContext is a context object that is used to share user data
 * between components
 */
const UserContext = createContext({});

/**
 * UserContextProvider is a functional component that serves as a provider for the UserContext.
 * It provides the UserContext to the components within its subtree.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A UserContext.Provider element.
 */
const UserContextProvider = (props) => {
  const [user, setUser, clearUser] = useUserData(null);

  return (
    <UserContext.Provider value={[user, setUser, clearUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
