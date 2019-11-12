import React from 'react';

const Add = (props) => {
    return (
        <form onSubmit={props.submit}>
            <div>
                Name: <input value={props.nameValue} onChange={props.nameChange} />
            </div>
            <div>
                Number: <input value={props.numberValue} onChange={props.numberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Add