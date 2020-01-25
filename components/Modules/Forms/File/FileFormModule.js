import React from 'react';
import './FileFormModule.scss';
import Svg from '../../../Svg/Svg';
import {colorBlue} from '../../../../../../css/colors.scss';
import {Plus} from '../../../Svg/SvgImages';

const FileFormModule = ({id}) => {
    return (
        <div id={id} className="col-module module-container">
            <form>
                <div className="input-form-group">
                    <input
                        type="file"
                        name="file"
                        className="form-input file-input"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="form-label file-label">
                        <Svg color={colorBlue} height={24} width={24} image={Plus} hoverColor={colorBlue}/>
                        <p>Télécharger un fichier</p>
                    </label>
                </div>
            </form>
        </div>
    )
};

export default FileFormModule;
