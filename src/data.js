const organizations = [
  { id: 'demo', name: 'Chatter.AI' },
  { id: 'personal', name: 'Personal' },
];

const users = [
  { id: 'demo', first_name: 'Demo', last_name: 'Demo', email: 'demo@demo.com', username: 'demo', avatar: 'https://www.gravatar.com/avatar/1111?s=200&d=robohash' },
  { id: 1, first_name: 'John', last_name: 'First', email: 'john@first.com', username: 'john', avatar: 'https://www.gravatar.com/avatar/2222?s=200&d=robohash' },
  { id: 2, first_name: 'Jane', last_name: 'Second', email: 'jane@second.com', username: 'jane', avatar: 'https://www.gravatar.com/avatar/3333?s=200&d=robohash' },
  { id: 3, first_name: 'James', last_name: 'Third', email: 'james@third.com', username: 'james', avatar: 'https://www.gravatar.com/avatar/4444?s=200&d=robohash' },
  { id: 4, first_name: 'Jill', last_name: 'Fourth', email: 'jill@fourth.com', username: 'jill', avatar: 'https://www.gravatar.com/avatar/5555?s=200&d=robohash' },
  { id: 5, first_name: 'Jack', last_name: 'Fifth', email: 'jack@fifth.com', username: 'jack', avatar: 'https://www.gravatar.com/avatar/6666?s=200&d=robohash' },
];

const user_organizations = [
  { user_id: 'demo', organization_id: 'demo' },
  { user_id: 1, organization_id: 'demo' },
  { user_id: 2, organization_id: 'demo' },
  { user_id: 3, organization_id: 'demo' },
  { user_id: 4, organization_id: 'demo' },
  { user_id: 5, organization_id: 'demo' },
];

const conversations = [
  { id: 1, name: 'Groceries', type: 'public', created_by: 'demo', organization_id: 'demo' },
  { id: 2, name: 'Hangouts', type: 'public', created_by: 1, organization_id: 'demo' },
  { id: 3, name: 'Travel Planning', type: 'public', created_by: 2, organization_id: 'demo' },
  { id: 4, name: 'Product Manager', type: 'public', created_by: 'demo', organization_id: 'demo' },
  { id: 5, name: 'Group Project', type: 'public', created_by: 'demo', organization_id: 'demo' },
  { id: 6, name: 'Diary', type: 'private', created_by: 'demo', organization_id: 'demo' },
  { id: 7, name: 'Auto-Therapy', type: 'private', created_by: 'demo', organization_id: 'demo' },
  { id: 8, name: 'Personal Finances', type: 'private', created_by: 1, organization_id: 'demo' },
  { id: 9, name: 'Gym Routine', type: 'private', created_by: 2, organization_id: 'demo' },
  { id: 10, name: 'Game Night', type: 'public', created_by: 'demo', organization_id: 'demo' },  
];

const user_conversations = [
  // For Groceries
  { conversation_id: 1, user_id: 'demo' },
  { conversation_id: 1, user_id: 1 },

  // For Hangouts
  { conversation_id: 2, user_id: 'demo' },
  { conversation_id: 2, user_id: 1 },
  { conversation_id: 2, user_id: 2 },
  { conversation_id: 2, user_id: 3 },
  { conversation_id: 2, user_id: 4 },
  { conversation_id: 2, user_id: 5 },

  // For Travel Planning
  { conversation_id: 3, user_id: 'demo' },
  { conversation_id: 3, user_id: 1 },
  { conversation_id: 3, user_id: 2 },
  { conversation_id: 3, user_id: 3 },
  { conversation_id: 3, user_id: 4 },
  { conversation_id: 3, user_id: 5 },

  // For Group Project
  { conversation_id: 5, user_id: 'demo' },
  { conversation_id: 5, user_id: 2 },
  { conversation_id: 5, user_id: 3 },
  { conversation_id: 5, user_id: 4 },

  // For Product Manager
  { conversation_id: 4, user_id: 'demo' },
  { conversation_id: 4, user_id: 1 },
  { conversation_id: 4, user_id: 2 },
  { conversation_id: 4, user_id: 3 },
  { conversation_id: 4, user_id: 4 },
  { conversation_id: 4, user_id: 5 },

  // For Diary and Auto-Therapy (Private)
  { conversation_id: 6, user_id: 'demo' },
  { conversation_id: 7, user_id: 'demo' },

  // For Personal Finances and Gym Routine (Private)
  { conversation_id: 8, user_id: 1 },
  { conversation_id: 9, user_id: 2 },

  // For Game Night
  { conversation_id: 10, user_id: 'demo' },
  { conversation_id: 10, user_id: 1 },
  { conversation_id: 10, user_id: 2 },
  { conversation_id: 10, user_id: 3 },
  { conversation_id: 10, user_id: 4 },
  { conversation_id: 10, user_id: 5 },
];

