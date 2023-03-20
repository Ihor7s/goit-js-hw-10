import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();
refs.countryInputEl.setAttribute('placeholder', 'Country name');
refs.countryInputEl.addEventListener('input',debounce(onCountrySearchInput, DEBOUNCE_DELAY)
);

function onCountrySearchInput(e) {
    const inputText = e.target.value;
    const valueNormalized = e.target.value.trim().toLowerCase();

    if (valueNormalized === '') {
    clearAll();
    return;
    } else {
    fetchCountries(valueNormalized)
        .then(countres => {
        const searchСountry = countres.filter(({ name }) =>
            name.official.toLowerCase().includes(valueNormalized)
        );

            if (searchСountry.length < 2) {
            
            const markupList = createCountryInfo(searchСountry[0]);
            console.log(searchСountry[0]);
            refs.countryInfo.innerHTML = markupList;
            refs.countryList.innerHTML = '';
            Notiflix.Notify.success('Here your result');

        } else if (searchСountry.length > 1 && searchСountry.length <= 10) {
            const markupList = createCountriesList(searchСountry);
            refs.countryList.innerHTML = markupList;
            refs.countryInfo.innerHTML = '';

            Notiflix.Notify.success('Here your result');
                return;
                
        } else {
            clearAll();
            Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
            );
        }
        })
        .catch(() => {
        clearAll();
        Notiflix.Notify.failure('Oops, there is no country with that name.');
        });
    }
}

function clearAll() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}


function createCountryInfo({
    flags: { svg },
    name: { official },
    capital,
    population,
    languages,
}) {

    const langs = Object.values(languages).join(', ');
    return `
    <div class="info__item-country">
    <div class="block-img">
        <img class="img_item" src="${svg}" alt="${official}"/>
        <h2>${official}</h2>
    </div>
        <div class="info__block">
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Languages:</b> ${langs}</p>
        </div>
    </div>
    `;
}


const BASE_API = 'https://restcountries.com/v3.1/all/';
const FIELDS = `?fields=name,capital,population,flags,languages`;

function fetchCountries(valueNormalized) {
    return fetch(`${BASE_API}${FIELDS}`).then(respons => respons.json());
}


function getRefs() {
    return {
    countryInputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    };
}


function createCountriesList(countries) {
    return countries
    .map(
        ({ flags: { svg }, name: { official } }) => `
        <li class="list__country">
        <img class="img_item" src="${svg}" alt="${official}"/>
        <h4>${official}</h4>
        </li>
        `
    ).join('');
}