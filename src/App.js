import React, { Component } from 'react';
import Person from './Person/Person';
import classes from './App.css';

// A Class-based Component (App)
class App extends Component {
  state = {
    persons: [
      { id: "FA15-BSE-145", name: "Fahad Javed", age: 23 },
      { id: "FA15-BSE-058", name: "Muhammad Bilal", age: 22 }
    ],
    showPersons: false
  }

  switchPersonsHandler = () => {
    // console.log("Was clicked!");
    // DON'T DO LIKE THIS: this.state.persons[0].name = "Bunty";
    this.setState({
      persons: [
        { id: this.state.persons[1].id, name: this.state.persons[1].name, age: this.state.persons[1].age },
        { id: this.state.persons[0].id, name: this.state.persons[0].name, age: this.state.persons[0].age }
      ]
    });
  }

  nameChangedHandler = (event, personId) => {
    // First, find the index of the person whose name is being changed
    const personIndex = this.state.persons.findIndex((person) => {
      return person.id === personId;
    });

    // Then, fetch the actual person object by using the 'Spread' operator (as we don't want to mutate the state)
    const updatedPerson = { ...this.state.persons[personIndex] };

    // Update the person's name in this separate Person object and then reflect that change in a separate personsArray
    updatedPerson.name = event.target.value;
    const personsArray = [...this.state.persons];
    personsArray[personIndex] = updatedPerson;

    // Finally, update the actually 'state' so that React can re-render the DOM
    this.setState({
      persons: personsArray
    });
  }

  deletePersonHandler = (personIndex) => {
    // const personsArray = this.state.persons.slice();
    // An alternative to using the 'slice()' method is using the 'Spread' operator (...) as follows
    const personsArray = [...this.state.persons];
    personsArray.splice(personIndex, 1);

    // update the actual state to re-render the DOM
    this.setState({ persons: personsArray });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    const buttonStyle = {
      display: 'inline',
      backgroundColor: 'deepskyblue',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      margin: 'auto 16px'
    };

    let personsData = null;

    if (this.state.showPersons) {
      personsData = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return (
                <Person
                  key={person.id}
                  name={person.name}
                  age={person.age}
                  clickEventHandler={this.deletePersonHandler.bind(this, index)}
                  nameChanged={(event) => this.nameChangedHandler(event, person.id)} />
              );
            })
          }
        </div>
      );
    }

    // console.log(this.state);
    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p>This is really working</p>
        <button
          style={buttonStyle}
          onClick={this.switchPersonsHandler}>
          Switch Persons
        </button>
        <button
          style={buttonStyle}
          onClick={this.togglePersonsHandler}>
          {this.state.showPersons ? "Hide Persons" : "Show Persons"}
        </button>
        {personsData}
      </div>
    );
  }
}

export default App;
