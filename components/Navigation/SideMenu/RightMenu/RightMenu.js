import React, {useContext} from 'react';
import TabsNavigator from '../TabsNavigator/TabsNavigator';
import {RightTabsContext} from './RightTabsContext';

const RightMenu = () => {
    const {rightTabs} = useContext(RightTabsContext);

    return (<TabsNavigator tabList={rightTabs} tabSide={"right"}/>);
};

export default RightMenu;
