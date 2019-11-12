import React from 'react';

const Country = ({country}) => {
    const row = () => 
    country.map(
        country => 
            <div key={country.alpha3Code}>
                <h2>{country.name}</h2>
                <p><strong>Capital:</strong> {country.capital}</p>
                <div><strong>Language(s):</strong> {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}</div>
                <div><img src={country.flag} alt={country.name} width="150px"/></div>
            </div>
    )
    return (
        <div>{row()}</div>
    )
}

export default Country