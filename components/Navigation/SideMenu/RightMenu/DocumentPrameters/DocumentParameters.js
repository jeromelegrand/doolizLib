import React from 'react';
import './DocumentParameters.scss';
import Format from './Format/Format';
import Background from './Background/Background';
import FontFamily from './Font/FontFamily/FontFamily';

const DocumentParameters = ({type}) => {

    return (
        <div className="doc-params-list">
            <Format type={type}/>
            <Background/>
            <FontFamily/>
        </div>
    )
};

export default DocumentParameters