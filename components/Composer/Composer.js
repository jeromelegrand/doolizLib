import React, {useContext} from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {ComposerContext} from './ComposerContext';
import Row from './Row/Row';
import Svg from '../Svg/Svg';
import {createNewRow} from '../../services/DragAndDrop/DragAndDrop';
import {colorGreyDarken} from '../../../../css/colors.scss';
import './Composer.scss';
import {Plus} from '../Svg/SvgImages';
import {DocumentParametersContext} from '../Navigation/SideMenu/RightMenu/DocumentPrameters/DocumentParametersContext';

const Composer = ({type}) => {

    const {composerData, setComposerData, toggleElementSelection, style} = useContext(ComposerContext);
    const {documentFormat} = useContext(DocumentParametersContext);

    const addRow = index => {
        const newIndex = index + 1;
        setComposerData(createNewRow(newIndex, composerData));
    };

    const renderRows = () => {
        const rows = [];
        composerData.rowOrder.map((rowId, index) => {
            const showAddRow = composerData.rowOrder.length === (index + 1);
            const row = composerData.rows[rowId];
            const columns = row.columnIds.map(columnId => composerData.columns[columnId]);
            rows.push(
                <React.Fragment key={`react-fragment-${rowId}`}>
                    <Row key={rowId} id={rowId} columns={columns} index={index}/>
                    {showAddRow &&
                    <div key={`add-row-${rowId}`} className="add-row-div">
                        <div className="dotted-line"/>
                        <div className="add-row-btn" onClick={() => addRow(index)}>
                            <Svg color={colorGreyDarken} height={20} width={20} image={Plus}
                                 hoverColor={colorGreyDarken}/>
                            <p>Ajouter une ligne ici</p>
                        </div>
                        <div className="dotted-line"/>
                    </div>}
                </React.Fragment>
            );
        });
        return rows;
    };

    return (
        <div
            id={`${type}Composer`}
            className={`composer ${documentFormat.orientation}`}
            onClick={(e) => toggleElementSelection(e, null)}
        >
            <div className="border-composer"/>
            <main className="container" style={style}>
                <Droppable droppableId="all-rows" direction="vertical" type="row">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {renderRows()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </main>
            <div className="border-composer"/>
        </div>
    );
};

export default Composer;
