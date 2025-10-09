import axios from 'axios';

export async function searchGiphy(params) {
  const { query } = params;

  if (!query || query.trim() === '') {
    throw new Error('Query parameter is required');
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `https://api.giphy.com/v1/gifs/search?api_key=UKpHvQMYAq9LAzg0Jhm1rKJ81avNfyba&q=${encodedQuery}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

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
