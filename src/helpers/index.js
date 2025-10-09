import axios from 'axios';
import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export async function summarizeStandup(input) {
  const client = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: "Summarize this stand up update into search terms for a gif. Keep it 50 characters or less: " + input,
  });

  return response.output_text;
}

export async function searchGiphy(params) {
  const { query } = params;

  if (!query || query.trim() === '') {
    throw new Error('Query parameter is required');
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodedQuery}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

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
