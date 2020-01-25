import React, {useState, useEffect} from 'react';
import './ComposerNavigation.scss';
import {Editor, EditorState, Modifier} from 'draft-js';
import Svg from '../../Svg/Svg';
import {Down, Earth, Edit, Up} from '../../Svg/SvgImages';

const ComposerNavigation = ({type, params}) => {

    const [displayTitle, setDisplayTitle] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [selectedOption, setSelectedOption] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (type === 'mail' || type === 'document') {
            setDisplayTitle(true);
        } else {
            setDisplayTitle(false);
        }
    }, []);

    useEffect(() => {
        if (!selectedOption) {
            setSelectedOption({
                key: params.event.langDefaut,
                value: params.event.langUsed[params.event.langDefaut]
            });
            replaceTitle(params.event.titre[params.event.langDefaut]);
        } else {
            replaceTitle(params.event.titre[selectedOption.key]);
        }
    }, [selectedOption]);

    const handleChange = e => {
        replaceTitle(e.getCurrentContent().getPlainText());
    };

    const replaceTitle = title => {
        const currentContent = editorState.getCurrentContent();
        const currentSelection = editorState.getSelection().merge({
            anchorKey: currentContent.getFirstBlock().getKey(),
            anchorOffset: 0,
            focusOffset: currentContent.getLastBlock().getText().length,
            focusKey: currentContent.getLastBlock().getKey(),
        });
        let newContent = '';

        if (title !== editorState.getCurrentContent().getPlainText()) {
            newContent = Modifier.replaceText(currentContent, currentSelection, title);
        } else {
            newContent = Modifier.replaceText(currentContent, currentSelection, editorState.getCurrentContent().getPlainText());
        }

        let newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        newEditorState = EditorState.moveFocusToEnd(newEditorState);
        setEditorState(newEditorState);
    };

    const renderLanguages = () => {
        const languagesContent = [];
        for (const [key, language] of Object.entries(params.event.langUsed)) {
            if (selectedOption && language !== selectedOption.value) {
                languagesContent.push(
                    <li
                        key={key}
                        onClick={() => setSelectedOption({
                            key: key,
                            value: language
                        })}
                        className="language"
                    >
                        {language}
                    </li>
                );
            }
        }
        return languagesContent;
    };

    return (
        <nav className="composer-navigation">
            {displayTitle &&
            <React.Fragment>
                <div className="composer-title">
                    <Svg
                        color={'white'}
                        height={24}
                        width={24}
                        image={Edit}
                        hoverColor={'white'}
                        className="edit-title-svg"
                    />
                    <div className="title-input">
                        <Editor
                            className="title-input"
                            editorState={editorState}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </div>

                <div className="composer-languages" onClick={() => setOpen(!open)}>
                    <div className="selected-language">
                        <div className="title">
                            <Svg
                                color={'white'}
                                height={20}
                                width={20}
                                image={Earth}
                                hoverColor={'white'}
                                className="earth"
                            />
                            <p className="bold">{selectedOption && selectedOption.value}</p>
                        </div>
                        <Svg
                            color={'white'}
                            height={20}
                            width={20}
                            image={open ? Up : Down}
                            hoverColor={'white'}
                        />
                    </div>
                    <ul className={`${open ? 'languages-list' : 'd-none'}`}>
                        {renderLanguages()}
                    </ul>
                </div>
            </React.Fragment>
            }
        </nav>
    )
};

export default ComposerNavigation;