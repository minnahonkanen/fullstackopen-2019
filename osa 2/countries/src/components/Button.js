import React from 'react';

const Button = (props) => {
    return (
        <button onClick={props.click} id={props.country.name}>show</button>
    )
}

export default Button