import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Anecdote = ( {anecdote, votes} ) => (
    <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdote}</p>
        <Votes votes={votes}/>     
    </div>
)

const Votes = ( {votes} ) => <div>has {votes} votes</div>

const Button = ({ handleClick, text} ) => <button onClick={handleClick}>{text}</button>

const MostVoted = ( {anecdotes, votes} ) => {
    const highest = Math.max(...votes)
    const index = votes.indexOf(highest)
    return (
        <div>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[index]}</p>
            <p>has {highest} votes</p>
        </div>
    )
}

const App = () => {
    const [selected, setSelected] = useState(0)
    const [allVotes, setAllVotes] = useState(new Array(6).fill(0))

    const addVote = () => {
        const points = [...allVotes]
        points[selected] += 1
        setAllVotes(points)     
    }

    const showNext = () => {
        let random = 0 
        do {
            random = Math.floor(Math.random() * anecdotes.length)
        } while (random === selected)
        setSelected(random)
    }

    return (
        <div>
            <div>
                <Anecdote anecdote={anecdotes[selected]} votes={allVotes[selected]} />
                <Button handleClick={addVote} text='Vote' />
                <Button handleClick={showNext} text='Show next anecdote' />
            </div>
            <hr />
            <div>
                <MostVoted anecdotes={anecdotes} votes={allVotes}/>
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development title...The remaining 10 percent of the code accounts for the 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as clearly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App />, document.getElementById('root'));