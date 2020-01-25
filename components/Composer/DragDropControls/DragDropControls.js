import React, {useContext} from 'react';
import Svg from '../../Svg/Svg';
import {colorDark, colorDarkLighten} from '../../../../../css/colors.scss';
import {Cross, Drag} from '../../Svg/SvgImages';
import {ComposerContext} from '../ComposerContext';
import {deleteColumn, deleteRow} from '../../../services/DragAndDrop/DragAndDrop';

const DragDropControls = ({type, provided, id, index, className}) => {

    const {composerData, setComposerData} = useContext(ComposerContext);

    const deleteData = () => {
        if (type === "row") {
            setComposerData(deleteRow(index, composerData))
        } else {
            setComposerData(deleteColumn(id, composerData))
        }
    };

    return (
        <div className={className}>
            <div {...provided.dragHandleProps} className="handle-drag">
                <Svg
                    color={colorDark}
                    height={20}
                    width={20}
                    image={Drag}
                    hoverColor={colorDarkLighten}
                    className={`${type}-svg`}
                />
            </div>
            <div className="delete-row" onClick={() => deleteData()}>
                <Svg color={colorDark} height={20} width={20} image={Cross} hoverColor={colorDarkLighten}/>
            </div>
        </div>
    )
};

export default DragDropControls;
