import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    /**
     * [...Array(3)] bize 3 elemanlı boş bir array verir.
     */

    let transformedIngredients = Object.keys(props.ingredients)
        .map(iKey => {
            return [...Array(props.ingredients[iKey])].map((_, i) => {
                return <BurgerIngredient type={iKey} key={iKey + i} />
            });
        })
        .reduce((prevValue, curentValue) => {
            return prevValue.concat(curentValue);
        }, []);

    //reduce methodunun ikinci parametresi deafult valuedur. birinci parametreden 
    //dönen sonuçları buraya ekler

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;