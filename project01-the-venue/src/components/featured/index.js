import React from 'react';
import Carrousel from './carrousel';

const Featured = () => {
    return (
        <div style={{ position: 'relative' }}>
            <Carrousel />
            <div className="artist_name">
                <div className="wrapper">
                    Ariana Grade
                </div>
            </div>
        </div>
    );
};

export default Featured;