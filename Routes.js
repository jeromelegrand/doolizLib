import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import Composer from './components/Composer/Composer';
import SideMenu from './components/Navigation/SideMenu/SideMenu';
import DefaultPage from './components/DefaultPage/DefaultPage';
import {DragDropContext} from 'react-beautiful-dnd';
import {LeftTabsContext} from './components/Navigation/SideMenu/LeftMenu/LeftTabsContext';
import {SideMenuContext} from './components/Navigation/SideMenu/SideMenuContext';
import {ComposerContext} from './components/Composer/ComposerContext';
import {
    createNewDataOnColumnDndInADifferentRow,
    createNewDataOnColumnDndInTheSameRow,
    createNewDataOnLeftColumnDnd,
    getFinishRow,
    getStartRow,
    reorderRows,
} from './services/DragAndDrop/DragAndDrop';
import ComposerNavigation from './components/Navigation/ComposerNavigation/ComposerNavigation';
import DocumentParametersContextProvider
    from './components/Navigation/SideMenu/RightMenu/DocumentPrameters/DocumentParametersContext';


const Routes = ({params, media, document, contact, type}) => {

    const {leftTabs} = useContext(LeftTabsContext);
    const {leftMenuIsOpen, rightMenuIsOpen} = useContext(SideMenuContext);
    const {composerData, setComposerData} = useContext(ComposerContext);


    const onDragEnd = result => {
        const {destination, source, type} = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        if (type === 'row') {
            setComposerData({...composerData, rowOrder: reorderRows(composerData, result)});
            return;
        }

        if (type === 'column') {
            const leftTabsOrigin = source.droppableId.includes('left');

            if (leftTabsOrigin) {
                leftTabs.map(tab => {
                    if (source.droppableId.includes(tab.title)) {
                        setComposerData(createNewDataOnLeftColumnDnd(composerData, result, tab));
                    }
                });
            } else {
                const startRow = getStartRow(composerData, source);
                const finishRow = getFinishRow(composerData, destination);

                if (startRow === finishRow) {
                    setComposerData(createNewDataOnColumnDndInTheSameRow(composerData, result));
                    return;
                }
                setComposerData(createNewDataOnColumnDndInADifferentRow(composerData, result));
            }
        }
    };

    return (
        <Switch>
            <DragDropContext onDragEnd={onDragEnd}>
                <Route path={`/react/${type}`}>
                    <ComposerNavigation type={type} params={params}/>
                    <div className="web-container-margin"/>
                    <div
                        className={`web-container${leftMenuIsOpen ? ' p-left' : ''}${rightMenuIsOpen ? ' p-right' : ''}`}
                    >
                        <DocumentParametersContextProvider>
                            <SideMenu side='left'/>
                            <Composer type={type}/>
                            <SideMenu side='right'/>
                        </DocumentParametersContextProvider>
                    </div>
                </Route>
                <Route exact path='/react'>
                    <DefaultPage/>
                </Route>
            </DragDropContext>
        </Switch>
    );
};

export default Routes;
