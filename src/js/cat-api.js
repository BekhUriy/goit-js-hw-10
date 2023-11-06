import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_9QBE8PCgoAzJqgjVMd6ZM1o3gO4CvxzVEb3GLf2dM7EvH7xwfZz3vfxo17gaL4VY';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
};
