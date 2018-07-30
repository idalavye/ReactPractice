import React from 'react'

const userinput = (probs) =>{
    return(
        <div>
            <input type="text" onChange={probs.changed} value={probs.currentValue}></input>
        </div>
    );
}

export default userinput;