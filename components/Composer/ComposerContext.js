import React, {createContext, useState} from 'react';

export const ComposerContext = createContext({});

const ComposerContextProvider = props => {
    const initialData = {
        rows: {'row-1': {id: 'row-1', title: 'row 1', columnIds: []}},
        columns: {},
        rowOrder: ['row-1'],
        columnCount: 18,
    };

    const initialStyle = {
        backgroundColor: 'white',
        padding: 0,
        fontFamily: 'Raleway'
    };

    const [composerData, setComposerData] = useState(initialData);
    const [selectedElement, setSelectedElement] = useState(null);
    const [style, setStyle] = useState(initialStyle);

    const toggleElementSelection = (e, id) => {
        e.stopPropagation();

        let newSelectedElement = null;
        if (id && selectedElement !== id) {
            newSelectedElement = id;
        }

        setSelectedElement(newSelectedElement);
    };

    return (
        <ComposerContext.Provider
            value={{
                composerData,
                setComposerData,
                selectedElement,
                setSelectedElement,
                toggleElementSelection,
                style,
                setStyle
            }}
        >
            {props.children}
        </ComposerContext.Provider>
    );
};

export default ComposerContextProvider;
