import React,{Component} from 'react';
import './Person.css';
import classes from './Person.css';
import withClasses from '../../../hoc/WithClasses2';
import Aux from '../../../hoc/Aux';
import propTypes from 'prop-types';
import {AuthContext}  from '../../../containers/App';

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
    constructor(props){
        super(props);
        console.log('[Person.js] Inside Constructors');
        this.inputElement = React.createRef();
    }
    
    componentWillMount(){
        console.log('[Person.js] Inside componentWillMounth');
    }
    
    componentDidMount(){
        console.log('[Person.js] Inside componentDidMounth');
        if(this.props.position === 0){
            //this.inputElement.focus();
            this.inputElement.current.focus();
        }
    }

    focus(){
        this.inputElement.current.focus();
    }

    //ref anahtar kelimesi key anahtar kelimesi gibi özel bir kelimedir.
    //componentDidMount metodu render metodundan sonra çağrılır.
    render(){
        console.log(['[Person.js] Inside render'])
        return (
            <Aux>  
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated!</p> : null}
                </AuthContext.Consumer>
                
                <p onClick={this.props.click}>Hi, I am {this.props.name} and I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input 
                    //ref={(inp) => this.inputElement = inp}
                    ref={this.inputElement}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name} />               
            </Aux>
        );
    }
}

Person.propTypes = {
    click: propTypes.func,
    name: propTypes.string,
    age: propTypes.number,
    changed: propTypes.func
}

export default withClasses(Person,classes.Person)