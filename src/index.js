import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import { markUpCountryList } from './markup.js';
import { markUpCountryInfo } from './markup.js';
import { clearMarkUp } from './markup.js';

const DEBOUNCE_DELAY = 300;

const inputForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchInput = evt => {
  let name = evt.target.value.trim();
  if (!name) {
    clearMarkUp();
    return;
  }

  fetchCountries(name)
    .then(countries => {
      clearMarkUp();

      if (countries.length === 1) {
        countryList.insertAdjacentHTML(
          'beforeend',
          markUpCountryList(countries)
        );
        countryInfo.insertAdjacentHTML(
          'beforeend',
          markUpCountryInfo(countries)
        );
      }
      if (countries.length > 1 && countries.length < 10) {
        countryList.insertAdjacentHTML(
          'beforeend',
          markUpCountryList(countries)
        );
      }
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })

    .catch(error => {
      Notify.failure(error.message);
      clearMarkUp();
    });
};

inputForm.addEventListener('input', debounce(searchInput, DEBOUNCE_DELAY));
