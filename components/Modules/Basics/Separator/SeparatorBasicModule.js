import React from 'react';
import './SeparatorBasicModule.scss';

const SeparatorBasicModule = ({id}) => {

    return (
        <div id={id} className="col-module separator-module-container">
            <div className="separator-module"/>
        </div>
    )
};

export default SeparatorBasicModule;
