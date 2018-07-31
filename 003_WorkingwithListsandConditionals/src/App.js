import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

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


  /*
  nameChangedHandler = (event) =>{
    this.setState( {
      persons: [
        { name: 'İbrahim', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }
  */

  togglePersonHandler = () =>{
    const chagedShow = this.state.showPersons;
    this.setState({
      showPersons:!chagedShow
    })
  }

  deletePersonHandler = (index) =>{
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index,1); //Bulunduğu indexten bir adım ilerleyip diziden kesiyoruz. Bu şekilde ssilme işlemi gerçekleştirebiliriz.
    this.setState({
      persons:persons
    })
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

    let person = null;

    if(this.state.showPersons){

      /*
      person = (
       <div>
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
      )
      */

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
      )
    }

    return (
      <div className="App">
        <h1>Hi,I'm React App</h1>
        <p>This is really working</p>
        <button style={style} onClick={() => this.togglePersonHandler()}>Toggle Name</button>
        
        {person}
        
      </div>
    );
  }
}

export default App;

//JSX tagleri arka tarafta React.crateElement methodlarına dönüşür.

/**
  {
          this.state.showPersons === true ? 
          <div>
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
          :null
        }
 */



 /*
{person}
 */