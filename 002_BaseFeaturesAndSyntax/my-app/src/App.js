import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons:false
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (event) =>{
    this.setState( {
      persons: [
        { name: 'İbrahim', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  togglePersonHandler = () =>{

  }

  //() => this.switchNameHandler('İbrahim') kullanmak yerine bind metodunu kullanmamız önerilir.

  render() {
    const style = {
      backgroundColor:'white',
      font:'inherit',
      border:"1px solid blue",
      padding:'8px',
      cursor:'pointer'
    };

    return (
      <div className="App">
        <h1>Hi,I'm React App</h1>
        <p>This is really working</p>
        <button style={style} onClick={() => togglePersonHandler()}>Switch Name</button>
        <Person 
        name={this.state.persons[0].name}
        age = {this.state.persons[0].age} 
        click={this.switchNameHandler.bind(this,'Aykut')}
        changed={this.nameChangedHandler}/>
        
        <Person 
        name={this.state.persons[1].name}
        age = {this.state.persons[1].age} />

        <Person 
        name={this.state.persons[2].name}
        age = {this.state.persons[2].age} />

      </div>
    );
  }
}

export default App;
