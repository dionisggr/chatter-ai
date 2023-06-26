
const baseUrl = 'http://localhost:8000/chatterai';

async function get(path, token) {
  return await fetch(baseUrl + path, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function post(path, { token, ...data }) {
  return await fetch(baseUrl + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

async function patch(path, { token, ...data }) {
  return await fetch(baseUrl + path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

async function remove(path, token) {
  return await fetch(baseUrl + path, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
}

async function reauthorize(response, refreshToken) {
  const error = await response.json();

  if (error.message.includes('jwt')) {
    response = await get('/reauthorize', refreshToken);
  }

  return response;
}

export default { get, post, patch, remove, reauthorize };
