import React from 'react';
import Log from '../components/Log';

const Profil = () => {
    return (
        <div className='profil-page'>
            <div className='log-container'>
                <Log signin={false} signup={true} />
                <div className="img-containter">
                    <img src="./img/log.png" alt="img-log"></img>
                </div>
            </div>
        </div>
    );
};

export default Profil;