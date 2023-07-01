
const baseUrl = 'http://localhost:8000/chatterai';

async function get(path) {
  const request = async () => {
    const token = getFromLocalStorage('token');
    return await fetch(baseUrl + path, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  let response = await request();

  // if (!response.ok) {
  //   const error = await response.json();

  //   if (error.message.includes('jwt')) {
  //     const reauthorization = await reauthorize();

  //     if (!reauthorization.ok) {
  //       throw new Error('Unauthorized request.');
  //     }

  //     response = await request();
  //   }
  // }

  return await response.json();
}

async function post(path, { apiKey, ...data }) {
  const request = async () => {
    const token = getFromLocalStorage('token');
    return await fetch(baseUrl + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey || token}`
      },
      body: JSON.stringify(data)
    });
  }

  let response = await request();

  // if (!response.ok) {
  //   const error = await response.json();

  //   if (error.message.includes('jwt')) {
  //     const reauthorization = await reauthorize();

  //     if (!reauthorization.ok) {
  //       throw new Error('Unauthorized request.');
  //     }

  //     response = await request();
  //   }
  // }

  return await response.json();
}

async function patch(path, data) {
  const request = async () => {
    const token = getFromLocalStorage('token');
    return await fetch(baseUrl + path, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  }

  let response = await request();

  // if (!response.ok) {
  //   const error = await response.json();

  //   if (error.message.includes('jwt')) {
  //     const reauthorization = await reauthorize();

  //     if (!reauthorization.ok) {
  //       throw new Error('Unauthorized request.');
  //     }

  //     response = await request();
  //   }
  // }

  return await response.json();
}

async function remove(path) {
  const request = async () => {
    const token = getFromLocalStorage('token');
    return await fetch(baseUrl + path, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  let response = await request();

  // if (!response.ok) {
  //   const error = await response.json();

  //   if (error.message.includes('jwt')) {
  //     const reauthorization = await reauthorize();

  //     if (!reauthorization.ok) {
  //       throw new Error('Unauthorized request.');
  //     }

  //     response = await request();
  //   }
  // }
  

  return await response.json();
}

async function reauthorize() {
  const refreshToken = getFromLocalStorage('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token.');
  }

  return await get('/reauthorize', refreshToken);
}

function getFromLocalStorage(name) {
  const local = window.localStorage.getItem('chatter-ai');
  const parsed = local ? JSON.parse(local) : {};
  
  return parsed[name];
}

export default {
  get,
  post,
  patch,
  remove,
  reauthorize,
  getFromLocalStorage
};
