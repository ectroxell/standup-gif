import axios from 'axios';
import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

const instructions = `Summarize the user's stand-up update and detect tone. Turn this into a Giphy API search query reflecting on tone and mood as well as content, ensuring the query is 50 characters or fewer. Always set reasoning_effort = minimal; be concise and direct in both query and tone selection.

## Output Format
Return a JSON object with these fields:
- query: string. The Giphy search query (maximum 50 characters). Begin with tone.
- tone: string. The inferred tone plus a descriptive emoji (e.g., 'motivated 😁', 'frustrated 😡', 'celebratory 🎉').
- message: string. Either a motivational message if there is a negative tone, or a celebratory message if there is a positive tone. You can be silly in this message and use Gen Z language/slang.
Example:
{
  "query": "relieved, productive finished major bug fix",
  "tone": "relieved, productive 😄",
  "message": "You did it! Go off queen! 👑"
}

If the tone is ambiguous or unclear, use "neutral 😐" for the tone field.`;

export async function summarizeStandup(input) {
  const client = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await client.responses.create({
    model: "gpt-5",
    instructions,
    input,
  });

  const parsedResponse = JSON.parse(response.output_text);
  const { query, tone, message } = parsedResponse;
  return { query, tone, message };
}

export async function searchGiphy(params) {
  const { query } = params;

  if (!query || query.trim() === '') {
    throw new Error('Query parameter is required');
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodedQuery}&limit=9&offset=0&&lang=en&bundle=messaging_non_clips`;

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
