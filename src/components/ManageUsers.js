import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import service from '../service';

const ManageUsers = ({ activeSpace }) => {
  const { user } = useContext(UserContext);
  
  const [users, setUsers] = useState([]);

  const isCreator = activeSpace?.created_by === user?.id;

  const removeUser = async (id) => {
    if (id === activeSpace?.created_by) return;

    if (window.confirm(`Are you sure you want to remove this user from ${activeSpace?.name}?`)) {
      try {
        await service.remove(`/spaces/${activeSpace?.id}/users/${id}`);
      } catch (error) {
        console.error(error);
        alert('Error removing user from space.');
      }
    }

    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const newUsers = await service.get(
          `/spaces/${activeSpace?.id}/users`
        );

        setUsers(newUsers || []);
      } catch (error) {
        console.error(error);
        setUsers([]);
        alert('Error getting users');
      }
    };

    if (activeSpace) {
      getUsers();
    }
  }, [activeSpace, setUsers]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 relative">
      <p className="text-2xl font-semibold text-center mb-4">
        {isCreator && 'Manage'} Users
      </p>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {users?.map((user) => {
          const isCurrentUser = activeSpace?.created_by === user.id;

          return (
            <div key={user.id} className="group relative">
              <div
                className={`w-16 h-16 border-2 ${
                  isCurrentUser ? 'border-yellow-500' : 'border-blue-300'
                } rounded-full overflow-hidden bg-gray-100 cursor-pointer`}
              >
                <img
                  src={user.avatar}
                  alt={user.username || user.first_name}
                  className="object-cover w-full h-full"
                />
                {isCreator && !isCurrentUser && (
                  <button
                    onClick={() => removeUser(user.id)}
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="text-center mt-1">
                <p>{user.username || user.first_name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageUsers;
