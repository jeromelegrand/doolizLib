import React from 'react';
import '../../Modules.scss';
import {QrCodeImage} from '../../../Svg/SvgImages';
import {colorDark} from '../../../../../../css/colors.scss';
import Svg from '../../../Svg/Svg';

const CheckinPluginModule = ({id}) => {

    return (
        <div id={id} className="col-module module-container">
            <Svg image={QrCodeImage} color={colorDark} width={200} height={200} hoverColor={colorDark}/>
        </div>
    )
};

export default CheckinPluginModule;
