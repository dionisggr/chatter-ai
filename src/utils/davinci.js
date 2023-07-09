import { Configuration, OpenAIApi } from 'openai';

export const davinci = async (props) => {
  const {
    key: apiKey,
    model = 'gpt-3.5-turbo',
    temperature = 0,
    messages = [],
    max_tokens = 2000,
    frequency_penalty = 0,
    presence_penalty = 0,
    prompt,
  } = props;
  
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  try {
  const response = await openai.createChatCompletion({
    model: model || 'gpt-3.5-turbo',
    temperature,
    max_tokens: 1000,
    frequency_penalty,
    presence_penalty,
    messages: [
      {
        role: 'system',
        content: "You are a helpful assistant that always replies in markdown format.",
      },
      ...messages.slice(0, 6),      
      { role: 'user', content: prompt },
    ],
  });

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
