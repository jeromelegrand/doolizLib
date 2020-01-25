import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './Routes';
import RightTabsContextProvider from './components/Navigation/SideMenu/RightMenu/RightTabsContext';
import LeftTabsContextProvider from './components/Navigation/SideMenu/LeftMenu/LeftTabsContext';
import SideMenuContextProvider from './components/Navigation/SideMenu/SideMenuContext';
import ComposerContextProvider from './components/Composer/ComposerContext';

import './App.scss'

const props = JSON.parse(document.getElementById('reactApp').dataset.props);

export const App = ({props}) => {

    const params = JSON.parse(props.params);
    const media = JSON.parse(props.media);
    const document = JSON.parse(props.document);
    const contact = JSON.parse(props.contact);

    return (
        <ComposerContextProvider>
            <Router>
                <LeftTabsContextProvider>
                    <RightTabsContextProvider type={props.composerType}>
                        <SideMenuContextProvider>
                            <Routes
                                params={params}
                                media={media}
                                document={document}
                                contact={contact}
                                type={props.composerType}
                            />
                        </SideMenuContextProvider>
                    </RightTabsContextProvider>
                </LeftTabsContextProvider>
            </Router>
        </ComposerContextProvider>
    );
};


export default App;
