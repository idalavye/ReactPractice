import React from 'react';
import classes from './Person.css';


//arrow functionlarda method tanımlayamadığmız için bir üst sınıfa probs lar ile ulaşırız
const person = (probs) =>{
    const rnd = Math.random();

    if(rnd > 0.7){
        throw new Error('Something went wrong');
    }
    return(
        <div className={classes.Person}>
            <p onClick={probs.click}>Hi, I am {probs.name} and I am {probs.age} years old</p>
            <p>{probs.children}</p>
            <input type="text" onChange={probs.changed}/>
        </div>
    )
};

export default person;

/**
 * classes kullandığımız zaman css nesnelerine javascript objesi kullanarak ulaşabilmiş oluruz. Her bir css objesini 
 * unique bir şekilde html içerisine gömebilmemizi sağlar. 
 */

