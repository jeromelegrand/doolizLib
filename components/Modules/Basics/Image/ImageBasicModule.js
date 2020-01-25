import React from 'react';
import '../../Modules.scss';
import Svg from '../../../Svg/Svg';
import {colorBlue} from '../../../../../../css/colors.scss';
import {Plus} from '../../../Svg/SvgImages';

const ImageBasicModule = ({id}) => {

    return (
        <div id={id} className="col-module module-container">
            <div className="upload-module">
                <div className="upload-btn">
                    <Svg color={colorBlue} height={24} width={24} image={Plus}
                         hoverColor={colorBlue}/>
                    <p className="base-font">Télécharger une image</p>
                </div>
            </div>
        </div>
    )
};

export default ImageBasicModule;
