import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

// Функція, що показує/ховає loader
function toggleLoader(showLoader) {
  const loaderElement = document.querySelector('.loader');
  if (showLoader) {
    loaderElement.style.display = 'block';
  } else {
    loaderElement.style.display = 'none';
  }
}

// Показати loader при старті
toggleLoader(true);

// Отримати список порід і відобразити їх у випадаючому списку
fetchBreeds()
  .then(breeds => {
    const selectElement = document.getElementById('selectId');
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      selectElement.add(option);
    });

    // Ініціалізувати SlimSelect після додавання опцій
    new SlimSelect({
      select: '#selectId',
    });

    // Приховати loader після завантаження порід
    toggleLoader(false);
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
    // Показати повідомлення про помилку та приховати loader
    const errorElement = document.querySelector('.error');
    errorElement.style.display = 'block';
    toggleLoader(false);
  });

// Обробник події вибору породи
document.getElementById('selectId').addEventListener('change', function () {
  const selectedBreedId = this.value;

  // Показати loader перед виконанням запиту
  toggleLoader(true);

  // Отримати інформацію про кота та відобразити її
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const catInfoElement = document.querySelector('.cat-info');
      const catImage = document.createElement('img');
      catImage.src = catData.url;
      const catName = document.createElement('h2');
      catName.textContent = catData.breeds[0].name;
      const catDescription = document.createElement('p');
      catDescription.textContent = catData.breeds[0].description;
      const catTemperament = document.createElement('p');
      catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;

      // Очищаємо div.cat-info перед вставкою нових даних
      catInfoElement.innerHTML = '';

      // Вставка елементів
      catInfoElement.appendChild(catImage);
      catInfoElement.appendChild(catName);
      catInfoElement.appendChild(catDescription);
      catInfoElement.appendChild(catTemperament);

      // Показати div.cat-info та приховати loader
      catInfoElement.style.display = 'block';
      toggleLoader(false);
    })
    .catch(error => {
      console.error(
        `Error fetching cat info for breed ${selectedBreedId}:`,
        error
      );
      // Показати повідомлення про помилку та приховати loader
      const errorElement = document.querySelector('.error');
      errorElement.style.display = 'block';
      toggleLoader(false);
    });
});
