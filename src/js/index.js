import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.getElementById('selectId');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

async function loadBreeds() {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.appendChild(option);
    });
    loader.style.display = 'none';
  } catch (error) {
    loader.style.display = 'none';
    console.error('Error fetching breeds:', error);
    error.style.display = 'block';
  }
}

loadBreeds();

select.addEventListener('change', async () => {
  const selectedValue = select.value;
  if (selectedValue) {
    loader.style.display = 'block';
    catInfo.innerHTML = '';

    try {
      const catData = await fetchCatByBreed(selectedValue);
      const [catInfoData] = catData;

      const breedName = document.createElement('h2');
      breedName.textContent = catInfoData.breeds[0].name;

      const description = document.createElement('p');
      description.textContent = `Description: ${catInfoData.breeds[0].description}`;

      const temperament = document.createElement('p');
      temperament.textContent = `Temperament: ${catInfoData.breeds[0].temperament}`;

      const image = document.createElement('img');
      image.src = catInfoData.url;
      image.alt = catInfoData.breeds[0].name;

      catInfo.appendChild(breedName);
      catInfo.appendChild(description);
      catInfo.appendChild(temperament);
      catInfo.appendChild(image);

      loader.style.display = 'none';
    } catch (error) {
      loader.style.display = 'none';
      console.error('Error fetching cat info:', error);
      error.style.display = 'block';
    }
  }
});
