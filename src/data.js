const organizations = [
  { id: 1, name: 'ChatterAI' },
  { id: 2, name: 'Another Space' },
]

const users = [
  { id: 'demo', first_name: 'Demo', last_name: 'Demo', email: 'demo@demo.com', username: 'demo', avatar: 'https://www.gravatar.com/avatar/0000?s=200&d=robohash' },
  { id: 1, first_name: 'John', last_name: 'First', email: 'john@first.com', username: '', avatar: 'https://www.gravatar.com/avatar/1111?s=200&d=robohash' },
  { id: 2, first_name: 'Jane', last_name: 'Second', email: 'jane@second.com', username: '', avatar: 'https://www.gravatar.com/avatar/2222?s=200&d=robohash' },
  { id: 3, first_name: 'Joe', last_name: 'Third', email: 'joe@third.com', username: '', avatar: 'https://www.gravatar.com/avatar/3333?s=200&d=robohash' },
];

const user_organizations = [
  { user_id: 1, organization_id: 1 },
  { user_id: 2, organization_id: 1 },
  { user_id: 3, organization_id: 1 },
]

const conversations = [
  { id: 1, name: 'Public Chat 1', type: 'public', created_by: 1 },
  { id: 2, name: 'Public Chat 2', type: 'public', created_by: 2 },
  { id: 3, name: 'Public Chat 3', type: 'public', created_by: 3 },
  { id: 4, name: 'Private Chat 1', type: 'private', created_by: 1 },
  { id: 5, name: 'Private Chat 2', type: 'private', created_by: 2 },
  { id: 6, name: 'Private Chat 3', type: 'private', created_by: 3 },
  { id: 7, name: 'Demo Private Chat 1', type: 'private', created_by: 'demo' },
  { id: 8, name: 'Demo Private Chat 2', type: 'private', created_by: 'demo' },
  { id: 9, name: 'Demo Private Chat 3', type: 'private', created_by: 'demo' },
  { id: 10, name: 'Demo Private Chat 4', type: 'private', created_by: 'demo' },
  { id: 11, name: 'Demo Private Chat 5', type: 'private', created_by: 'demo' },
  { id: 12, name: 'Demo Private Chat 6', type: 'private', created_by: 'demo' },
  { id: 13, name: 'Demo Public Chat 1', type: 'public', created_by: 'demo' },
  { id: 14, name: 'Demo Public Chat 2', type: 'public', created_by: 'demo' },
  { id: 15, name: 'Demo Public Chat 3', type: 'public', created_by: 1 },
];

const user_conversations = [
  { conversation_id: 1, user_id: 1 },
  { conversation_id: 1, user_id: 2 },
  { conversation_id: 2, user_id: 1 },
  { conversation_id: 2, user_id: 2 },
  { conversation_id: 2, user_id: 3 },
  { conversation_id: 3, user_id: 2 },
  { conversation_id: 3, user_id: 3 },
  { conversation_id: 4, user_id: 1 },
  { conversation_id: 5, user_id: 2 },
  { conversation_id: 6, user_id: 3 },
];

const messages = [
  { id: 1, conversation_id: 1, user_id: 1, content: 'Hi there, ChatGPT!' },
  { id: 2, conversation_id: 1, user_id: 'chatgpt', content: 'Hello, John!' },
  { id: 3, conversation_id: 1, user_id: 2, content: 'How are you?' },
  { id: 4, conversation_id: 1, user_id: 'chatgpt', content: 'I am doing well, thanks!' },
  { id: 5, conversation_id: 2, user_id: 2, content: 'Hi there, whoever is there!' },
  { id: 6, conversation_id: 2, user_id: 'chatgpt', content: 'Hello, Jane!' },
  { id: 7, conversation_id: 2, user_id: 2, content: 'What\'s new?' },
  { id: 8, conversation_id: 2, user_id: 'chagpt', content: 'Not much, just chatting away with everyone! Apparently...' },
  { id: 9, conversation_id: 2, user_id: 3, content: 'Well that\'s boring...' },
  { id: 10, conversation_id: 2, user_id: 'chatgpt', content: 'I know, right?' },
  { id: 11, conversation_id: 3, user_id: 3, content: 'Hi there, ChatGPT!' },
  { id: 12, conversation_id: 3, user_id: 'chatgpt', content: 'Hello, Joe!' },
  { id: 13, conversation_id: 3, user_id: 2, content: 'What have you done recently?' },
  { id: 14, conversation_id: 3, user_id: 'chatgpt', content: 'I have been working on a secret project!' },
  { id: 15, conversation_id: 4, user_id: 1, content: 'Hi there, ChatGPT!' },
  { id: 16, conversation_id: 4, user_id: 'chatgpt', content: 'Hello, John!' },
  { id: 17, conversation_id: 5, user_id: 2, content: 'Hi there, ChatGPT!' },
  { id: 18, conversation_id: 5, user_id: 'chatgpt', content: 'Hello, Jane!' },
  { id: 19, conversation_id: 6, user_id: 3, content: 'Hi there, ChatGPT!' },
  { id: 20, conversation_id: 6, user_id: 'chatgpt', content: 'Hello, Joe!' },
  { id: 21, conversation_id: 7, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 22, conversation_id: 7, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 23, conversation_id: 8, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 24, conversation_id: 8, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 25, conversation_id: 9, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 26, conversation_id: 9, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 27, conversation_id: 10, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 28, conversation_id: 10, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 29, conversation_id: 11, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 30, conversation_id: 11, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 31, conversation_id: 12, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 32, conversation_id: 12, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 33, conversation_id: 13, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 34, conversation_id: 13, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 35, conversation_id: 14, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 36, conversation_id: 14, user_id: 'chatgpt', content: 'Hello, Demo!' },
  { id: 37, conversation_id: 15, user_id: 'demo', content: 'Hi there, ChatGPT!' },
  { id: 38, conversation_id: 15, user_id: 'chatgpt', content: 'Hello, Demo!' },
];

const data = {
  organizations,
  users,
  conversations,
  user_conversations,
  messages,
  user_organizations,
};

export default data;
