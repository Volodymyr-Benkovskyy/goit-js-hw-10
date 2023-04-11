const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export const markUpCountryList = countries => {
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

export const markUpCountryInfo = country => {
  return country
    .map(el => {
      /* console.log(el.languages); */
      return `
            <p><b>Capital: </b>${el.capital}</p>
             <p><b>Population: </b>${el.population}</p>
             <p><b>Languages: </b>${Object.values(el.languages)}</p>
        `;
    })
    .join('');
};

export const clearMarkUp = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};
