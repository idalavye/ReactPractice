import React from 'react';
import './Person.css';
import Radium from 'radium'

//arrow functionlarda method tanımlayamadığmız için bir üst sınıfa probs lar ile ulaşırız
const person = (probs) =>{
   
    //Sayfa enli olarak 500px den büyükse genişliğini 450px de sabit tut(Media Query)
    const style = {
      '@media (min-width:500px)':{
          width:'450px'
      } 
    };

    return(
        <div className="Person" style={style}>
            <p onClick={probs.click}>Hi, I am {probs.name} and I am {probs.age} years old</p>
            <p>{probs.children}</p>
            <input type="text" onChange={probs.changed}/>
        </div>
    )
};

export default Radium(person);