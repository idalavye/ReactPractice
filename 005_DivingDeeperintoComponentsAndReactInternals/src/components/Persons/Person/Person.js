import React,{Component} from 'react';
import './Person.css';
import classes from './Person.css'

/*
//arrow functionlarda method tanımlayamadığmız için bir üst sınıfa probs lar ile ulaşırız
const person = (probs) =>{

    return(
        <div className={classes.Person}>
            <p onClick={probs.click}>Hi, I am {probs.name} and I am {probs.age} years old</p>
            <p>{probs.children}</p>
            <input type="text" onChange={probs.changed}/>
        </div>
    )
};

export default person;
*/

class Person extends Component {
    render() {
        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}>Hi, I am {this.props.name} and I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} />
            </div>
        );
    }
}

export default Person