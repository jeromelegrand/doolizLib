import React, {useState, useEffect, useContext} from 'react';
import FontPicker from 'font-picker-react';
import Svg from '../../../../../../Svg/Svg';
import {colorDark, colorDarkLighten} from '../../../../../../../../../css/colors.scss';
import {Down, Font, Up} from '../../../../../../Svg/SvgImages';
import './FontFamily.scss';
import {ComposerContext} from '../../../../../../Composer/ComposerContext';

const FontFamily = () => {

    const {style, setStyle} = useContext(ComposerContext);

    const [fontFamily, setFontFamily] = useState('Raleway');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (fontFamily !== style.fontFamily) {
            setStyle({...style, fontFamily})
        }
    }, [fontFamily]);

    return (
        <div className="doc-params-item">
            <div className="doc-params-dropdown" onClick={() => setOpen(!open)}>
                <div className="doc-params-title">
                    <div className="title-svg">
                        <Svg
                            color={colorDark}
                            image={Font}
                            hoverColor={colorDark}
                            width={18}
                            height={18}
                        />
                    </div>
                    <p className="title">Texte</p>
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
                <div className="doc-params-section">
                    <p className="doc-params-section-title bold">Police</p>
                    <div className="doc-params-section-content-column">
                        <FontPicker
                            apiKey={process.env.GOOGLE_FONTS_API_KEY}
                            activeFontFamily={fontFamily}
                            onChange={nextFont => setFontFamily(nextFont.family)}
                        />
                    </div>
                </div>
            </div>
            }
        </div>
    )
};

export default FontFamily;