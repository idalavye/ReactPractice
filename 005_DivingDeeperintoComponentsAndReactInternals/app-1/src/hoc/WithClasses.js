import React from 'react';

const withClasses = (props) => (
    <div className={props.classes}>
        {props.children}
    </div>
);

export default withClasses;
