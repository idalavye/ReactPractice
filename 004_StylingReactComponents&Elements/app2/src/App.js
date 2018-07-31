import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let person = null;
    let btnClass = '';

  
    if(this.state.showPersons){
      person = (
        <div>
          {this.state.persons.map((person,index) => {
            return <ErrorBoundary key={person.id}>
                      <Person 
                      name={person.name} 
                      age={person.age}
                      click={()=>this.deletePersonHandler(index)}
                      key={person.id}
                      changed={(event) => this.nameChangedHandler(event,person.id)}
                      />
                    </ErrorBoundary>
                    
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if(this.state.persons.length <=2){
      assignedClasses.push(classes.red); //['red']
    }
    if(this.state.persons.length <=1){
      assignedClasses.push(classes.bold); //['red','bold']
    }
   
    return (    
      <div className={classes.App}>
        <h1>Hi,I'm React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button className={btnClass} onClick={() => this.togglePersonHandler()}>Toggle Name</button>
        
        {person}
        
      </div>
    );
  }
}

export default App;

//
//npm install --save radium
//npm run eject => geri dönüşü yoktur.
//  

/**
 * Developer modda ErrorBoundary sayfasını göremeyiz. Uygulamamızı bir sunucuya
 * eklediğimiz zaman hata sayfasını gösterecektir. 
 *  
 */