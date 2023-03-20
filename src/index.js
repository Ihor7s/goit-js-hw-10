import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import getRefs from './js/refs';
import fetchCountries from './js/searchСountry';
import createCountriesList from './js/listCountry'
import createCountryInfo from './js/listCountry';


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