const messages = [
  // For Groceries
  { id: 1, user_id: 'demo', conversation_id: 1, content: 'Hello team, please add your items to the grocery list.' },
  { id: 2, user_id: 1, conversation_id: 1, content: 'Can we get some more bananas and apples?' },

  // For Hangouts
  { id: 3, user_id: 'demo', conversation_id: 2, content: 'Who is free for a get-together this weekend?' },
  { id: 4, user_id: 1, conversation_id: 2, content: 'I am in, any plans?' },
  { id: 5, user_id: 2, conversation_id: 2, content: 'How about we try that new cafe downtown?' },
  { id: 6, user_id: 3, conversation_id: 2, content: 'Sounds good. I will check their timings.' },
  { id: 7, user_id: 4, conversation_id: 2, content: 'I might be a bit late, got a prior appointment.' },
  { id: 8, user_id: 5, conversation_id: 2, content: 'See you all there!' },

  // For Travel Planning
  { id: 9, user_id: 'demo', conversation_id: 3, content: 'Let\'s start planning our next trip.' },
  { id: 10, user_id: 1, conversation_id: 3, content: 'What\'s our budget looking like?' },
  { id: 11, user_id: 2, conversation_id: 3, content: 'I would love a beach vacation.' },
  { id: 12, user_id: 3, conversation_id: 3, content: 'What about the Maldives?' },
  { id: 13, user_id: 4, conversation_id: 3, content: 'Maldives sounds great. What about accommodation?' },
  { id: 14, user_id: 5, conversation_id: 3, content: 'I will look into some options and share.' },

  // For Group Project
  { id: 15, user_id: 'demo', conversation_id: 5, content: 'We need to finalize the project design by this week.' },
  { id: 16, user_id: 2, conversation_id: 5, content: 'I can work on the frontend.' },
  { id: 17, user_id: 3, conversation_id: 5, content: 'I\'ll handle the backend.' },
  { id: 18, user_id: 4, conversation_id: 5, content: 'I will start on the presentation.' },

  // For Product Manager
  { id: 19, user_id: 'demo', conversation_id: 4, content: 'We need to discuss our product roadmap for the next quarter.' },
  { id: 20, user_id: 1, conversation_id: 4, content: 'Should we prioritize feature X or Y?' },
  { id: 21, user_id: 2, conversation_id: 4, content: 'We have a lot of customer requests for feature X.' },
  { id: 22, user_id: 3, conversation_id: 4, content: 'Let\'s also consider our technical debt.' },
  { id: 23, user_id: 4, conversation_id: 4, content: 'I will prepare a report on our current performance.' },
  { id: 24, user_id: 5, conversation_id: 4, content: 'Let\'s have a detailed discussion tomorrow.' },

  // For Diary and Auto-Therapy (Private)
  { id: 25, user_id: 'demo', conversation_id: 6, content: 'Feeling great about the progress made today.' },
  { id: 26, user_id: 'demo', conversation_id: 7, content: 'Remember, it\'s okay to take breaks and look after yourself.' },

  // For Personal Finances and Gym Routine (Private)
  { id: 27, user_id: 'demo', conversation_id: 8, content: 'Need to set a budget for the next month.' },
  { id: 28, user_id: 2, conversation_id: 9, content: 'Remember, leg day is tomorrow.' },

  // For Game Night
  { id: 29, user_id: 'demo', conversation_id: 10, content: 'Game night on Friday, get ready everyone.' },
  { id: 30, user_id: 1, conversation_id: 10, content: 'What game are we playing?' },
  { id: 31, user_id: 2, conversation_id: 10, content: 'How about Among Us?' },
  { id: 32, user_id: 3, conversation_id: 10, content: 'Sounds fun!' },
  { id: 33, user_id: 4, conversation_id: 10, content: 'I am a bit rusty, but count me in.' },
  { id: 34, user_id: 5, conversation_id: 10, content: 'I will bring the snacks.' },
];

const data = {
  organizations,
  users,
  user_organizations,
  conversations,
  user_conversations,
  messages,
};

export default data;
