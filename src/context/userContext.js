import { createContext, useState, useMemo } from 'react';

/**
 * UserContext is a context object that is used to share user data
 * between components
 */
const UserContext = createContext([]);

/**
 * UserContextProvider is a functional component that serves as a provider for the UserContext.
 * It provides the UserContext to the components within its subtree.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A UserContext.Provider element.
 */
const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
