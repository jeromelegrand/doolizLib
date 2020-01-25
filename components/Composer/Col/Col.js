import React, { useState, useEffect, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ComposerContext } from '../ComposerContext';
import DragDropControls from '../DragDropControls/DragDropControls';
import RenderModule from './RenderModule';

import './Col.scss';

const Col = ({id, index, module}) => {
    const {selectedElement, toggleElementSelection} = useContext(ComposerContext);
    const [colSelected, setColSelected] = useState('');

    useEffect(() => {
        setColSelected(selectedElement && selectedElement.includes(id) ? 'colSelected' : '');
    }, [selectedElement]);

    return (
        <div
            id={id}
            className="composer-col-container"
            onClick={e => toggleElementSelection(e, id)}
        >
            <Draggable draggableId={id} index={index} datatype="col">
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        isdragging={snapshot.isDragging.toString()}
                        className={`composer-col ${colSelected}`}
                        id={`drag-col-${id}`}
                    >
                        <div>
                            <DragDropControls
                                type="col"
                                provided={provided}
                                id={id}
                                index={index}
                                className="col-controls"
                            />
                        </div>
                        <RenderModule id={id} type={module}/>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default Col;
