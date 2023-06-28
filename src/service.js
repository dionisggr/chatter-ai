
const baseUrl = 'http://localhost:8000/chatterai';

async function getFromLocalStorage(name) {
  const local = localStorage.getItem('chatter-ai');
  const parsed = local ? JSON.parse(local) : {};
  
  return parsed[name];
}

async function get(path) {
  const token = getFromLocalStorage('token');
  const request = async () => await fetch(baseUrl + path, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const response = await request();

  if (!response.ok) {
    const reauthorization = await reauthorize(response);

    if (reauthorization.ok) {
      return await request();
    }
  }

  return response;
}

async function post(path, data) {
  const token = getFromLocalStorage('token');
  const request = async () => await fetch(baseUrl + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const response = await request();

  if (!response.ok) {
    const reauthorization = await reauthorize(response);

    if (reauthorization.ok) {
      return await request();
    }
  }

  return response;
}

async function patch(path, data) {
  const token = getFromLocalStorage('token');
  const request = async () => await fetch(baseUrl + path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  const response = await request();

  if (!response.ok) {
    const reauthorization = await reauthorize(response);

    if (reauthorization.ok) {
      return await request();
    }
  }

  return response;
}

async function remove(path) {
  const token = getFromLocalStorage('token');
  const request = async () => await fetch(baseUrl + path, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  const response = await request();

  if (!response.ok) {
    const reauthorization = await reauthorize(response);

    if (reauthorization.ok) {
      return await request();
    }
  }

  return response;
}

async function reauthorize(response) {
  const error = await response.json();

  if (!error.message.includes('jwt')) {
    throw new Error(error.message);
  }

  const refreshToken = getFromLocalStorage('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token.');
  }

  return await get('/reauthorize', refreshToken);
}

export default { get, post, patch, remove, reauthorize };
