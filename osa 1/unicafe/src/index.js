import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value} {props.symbol}</td>
        </tr> 
    )
}

const Statistics = ({good, neutral, bad, all}) => {
    if (all === 0) {
        return (
            <div>
                Yhtään palautetta ei ole annettu.
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="Hyvä" value={good} all={all}/>
                    <Statistic text="Neutraali" value={neutral} all={all}/>
                    <Statistic text="Huono" value={bad} all={all}/>
                    <Statistic text="Yhteensä" value={all} all={all}/>
                    <Statistic text="Keskiarvo" value={((good * 1) + (neutral * 0) + (bad * -1)) / all} all={all}/>
                    <Statistic text="Positiivisia" value={(good / all) * 100} symbol="%" all={all}/>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    const handleGoodClick = () => {
        setAll(all + 1)
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setAll(all + 1)
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setAll(all + 1)
        setBad(bad + 1)
    }

    return (
        <div>
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={handleGoodClick} text='Hyvä' />
                <Button handleClick={handleNeutralClick} text='Neutraali' />
                <Button handleClick={handleBadClick} text='Huono' />
            </div>
            <div>
                <h1>Statistiikka</h1>
                <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
