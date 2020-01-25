import React, {createContext, useState} from 'react';

export const DocumentParametersContext = createContext();

const DocumentParametersContextProvider = props => {

    const initialColors = [
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#3596F3',
        '#36A9F4',
        '#2FBCD4',
        '#1D9687',
        '#4CAF50',
        '#8BC34A',
        '#CDDC3A',
        '#FBEB3A',
        '#FAC10A',
        '#FA9802',
        '#FA5722'
    ];

    const [documentFormat, setDocumentFormat] = useState({type: 'A4', orientation: 'vertical'});
    const [paletteColors, setPaletteColors] = useState(initialColors);

    return (
        <DocumentParametersContext.Provider
            value={{documentFormat, setDocumentFormat, paletteColors, setPaletteColors}}
        >
            {props.children}
        </DocumentParametersContext.Provider>
    )
};

export default DocumentParametersContextProvider;
