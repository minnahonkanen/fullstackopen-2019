import React from 'react';

const Filter = (props) => {
    return (
        <div>
            <strong>Find countries:</strong> <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default Filter