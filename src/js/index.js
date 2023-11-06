import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const selectElement = document.getElementById('selectId');
const loaderElement = document.getElementById('loader');
const errorElement = document.getElementById('error');
const selectContainer = document.getElementById('selectContainer');
const catInfoElement = document.getElementById('catInfo');
const catImageElement = document.getElementById('catImage');
const breedNameElement = document.getElementById('breedName');
const breedDescriptionElement = document.getElementById('breedDescription');
const breedTemperamentElement = document.getElementById('breedTemperament');

let breeds = [];

const initialize = async () => {
  try {
    loaderElement.style.display = 'block';
    breeds = await fetchBreeds();

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      selectElement.add(option);
    });

    new SlimSelect({
      select: selectElement,
      placeholder: 'Select a breed',
    });

    loaderElement.style.display = 'none';
    selectElement.removeAttribute('hidden');
  } catch (error) {
    loaderElement.style.display = 'none';
    errorElement.style.display = 'block';
  }
};

const showCatInfo = async breedId => {
  try {
    loaderElement.style.display = 'block';
    catInfoElement.style.display = 'none';

    const catData = await fetchCatByBreed(breedId);

    catImageElement.src = catData.url;

    const selectedBreed = breeds.find(breed => breed.id === breedId);
    breedNameElement.textContent = `Breed: ${selectedBreed.name}`;
    breedDescriptionElement.textContent = `Description: ${selectedBreed.description}`;
    breedTemperamentElement.textContent = `Temperament: ${selectedBreed.temperament}`;

    loaderElement.style.display = 'none';
    catInfoElement.style.display = 'block';
  } catch (error) {
    loaderElement.style.display = 'none';
    errorElement.style.display = 'block';
  }
};

selectElement.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  showCatInfo(selectedBreedId);
});

initialize();
