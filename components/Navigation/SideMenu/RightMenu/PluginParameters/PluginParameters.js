import React, {useEffect, useContext} from 'react';
import {ComposerContext} from '../../../../Composer/ComposerContext';
import {getModuleByColId} from '../../../../../services/DragAndDrop/DragAndDrop';

const PluginParameters = () => {
    const {composerData, selectedElement} = useContext(ComposerContext);

    useEffect(() => {
        try {
            const module = selectedElement ? getModuleByColId(selectedElement, composerData) : null;

        } catch (e) {

        }
    }, [selectedElement]);

    return (
        <div>
            selected plugin : {selectedElement ?? null}
        </div>
    );
};

export default PluginParameters;
