const URL_API = 'https://api.thecatapi.com/v1';
const KEY_API =
  'live_9QBE8PCgoAzJqgjVMd6ZM1o3gO4CvxzVEb3GLf2dM7EvH7xwfZz3vfxo17gaL4VY';

export function fetchBreeds() {
  return fetch(`${URL_API}/breeds`, { headers: { 'x-api-key': KEY_API } }).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

export function fetchCatByBreed(breedId) {
  return fetch(`${URL_API}/images/search?breed_ids=${breedId}`, {
    headers: { 'x-api-key': KEY_API },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
