import React, {useState} from 'react';
import '../../Modules.scss';

const LongTextFormModule = ({id}) => {

    const [text, setText] = useState('');

    return (
        <div id={id} className="col-module module-container">
            <div>
                <form>
                    <div className="labelled-form-group">
                        <label htmlFor="textInput" className="form-label">Votre texte</label>
                        <textarea
                            name="text"
                            className="textarea-input"
                            id="textInput"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default LongTextFormModule;
