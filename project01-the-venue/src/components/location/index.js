import React from 'react';

const Location = () => {
    return (
        <div className="location_wrapper">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5386.144558731917!2d30.329004939880047!3d40.74285640767114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ccad1b5f163f3d%3A0xfde55d9e67a6865c!2sSerdivan%2FSakarya!5e0!3m2!1str!2str!4v1545144125084"
                width="100%" height="550px"
                frameBorder="0"
                allowFullScreen>
            </iframe>

            <div className="location_tag">
                <div>Location</div>
            </div>
        </div>
    );
};

export default Location;