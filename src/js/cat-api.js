import axios from 'axios';

const API_KEY =
  'live_lPe764UypqgPCYsOgInObmavNiawcZTZvUxTvDlSwt3esNPOiLbguAl2wNJJ9lsF';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['x-api-key'] = API_KEY;

async function fetchBreeds() {
  return await axios(`/breeds`);
}

function createBreedsMarkup(breeds) {
  return breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function renderBreedsList(selector, markup) {
  selector.innerHTML = markup;
}

async function fetchCatByBreed(breedId) {
  return await axios(`/images/search?breed_ids=${breedId}`);
}

function createMarkup({ url, breeds: [{ name, description, temperament }] }) {
  return `<img src="${url}" alt="${name}" width=300>
      <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
      </div>`;
}

function renderCatInfo(selector, markup) {
  selector.innerHTML = markup;
}

export {
  fetchBreeds,
  createBreedsMarkup,
  renderBreedsList,
  fetchCatByBreed,
  createMarkup,
  renderCatInfo,
};
