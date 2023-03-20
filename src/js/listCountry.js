 export default function createCountriesList(countries) {
    return countries
    .map(
        ({ flags: { svg }, name: { official } }) => `
        <li class="list__country">
        <img class="img_item" src="${svg}" alt="${official}"/>
        <h4>${official}</h4>
        </li>
        `
    ).join('');
};


    export default function createCountryInfo({
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
};