
import utils from './utils';

const baseUrl = {
  development: 'http://localhost:8000/chatterai',
  production: process.env.REACT_APP_API_URL + '/chatterai',
}[process.env.REACT_APP_NODE_ENV];

async function get(path) {
  const request = async () => {
    const token = utils.getFromLocalStorage('token');
    return await fetch(baseUrl + path, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  let response = await request();

  if (!response.ok) {
    const error = await response.json();

    if (error.message.includes('jwt')) {
      const reauthorization = await reauthorize();

      if (!reauthorization.ok) {
        window.localStorage.removeItem('chatter-ai');
        throw new Error('Unauthorized request.');
      }

      response = await request();
    }
  }

  return await response.json();
}

async function post(path, { apiKey, inviteToken, ...data }) {
  const request = async () => {
    const token = utils.getFromLocalStorage('token');
    return await fetch(baseUrl + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${inviteToken || apiKey || token}`
      },
      body: JSON.stringify(data)
    });
  }

  let response = await request();

  console.log({ response })

  if (!response.ok) {
    const error = await response.json();

    console.log({ error })

    if (error.message.includes('jwt')) {
      const reauthorization = await reauthorize();

      if (!reauthorization.ok) {
        window.localStorage.removeItem('chatter-ai');
        throw new Error('Unauthorized request.');
      }

      response = await request();
    }
  }

  return await response.json();
}

async function patch(path, data) {
  const request = async () => {
    const token = utils.getFromLocalStorage('token');
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

  if (!response.ok) {
    const error = await response.json();

    if (error.message.includes('jwt')) {
      const reauthorization = await reauthorize();

      if (!reauthorization.ok) {
        window.localStorage.removeItem('chatter-ai');
        throw new Error('Unauthorized request.');
      }

      response = await request();
    }
  }

  return await response.json();
}

async function remove(path) {
  const request = async () => {
    const token = utils.getFromLocalStorage('token');
    return await fetch(baseUrl + path, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  let response = await request();

  if (!response.ok) {
    const error = await response.json();

    if (error.message.includes('jwt')) {
      const reauthorization = await reauthorize();

      if (!reauthorization.ok) {
        window.localStorage.removeItem('chatter-ai');
        throw new Error('Unauthorized request.');
      }

      response = await request();
    }
  }

  return response;
}

async function reauthorize() {
  const request = async () => {
    const refreshToken = utils.getFromLocalStorage('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token.');
    }

    return await fetch(baseUrl + '/reauthorize', {
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` }
    });
  };

  return await request();
}

export default {
  get,
  post,
  patch,
  remove,
  reauthorize,
};
