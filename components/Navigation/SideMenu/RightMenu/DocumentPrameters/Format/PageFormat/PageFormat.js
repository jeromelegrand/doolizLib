import React, {useContext, useEffect, useState} from 'react';
import {DocumentParametersContext} from '../../DocumentParametersContext';

const PageFormat = () => {

    const {documentFormat, setDocumentFormat} = useContext(DocumentParametersContext);

    const [format, setFormat] = useState('A4');
    const [orientation, setOrientation] = useState('vertical');

    useEffect(() => {
        setDocumentFormat({...documentFormat, orientation});
        localStorage.documentFormat = JSON.stringify(documentFormat);
    }, [format, orientation]);

    return (
        <React.Fragment>
            <div className="doc-params-section">
                <p className="doc-params-section-title bold">Type</p>
                <div className="doc-params-section-content">
                    <p
                        className={`params-options-btn ${format === 'A3' ? 'selected-params-option' : ''}`}
                        onClick={() => setFormat('A3')}
                    >
                        A3
                    </p>
                    <p
                        className={`params-options-btn ${format === 'A4' ? 'selected-params-option' : ''}`}
                        onClick={() => setFormat('A4')}
                    >
                        A4
                    </p>
                    <p
                        className={`params-options-btn ${format === 'A5' ? 'selected-params-option' : ''}`}
                        onClick={() => setFormat('A5')}
                    >
                        A5
                    </p>
                </div>
            </div>
            <div className="doc-params-section">
                <p className="doc-params-section-title bold">Orientation</p>
                <div className="doc-params-section-content">
                    <p
                        className={`params-options-btn ${orientation === 'vertical' ? 'selected-params-option' : ''}`}
                        onClick={() => setOrientation('vertical')}
                    >
                        Portrait
                    </p>
                    <p
                        className={`params-options-btn ${orientation === 'horizontal' ? 'selected-params-option' : ''}`}
                        onClick={() => setOrientation('horizontal')}
                    >
                        Paysage
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
};

export default PageFormat;