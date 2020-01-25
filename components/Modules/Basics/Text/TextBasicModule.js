import React, {useState} from 'react';
import {Editor, EditorState} from 'draft-js';
import './TextBasicModule.scss';

const TextBasicModule = ({id}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    return (
        <div id={`textarea-${id}`} className="col-module text-module">
            <Editor editorState={editorState} onChange={setEditorState}/>
        </div>
    )
};

export default TextBasicModule;
