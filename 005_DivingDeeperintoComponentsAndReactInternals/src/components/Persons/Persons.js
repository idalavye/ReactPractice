import React,{Component} from 'react';
import Person from './Person/Person';

/*
const persons = () => {
    return ();
}
*/
//Arrow functionlarda return işlemi parantez açarak daha pratik bir şekilde gerçekleştirebiliriz.
//const persons = () => ();
/*
const persons = (props) => props.persons.map((person, index) => {
    return <Person
        name={person.name}
        age={person.age}
        click={() => props.click(index)}
        key={person.id}
        changed={(event) => props.changed(event, person.id)}
        />     
}); 

export default persons;
*/


//So now we turned our stateless component into a stateful component.
class Persons extends Component{
    render(){
        return this.props.persons.map((person, index) => {
            return <Person
                name={person.name}
                age={person.age}
                click={() => this.props.click(index)}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
                />     
        })
    }
}

export default Persons