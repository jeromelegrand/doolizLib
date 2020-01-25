import React, {useState} from 'react';
import Svg from '../../../../../Svg/Svg';
import {colorDark, colorDarkLighten} from '../../../../../../../../css/colors.scss';
import {Down, Ruler, Up} from '../../../../../Svg/SvgImages';
import PageFormat from './PageFormat/PageFormat';
import PagePadding from './PagePadding/PagePadding';

const Format = ({type}) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="doc-params-item">
            <div className="doc-params-dropdown" onClick={() => setOpen(!open)}>
                <div className="doc-params-title">
                    <div className="title-svg">
                        <Svg
                            color={colorDark}
                            image={Ruler}
                            hoverColor={colorDark}
                            width={18}
                            height={18}
                        />
                    </div>
                    <p className="title">Format</p>
                </div>
                <Svg
                    color={colorDark}
                    image={open ? Up : Down}
                    hoverColor={colorDarkLighten}
                    width={18}
                    height={18}
                />
            </div>
            {open &&
            <div className="doc-params-item-content">
                {type === "document" &&
                <PageFormat/>
                }
                <PagePadding type={type}/>
            </div>
            }
        </div>
    )
};

export default Format;