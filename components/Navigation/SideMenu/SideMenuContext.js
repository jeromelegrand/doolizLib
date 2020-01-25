import React, {createContext, useState} from 'react';

export const SideMenuContext = createContext();

const SideMenuContextProvider = props => {
    const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);
    const [rightMenuIsOpen, setRightMenuIsOpen] = useState(false);

    return (
        <SideMenuContext.Provider value={{leftMenuIsOpen, setLeftMenuIsOpen, rightMenuIsOpen, setRightMenuIsOpen}}>
            {props.children}
        </SideMenuContext.Provider>
    )
};

export default SideMenuContextProvider;