import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetch-countries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onChangeInput, DEBOUNCE_DELAY));

function onChangeInput(event) {
  const countryName = event.target.value.trim();

  fetchCountries(countryName)
    .then(countries => {
      clearInfo();

      if (countries.length > 10) {
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (countries.length >= 2 && countries.length <= 10) {
        renderCountrysList(countries);
        return;
      }

      // if (countryName === '') {
      //   return;
      // }

      renderCountryInfo(countries);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryInfo(countries) {
  const markup = countries
    .map(country => {
      return `
      <div class="country-info__item">
        <img
          src="${country.flags.png}"
          alt="${country.name.official}"
          width="40"
          height="30"
        />
        <p><b>${country.name.official}</b></p>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${Object.values(country.languages)}</p>
      </div>`;
    })
    .join('');

  countryInfo.insertAdjacentHTML('beforeend', markup);
}

function renderCountrysList(countries) {
  const markup = countries
    .map(country => {
      return `
        <li class="country-list__item">
          <img src="${country.flags.png}" alt="${country.name.official}" width="40" height="30" />
          <p><b>${country.name.official}</b></p>
        </li>`;
    })
    .join('');

  countryList.insertAdjacentHTML('beforeend', markup);
}

function clearInfo() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
