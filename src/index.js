import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const ref = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

ref.error.classList.add('is-hidden');
ref.loader.classList.replace('is-hidden', 'loader');
ref.select.classList.add('is-hidden');

ref.select.addEventListener('change', handler);
function handler(evt) {
  ref.loader.classList.replace('is-hidden', 'loader');
  ref.catInfo.classList.add('is-hidden');
  ref.select.classList.add('is-hidden');
  const breedId = evt.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      ref.loader.classList.replace('loader', 'is-hidden');
      ref.catInfo.classList.remove('is-hidden');
      const { breeds, url } = data[0];

      ref.catInfo.innerHTML = `<div class='blok-img'><img src="${url}" alt="${breeds[0].name}" width="500" /></div>
      <div class='blok-info'><h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>
      `;
    })
    .catch(onFetchError);
}

function createMarkupSelect(arr) {
  return arr
    .map(({ id, name }) => `<option value =${id}>${name}</option>`)
    .join('');
}

fetchBreeds()
  .then(data => {
    ref.select.classList.remove('is-hidden');
    ref.loader.classList.replace('loader', 'is-hidden');
    console.log(data);
    ref.select.insertAdjacentHTML('afterbegin', createMarkupSelect(data));
    new SlimSelect({
      select: '#selectId',
    });
  })
  .catch(onFetchError);

function onFetchError() {
  ref.loader.classList.add('is-hidden');
  ref.select.classList.add('is-hidden');
  ref.error.classList.add('is-hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
