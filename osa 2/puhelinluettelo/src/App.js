import React, { useState, useEffect } from 'react'
import Add from './components/Add'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Message from './components/Message'
import personService from './services/persons'
import './index.css'

const App = () => {

    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ nameFilter, setFilter ] = useState('')
    const [ showAll, setShowAll ] = useState(true)
    const [ message, setMessage ] = useState('')

    const newPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
    const personsToShow = showAll ? persons : newPersons

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        persons.map(person => person.name).includes(newName) ? handleAllreadyOnList(personObject) : handleSetPersons(personObject)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        persons !== newPersons ? setShowAll(false) : setShowAll(true)
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const createMessage = (message, time) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, time)
    }

    const handleSetPersons = (personObject) => {
        personService
            .addNew(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                createMessage(`${personObject.name} was added to phonebook`, 3000)
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                createMessage(`${personObject.name} was not added to phonebook`, 3000)
            })
    }

    const handleAllreadyOnList = (personObject) => {
        const person = persons.find(person => person.name === personObject.name)
        const id = person.id
        if (window.confirm(`${personObject.name} is already added to phonebook, do you want to replace the old number with the new one?`)) {
            personService
                .update(personObject, id)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                    createMessage(`${person.name}'s number was updated`, 3000)
                })
                .catch(error => {
                    createMessage(`Something went wrong with updating ${person.name}`, 3000)
                })
        }
        setNewName('')
        setNewNumber('')
    }

    const deletePerson = (id) => {
        const person = persons.find(person => person.id === id)
        if (window.confirm(`Do you really want to delete ${person.name}?`)) {
            personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
                createMessage(`${person.name} was deleted from phonebook`, 3000)
            })
            .catch(error => {
                createMessage(`Something went wrong with deleting ${person.name}`, 3000)
            })
        }
    }

    return (
        <div className="content">
            <div className="spot"><Message message={message}/></div>
            <h2>Phonebook</h2>
            <Filter value={nameFilter} onChange={handleFilterChange}/>
            <h3>Add a new contact</h3>
            <Add nameValue={newName} numberValue={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} submit={addPerson}/>
            <h3>Contacts:</h3>
            <Persons persons={personsToShow} click={deletePerson}/>
        </div>
    )
}

export default App
