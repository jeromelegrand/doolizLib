import React, { useEffect, useContext, useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { ComposerContext } from '../ComposerContext';
import Col from '../Col/Col';
import DragDropControls from '../DragDropControls/DragDropControls';

import './Row.scss';

const Row = ({id, columns, index}) => {
    const {selectedElement, toggleElementSelection} = useContext(ComposerContext);
    const [rowSelected, setRowSelected] = useState('');

    useEffect(() => {
        setRowSelected(selectedElement && selectedElement.includes(id) ? 'rowSelected' : '');
    }, [selectedElement]);

    const renderColumns = () => {
        const cols = [];
        columns.map((column, index) => {
            cols.push(
                <Col key={column.id} id={column.id} title={column.title} index={index} module={column.module}/>,
            );
        });
        return cols;
    };

    return (
        <div
            id={id}
            className="composer-row-container"
            onClick={(e) => toggleElementSelection(e, id)}
        >
            <Draggable draggableId={id} index={index} datatype="row">
                {provided => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={`composer-row ${rowSelected}`}
                    >
                        <DragDropControls
                            type="row"
                            provided={provided}
                            id={id}
                            index={index}
                            className="row-controls"
                        />
                        <Droppable droppableId={id} type="column" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`columns ${snapshot.isDraggingOver ? 'row-dragging-over' : ''}`}
                                    isdraggingover={snapshot.isDraggingOver.toString()}
                                    id={`row-droppable-area-${id}`}
                                >
                                    {renderColumns()}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default Row;
