import React, {useState, useContext, useEffect} from 'react';
import Svg from '../../../../../Svg/Svg';
import {colorDark, colorDarkLighten} from '../../../../../../../../css/colors.scss';
import './Background.scss';
import {Down, BackGround, Up, Plus} from '../../../../../Svg/SvgImages';
import {ChromePicker} from 'react-color';
import {DocumentParametersContext} from '../DocumentParametersContext';
import {ComposerContext} from '../../../../../Composer/ComposerContext';

const Background = () => {

    const {paletteColors, setPaletteColors} = useContext(DocumentParametersContext);
    const {style, setStyle} = useContext(ComposerContext);

    const [backgroundColor, setBackgroundColor] = useState('white');
    const [open, setOpen] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [clickCoord, setClickCoord] = useState({x: 0, y: 0});
    const [colorToRemove, setColorToRemove] = useState(null);

    useEffect(() => {
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            if (e.target.attributes.color) {
                setColorToRemove(e.target.attributes.color.value);
                const clickX = e.clientX;
                const clickY = e.clientY;
                setShowContextMenu(true);
                setClickCoord({x: clickX, y: clickY});
            }
        });

        document.addEventListener('click', e => {
            e.preventDefault();
            setColorToRemove(null);
            setShowContextMenu(false);
            setClickCoord({x: 0, y: 0});

        });
    }, []);

    useEffect(() => {
        if (backgroundColor !== style.backgroundColor) {
            setStyle({...style, backgroundColor})
        }
    }, [backgroundColor]);

    const renderColors = () => {
        const colorsContent = [];
        for (const [key, color] of Object.entries(paletteColors)) {
            colorsContent.push(
                <div
                    className="color"
                    onClick={(e) => e.type === 'click' && setBackgroundColor(color)}
                    style={{backgroundColor: color}}
                    color={color}
                    key={key}
                />
            )
        }
        return colorsContent;
    };

    const contextMenuStyle = {
        'top': `${clickCoord.y - 10}px`,
        'left': `${clickCoord.x + 5}px`
    };

    return (
        <div className="doc-params-item">
            <div className="doc-params-dropdown" onClick={() => setOpen(!open)}>
                <div className="doc-params-title">
                    <div className="title-svg">
                        <Svg
                            color={colorDark}
                            image={BackGround}
                            hoverColor={colorDark}
                            width={18}
                            height={18}
                        />
                    </div>
                    <p className="title">Arrière-plan</p>
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
                    <p className="doc-params-section-title bold">Couleur</p>
                    <div className="doc-params-section-content">
                        <ChromePicker
                            color={backgroundColor}
                            onChangeComplete={color => setBackgroundColor(color.hex)}
                            disableAlpha={true}
                        />
                    </div>
                    <div className="doc-params-section-content colors-section">
                        <div className="add-color">
                            <div className="swatch" style={{backgroundColor}}/>
                            <div
                                className="add-color-btn"
                                onClick={() => setPaletteColors([...paletteColors, backgroundColor])}
                            >
                                <Svg
                                    color={colorDark}
                                    image={Plus}
                                    hoverColor={colorDark}
                                    width={18}
                                    height={18}
                                />
                                <p>Ajouter à la palette</p>
                            </div>
                        </div>
                        <p>Palette</p>
                        <div className="global-colors">
                            {renderColors()}
                            {showContextMenu &&
                            <div
                                className="custom-context"
                                id="text"
                                style={contextMenuStyle}
                                onClick={() => setPaletteColors(paletteColors.filter(item => item !== colorToRemove))}
                            >
                                Supprimer
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
};

export default Background;