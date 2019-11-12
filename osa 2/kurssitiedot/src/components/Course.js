import React from 'react';

const Course = ({courses}) => {

    const rows = () => courses.map(course =>
        <div key={course.id}>
            <Header text={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
      )

    return (
        <div>
            {rows()}
        </div>
    )
}

const Header = ({text}) => {
    return (
        <div>
            <h2>{text}</h2>
        </div>
    )
}

const Content = ({parts}) => {

    const rows = () => parts.map(part =>
        <Part 
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      )

    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({parts}) => {

    let total = parts.reduce(function(sum, parts) {
        return sum + parts.exercises
    }, 0)

    return (
        <div>
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}

const Part = ({name, exercises}) => {
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

export default Course