import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {
    
    let btnClass = classes.Button;
    if(props.showPersons){
        btnClass = [classes.Red,classes.Button].join(' ');
    }
    const assignedClasses = [];
    if(props.persons.length <=2){
      assignedClasses.push(classes.red); //['red']
    }
    if(props.persons.length <=1){
      assignedClasses.push(classes.bold); //['red','bold']
    }

    //AUX gibi extra componentler kullanarak root div elemanı kullanma zorunluluğunu kaldırabiliriz.
    //React 16 ile birlikte aslında aux kullanmayabilirizde, Sadece <>...</> tagları arasındada kullanabiliriz.

    return (
        <Aux>
            <h1>Hi,I'm React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working</p>
            <button className={btnClass} onClick={props.click}>Toggle Persons</button>
            <button onClick={props.login}>Log in</button>
        </Aux>
    );
}

export default cockpit;