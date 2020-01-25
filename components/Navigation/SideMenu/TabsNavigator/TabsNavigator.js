import React, { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { LeftTabsContext } from '../LeftMenu/LeftTabsContext';
import { RightTabsContext } from '../RightMenu/RightTabsContext';
import SideModule from '../LeftMenu/SideModule/SideModule';

import './TabsNavigator.scss';
import { Droppable } from 'react-beautiful-dnd';

const TabsNavigator = ({tabList, tabSide}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabTitles, setTabTitles] = useState([]);
    const [tabPanels, setTabPanels] = useState([]);
    const {leftTabs} = useContext(LeftTabsContext);
    const {rightTabs} = useContext(RightTabsContext);

    useEffect(() => {
        const tempTabTitles = [];
        const tempTabPanels = [];

        for (const [index, tabs] of Object.entries(tabList)) {
            tempTabTitles.push(<Tab key={index}>{tabs.title}</Tab>);

            if (tabSide === 'left') {
                tempTabPanels.push(
                    <TabPanel key={index} id={tabs.title}>
                        <Droppable
                            droppableId={`left-${tabs.title}`}
                            direction="vertical"
                            type="column"
                            isDropDisabled={true}
                        >
                            {(provided, snapshot) => (
                                <div
                                    className="columns"
                                    isdraggingover={snapshot.isDraggingOver.toString()}
                                    ref={provided.innerRef}
                                >
                                    {renderColumns(tabs)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </TabPanel>,
                );
            } else {
                tempTabPanels.push(
                    <TabPanel key={index} id={tabs.title}>
                        {tabs.content}
                    </TabPanel>,
                );
            }

            setTabTitles(tempTabTitles);
            setTabPanels(tempTabPanels);
        }
    }, [leftTabs, rightTabs]);

    const renderColumns = columns => {
        const cols = [];
        columns.columnOrder.map((columnId, index) => {
            const column = columns.columns[columnId];
            cols.push(<SideModule
                key={columnId}
                id={columnId}
                title={column.title}
                index={index}
                module={column.module}
            />);
        });
        return cols;
    };

    return (
        <Tabs selectedIndex={selectedTab} onSelect={setSelectedTab}>
            <TabList>
                {tabTitles}
            </TabList>
            {tabPanels}
        </Tabs>
    );
};

export default TabsNavigator;
