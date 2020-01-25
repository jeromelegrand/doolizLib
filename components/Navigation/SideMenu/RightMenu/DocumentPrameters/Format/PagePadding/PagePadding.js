import React, {useContext, useEffect, useState} from 'react';
import {ComposerContext} from '../../../../../../Composer/ComposerContext';
import './PagePadding.scss';

const PagePadding = ({type}) => {

    const {style, setStyle} = useContext(ComposerContext);

    const [paddingTop, setPaddingTop] = useState(0);
    const [paddingBottom, setPaddingBottom] = useState(0);
    const [paddingLeft, setPaddingLeft] = useState(0);
    const [paddingRight, setPaddingRight] = useState(0);

    const [unit, setUnit] = useState('px');

    useEffect(() => {
        type === 'document' && setUnit('mm');
    }, [type]);

    useEffect(() => {
        const completePadding = `${paddingTop}${unit} ${paddingRight}${unit} ${paddingBottom}${unit} ${paddingLeft}${unit}`;

        if (completePadding !== style.padding) {
            setStyle({...style, padding: completePadding})
        }
    }, [paddingBottom, paddingTop, paddingLeft, paddingRight]);

    return (
        <div className="doc-params-section">
            <p className="doc-params-section-title bold">Marges</p>
            <div className="doc-params-section-content-column">
                <div className="padding-x">
                    <div className="labelled-form-group">
                        <label htmlFor="paddingLeftInput" className="form-label">Gauche</label>
                        <div className="padding-input">
                            <input
                                type="number"
                                name="number"
                                className="form-input"
                                id="paddingLeftInput"
                                value={paddingLeft}
                                onChange={e => {
                                    e.target.value >= 0 && e.target.value <= 150 && setPaddingLeft(e.target.value)
                                }}
                            />
                            <p>{unit}</p>
                        </div>
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="paddingRightInput" className="form-label">Droite</label>
                        <div className="padding-input">
                            <input
                                type="number"
                                name="number"
                                className="form-input"
                                id="paddingRightInput"
                                value={paddingRight}
                                onChange={e => {
                                    e.target.value >= 0 && e.target.value <= 150 && setPaddingRight(e.target.value)
                                }}
                            />
                            <p>{unit}</p>
                        </div>
                    </div>
                </div>
                <div className="padding-y">
                    <div className="labelled-form-group">
                        <label htmlFor="paddingTopInput" className="form-label">Haut</label>
                        <div className="padding-input">
                            <input
                                type="number"
                                name="number"
                                className="form-input"
                                id="paddingTopInput"
                                value={paddingTop}
                                onChange={e => {
                                    e.target.value >= 0 && e.target.value <= 150 && setPaddingTop(e.target.value)
                                }}
                            />
                            <p>{unit}</p>
                        </div>
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="margiBottompInput" className="form-label">Bas</label>
                        <div className="padding-input">
                            <input
                                type="number"
                                name="number"
                                className="form-input"
                                id="margiBottompInput"
                                value={paddingBottom}
                                onChange={e => {
                                    e.target.value >= 0 && e.target.value <= 150 && setPaddingBottom(e.target.value)
                                }}
                            />
                            <p>{unit}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PagePadding;