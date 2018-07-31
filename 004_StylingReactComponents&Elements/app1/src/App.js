import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
import Radium,{ StyleRoot } from 'radium'

class App extends Component {
  state = {
    persons: [
      {id:'asdf', name: 'Max', age: 28 },
      {id:'ewasdf', name: 'Manu', age: 29 },
      {id:'asdfa', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons:false
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { id:'asdfa', name: newName, age: 28 },
        { id:'aasdfs',name: 'Manu', age: 29 },
        { id:'asdfad',name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons:persons
    })

  }

  togglePersonHandler = () =>{
    const chagedShow = this.state.showPersons;
    this.setState({
      showPersons:!chagedShow
    })
  }

  deletePersonHandler = (index) =>{
    const persons = [...this.state.persons];
    persons.splice(index,1);
    this.setState({
      persons:persons
    })
  }

  render() {
    const style = {
      backgroundColor:'green',
      color:'white',
      font:'inherit',
      border:"1px solid blue",
      padding:'8px',
      cursor:'pointer',
      ':hover':{
        backgroundColor:'lightgreen',
        color:'black'
      }
    };

    let person = null;

    if(this.state.showPersons){
      person = (
        <div>
          {this.state.persons.map((person,index) => {
            return <Person 
                    name={person.name} 
                    age={person.age}
                    click={()=>this.deletePersonHandler(index)}
                    key={person.id}
                    changed={(event) => this.nameChangedHandler(event,person.id)}
                    />
          })}
        </div>
      );
      style.backgroundColor = "red";

      //radium kütüphanesin özelliklerinden biri bizim pseude selectors kullanabilmemizi sağlamasıdır.
      style[':hover'] = {
        backgroundColor:'salmon',
        color:'black'
      };
    }

    //let classes = ['red','bold'].join(' ');

    const classes = [];
    if(this.state.persons.length <=2){
      classes.push('red'); //['red']
    }
    if(this.state.persons.length <=1){
      classes.push('bold'); //['red','bold']
    }
   
    return (
      <StyleRoot>
      <div className="App">
        <h1>Hi,I'm React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button style={style} onClick={() => this.togglePersonHandler()}>Toggle Name</button>
        
        {person}
        
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);

//
//npm install --save radium
//  