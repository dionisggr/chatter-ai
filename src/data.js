const organizations = [
  { id: 1, name: 'ChatterAI' },
  { id: 2, name: 'Another Space' },
]

const users = [
  { id: 1, first_name: 'John', last_name: 'First', email: 'john@first.com' },
  { id: 2, first_name: 'Jane', last_name: 'Second', email: 'jane@second.com' },
  { id: 3, first_name: 'Joe', last_name: 'Third', email: 'joe@third.com' },
]

const user_organizations = [
  { user_id: 1, organization_id: 1 },
  { user_id: 2, organization_id: 1 },
  { user_id: 3, organization_id: 1 },
]

const conversations = [
  { id: 1, name: 'Public Chat', type: 'public', created_by: 1 },
  { id: 2, name: 'Public Chat', type: 'public', created_by: 2 },
  { id: 3, name: 'Public Chat', type: 'public', created_by: 3 },
  { id: 4, name: 'Private Chat', type: 'private', created_by: 1 },
  { id: 5, name: 'Private Chat', type: 'private', created_by: 2 },
  { id: 6, name: 'Private Chat', type: 'private', created_by: 3 },
  { id: 7, name: 'Private Chat', type: 'private', created_by: 1 },
  { id: 8, name: 'Private Chat', type: 'private', created_by: 1 },
  { id: 9, name: 'Private Chat', type: 'private', created_by: 1 },
  { id: 10, name: 'Private Chat', type: 'private', created_by: 1 },
  { id: 11, name: 'Private Chat', type: 'private', created_by: 1 },
  { id: 12, name: 'Private Chat', type: 'private', created_by: 1 },
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