import React from 'react'

const Persons = ({persons, click}) => {
    const rows = () => persons.map(person => <li className="names" key={person.id}>{person.name} {person.number} <button onClick={() => click(person.id)}>delete</button></li>)
    return (
        <div>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

export default Persons