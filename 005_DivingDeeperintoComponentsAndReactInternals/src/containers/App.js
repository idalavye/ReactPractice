import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  constructor(props){
    super(props);//Bu kesinlikler olmak zorunda
    console.log('[App.js] Inside Constructors',props);
    
    //Reactın eski versiyonlarında aşağıdaki şekilde bir kullanım sözkonusuydu. Modern react ta 
    //constructor içinde belirtmeden aşağıdaki kullanımda state tanımlamaları yapabiliriz.
    this.state = {
      persons: [
        {id:'asdf', name: 'Max', age: 28 },
        {id:'ewasdf', name: 'Manu', age: 29 },
        {id:'asdfa', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons:false
    }

  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMounth');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMounth')
  }

  /*
  state = {
    persons: [
      {id:'asdf', name: 'Max', age: 28 },
      {id:'ewasdf', name: 'Manu', age: 29 },
      {id:'asdfa', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons:false
  }
  */

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
    console.log('[App.js] Inseded render')

    let persons = null;

    if(this.state.showPersons){
      persons = 
          <Persons 
            persons={this.state.persons}
            click={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
      ;
    }
   
    return (    
      <div className={classes.App}>
        
        <Cockpit 
        showPersons={this.state.showPersons}
        persons={this.state.persons}
        click={this.togglePersonHandler}/>
        {persons}
        
      </div>
    );
  }
}

export default App;

//
//npm install --save radium
//npm run eject => geri dönüşü yoktur.
//  

/********************************************************************************
 * Developer modda ErrorBoundary sayfasını göremeyiz. Uygulamamızı bir sunucuya *
 * eklediğimiz zaman hata sayfasını gösterecektir.                              *
 *******************************************************************************/