import React from 'react'

const useroutput = (probs) =>{
    return(
        <div>
            <p>{probs.header}</p>
            <p>{probs.content}</p>
            <p>Yazar : {probs.author}</p>
        </div>
    );
}

export default useroutput;