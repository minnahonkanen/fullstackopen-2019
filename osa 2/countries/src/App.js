import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ currentCountry, setCurrentCountry ] = useState('')

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))
  const countriesToShow = showAll ? countries : filteredCountries
  
  useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleFilterChange = (event) => {
      setCountryFilter(event.target.value)
      setCurrentCountry('')
      countries !== filteredCountries ? setShowAll(false) : setShowAll(true)
  }

  const handleShowClick = (event) => {
      setCurrentCountry(countries.filter(country => country.name.toLowerCase().includes(event.currentTarget.id.toLowerCase())))
  }

  return (
      <div>
        <h1>Countries</h1>
        <Filter value={countryFilter} onChange={handleFilterChange}/>
        <Countries countries={countriesToShow} count={filteredCountries.length} click={handleShowClick} currentCountry={currentCountry}/>
      </div>
  )
}

export default App;
