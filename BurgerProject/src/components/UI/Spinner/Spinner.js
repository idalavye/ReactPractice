import React from 'react';
import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.spinner}>
        <div className={classes.dot1}></div>
        <div className={classes.dot2}></div>
    </div>
);

export default spinner;