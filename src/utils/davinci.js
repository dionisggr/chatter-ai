import { Configuration, OpenAIApi } from 'openai';

export const davinci = async (props) => {
  const {
    key: apiKey,
    model = 'gpt-3.5-turbo',
    temperature = 0.7,
    messages = [],
    max_tokens = 4000,
    frequency_penalty = 0,
    presence_penalty = 0,
    prompt,
  } = props;
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: model || 'gpt-3.5-turbo',
    temperature,
    max_tokens,
    frequency_penalty,
    presence_penalty,
    messages: [
      {
        role: 'system',
        content: "You are a helpful assistant that always replies in markdown format.",
      },
      ...messages,
      { role: 'user', content: prompt },
    ],
  });

  return response;
};
