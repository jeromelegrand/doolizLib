import React from 'react';
import '../../Modules.scss';
import Svg from '../../../Svg/Svg';
import {Reply} from '../../../Svg/SvgImages';

const ReplyPluginModule = ({id}) => {

    return (
        <div id={id} className="col-module module-container">
            <div className="default-btn">
                <Svg color={'white'} height={20} width={20} image={Reply}
                     hoverColor={'white'}/>
                <p>Bouton de réponse</p>
            </div>
        </div>
    )
};

export default ReplyPluginModule;
