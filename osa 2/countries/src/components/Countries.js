import React from 'react';
import Country from './Country'
import Button from './Button'

const Countries = (props) => {

    const rows = () => props.countries.map(country => <li key={country.alpha3Code}>{country.name} <Button click={props.click} country={country}/></li>)

    if (props.currentCountry !== '') {
        return (
            <Country country={props.currentCountry}/>
        )
    }

    if (props.count > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter!</p>
            </div>
        )
    } else if (props.count === 1) {
        return (
            <div>
                <Country country={props.countries}/>
            </div>
        )
    } else {
        return (
            <div>
                {rows()}
            </div>
        )
    }
    
}

export default Countries