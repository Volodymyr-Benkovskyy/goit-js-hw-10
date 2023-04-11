import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputForm = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const markUpCountryList = countries => {
  return countries
    .map(country => {
      return `
  <li class="country-item">
      <img class="country-img" alt="" src="${country.flags.svg}"> 
      <h2 class="country-title">${country.name.official}</h2>
    </li>
    `;
    })
    .join('');
};

const markUpCountryInfo = country => {
  return country
    .map(el => {
      const languagesArr = Object.values(el.languages);
      return `
            <p><b>Capital: </b>${el.capital}</p>
             <p><b>Population: </b>${el.population}</p>
             <p><b>Languages: </b>${languagesArr}</p>
        `;
    })
    .join('');
};

const searchInput = evt => {
  let name = evt.target.value.trim();
  if (!name) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  const clearMarkUp = () => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  };

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
      Notify.failure('Oops, something went wrong! Please try again.');
      clearMarkUp();
      console.log(error);
    });
};

inputForm.addEventListener('input', debounce(searchInput, DEBOUNCE_DELAY));
