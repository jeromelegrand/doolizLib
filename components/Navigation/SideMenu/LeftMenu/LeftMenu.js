import React, {useContext} from 'react';
import TabsNavigator from '../TabsNavigator/TabsNavigator';
import {LeftTabsContext} from './LeftTabsContext';

const LeftMenu = () => {

    const {leftTabs} = useContext(LeftTabsContext);

    return <TabsNavigator tabList={leftTabs} tabSide={"left"}/>;
};

export default LeftMenu;
