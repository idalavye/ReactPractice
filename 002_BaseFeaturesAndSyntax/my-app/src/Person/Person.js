import React from 'react';
import './Person.css';

//arrow functionlarda method tanımlayamadığmız için bir üst sınıfa probs lar ile ulaşırız
const person = (probs) =>{
    return(
        <div className="Person">
            <p onClick={probs.click}>Hi, I am {probs.name} and I am {probs.age} years old</p>
            <p>{probs.children}</p>
            <input type="text" onChange={probs.changed}/>
        </div>
    )
};

export default person;


