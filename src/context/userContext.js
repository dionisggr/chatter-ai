import { createContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = createContext([]);

const UserContextProvider = (props) => {
  const [user, setUser] = useLocalStorage('user');
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
