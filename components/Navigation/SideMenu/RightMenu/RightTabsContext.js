import React, {createContext, useState} from 'react';
import PluginParameters from './PluginParameters/PluginParameters';
import DocumentParameters from './DocumentPrameters/DocumentParameters';

export const RightTabsContext = createContext();

const RightTabsContextProvider = props => {

    const [rightTabs, setRightTabs] = useState([
        {title: 'Document', content: <DocumentParameters type={props.type}/>},
        {title: 'Plugin', content: <PluginParameters/>}
    ]);

    return (
        <RightTabsContext.Provider value={{rightTabs, setRightTabs}}>
            {props.children}
        </RightTabsContext.Provider>
    )
};

export default RightTabsContextProvider;
