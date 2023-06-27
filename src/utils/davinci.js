import { Configuration, OpenAIApi } from 'openai';

export const davinci = async ({ prompt, temperature, messages, key: apiKey }) => {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: "You are a helpful assistant that always replies in markdown format.",
      },
      ...messages,
      { role: 'user', content: prompt },
    ],
    top_p: 0.7,
    temperature,
    // max_tokens: 1000,
    // frequency_penalty: 0.5,
    // presence_penalty: 0.2,
  });

  return response;
};
