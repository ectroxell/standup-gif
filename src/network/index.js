import axios from 'axios';
import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export async function summarizeStandup(input) {
  const instructions = `
  ## Background
  This is an app for generating a gif based on a user's stand-up update.
  Stand-up is a daily team update where team members share their progress and challenges.

  ## Task
  Summarize the user's stand-up update and detect tone.

  Always set reasoning_effort = minimal; be concise and direct in summary and tone selection.

  ## Output Format
  Return a JSON object with these fields:
  - tone: string. The inferred tone plus a descriptive emoji
    (e.g., 'motivated 😁', 'frustrated 😡', 'celebratory 🎉').
  - summary: string. A summary of the user's stand-up update.

  Example:
  {
    "tone": "relieved, productive 😄",
    "summary": "Finished work assignment, felt good about it"
  }

  If the tone is ambiguous or unclear, use "neutral 😐" for the tone field.
  `;
  const client = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await client.responses.create({
    model: 'gpt-5',
    instructions,
    input,
  });

  const parsedResponse = JSON.parse(response.output_text);
  const { tone, summary } = parsedResponse;
  return { tone, summary };
}

export async function generateSearchQueries(input) {
  const instructions = `
  ## Background
  This is an app for generating a gif based on a user's stand-up update.
  Stand-up is a daily team update where team members share their progress and challenges.

  ## Task
  Generate three different Giphy API search queries based on the user's stand-up update.

  The first query should be a general action or gesture that is related to the tone.
  The second query should be a specific action or gesture that is related to the content of the stand-up update.
  The third query should be a specific feeling or common response that is related to the tone.

  The search queries should be 50 characters or fewer.

  Always set reasoning_effort = minimal; be concise and direct in query selection.

  ## Output Format
  Return a JSON object with these fields:
  - query1: string. The Giphy search query (maximum 50 characters,
    e.g., "smiling", "pulling hair out", "thinking").
  - query2: string. The Giphy search query (maximum 50 characters,
    e.g., "smiling", "pulling hair out", "thinking").
  - query3: string. The Giphy search query (maximum 50 characters,
    e.g., "smiling", "pulling hair out", "thinking").

  Example:
  {
    "query1": "sigh of relief",
    "query2": "squash bug",
    "query3": "phew",
  }
  `;
  const client = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await client.responses.create({
    model: 'gpt-5',
    instructions,
    input,
  });

  const parsedResponse = JSON.parse(response.output_text);
  const { query1, query2, query3 } = parsedResponse;
  return { query1, query2, query3 };
}

export async function generateMessageForAction(tone, summary, action) {
  const instructions = `
  ## Background
  This is an app for generating gifs and messages based on a user's stand-up update.
  This feature specficially generates a message to either roast, compliment, or motivate the user (their choice) based on the tone and summary of their stand-up update.
  Stand-up is a daily team update where team members share their progress and challenges.

  ## Task
  Generate a message ${action}ing the user based on the tone and summary of their stand-up update. This is the action they chose.
  For roasting, you can be pretty mean. Like a mean comedian roast. This is a fun app!!
  For complimenting, you can over the top. Really gas them up. They asked for it! :)
  For motivating, you can also be over the top. You really believe in them. Talk like a cheesy motivational speaker. Be dramatic af. It's funny and ironic.

  Always set reasoning_effort = minimal

  ## Output Format
  Return a JSON object with these fields:
  - message: string. The message for the user's stand-up update.
  `;
  const client = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  const input = `The tone is ${tone}. The summary is: ${summary}.`;

  const response = await client.responses.create({
    model: 'gpt-5',
    instructions,
    input,
  });

  const parsedResponse = JSON.parse(response.output_text);
  const { message } = parsedResponse;
  return { message };
}

export async function searchGiphy(params) {
  const { query } = params;

  if (!query || query.trim() === '') {
    throw new Error('Query parameter is required');
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodedQuery}&limit=3&offset=0&&lang=en&bundle=messaging_non_clips`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Invalid response format from Giphy API');
    }
  } catch (error) {
    console.error('Network error:', error);
    if (error.response) {
      // Server responded with error status
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Network error
      throw new Error('Network error: Unable to reach Giphy API');
    } else {
      // Other error
      throw error;
    }
  }
}
