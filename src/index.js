import {
  fetchBreeds,
  createBreedsMarkup,
  renderBreedsList,
  fetchCatByBreed,
  createMarkup,
  renderCatInfo,
} from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorMsg = document.querySelector('.error');
const loaderMsg = document.querySelector('.loader');

breedsListInit();

breedSelect.addEventListener('change', onChangeSelect);

async function breedsListInit() {
  try {
    breedSelect.hidden = true;
    loaderMsg.hidden = false;
    errorMsg.hidden = true;
    Notiflix.Loading.dots('Loading data, please wait...', {
      clickToClose: true,
      svgSize: '80px',
      backgroundColor: 'rgba(0,0,0,0.8)',
    });

    const resp = await fetchBreeds();
    const markup = createBreedsMarkup(resp.data);
    renderBreedsList(breedSelect, markup);
    new SlimSelect({ select: '#selectElement' });

    Notiflix.Loading.remove();
    loaderMsg.hidden = true;
    breedSelect.hidden = false;
  } catch (error) {
    loaderMsg.hidden = true;
    errorMsg.hidden = false;

    Notiflix.Loading.remove();
    Notiflix.Report.failure(
      `Помилка отримання даних: ${error.code}`,
      `${error.name}: ${error.message}`,
      'Okay'
    );
  }
}

async function onChangeSelect(evt) {
  try {
    Notiflix.Loading.dots('Loading data, please wait...', {
      clickToClose: true,
      svgSize: '80px',
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    loaderMsg.hidden = false;
    errorMsg.hidden = true;
    catInfo.innerHTML = '';

    const breedId = evt.currentTarget.value;
    const resp = await fetchCatByBreed(breedId);
    const selectedBreed = resp.data[0];
    const markup = createMarkup(selectedBreed);
    renderCatInfo(catInfo, markup);

    Notiflix.Loading.remove();
    loaderMsg.hidden = true;
  } catch (error) {
    loaderMsg.hidden = true;
    errorMsg.hidden = false;

    Notiflix.Loading.remove();
    Notiflix.Report.failure(
      `Помилка отримання даних: ${error.code}`,
      `${error.name}: ${error.message}`,
      'Okay'
    );
  }
}
