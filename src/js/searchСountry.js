const BASE_API = 'https://restcountries.com/v3.1/all/';
const FIELDS = `?fields=name,capital,population,flags,languages`;

export default function fetchCountries(valueNormalized) {
    return fetch(`${BASE_API}${FIELDS}`).then(respons => respons.json());
}
