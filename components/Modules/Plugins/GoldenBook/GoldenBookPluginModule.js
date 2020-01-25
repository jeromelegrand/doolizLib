import React, {useState} from 'react';
import '../../Modules.scss';
import './GoldenBookPluginModule.scss';
import Svg from '../../../Svg/Svg';
import {Check, Quotes} from '../../../Svg/SvgImages';
import {colorBlue} from '../../../../../../css/colors.scss';
import {formatDate} from '../../../../services/DateTime/DateTime';

const GoldenBookPluginModule = ({id}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [notes, setNotes] = useState({});

    const publishNote = e => {
        e.preventDefault();

        if (name === '' || text === '') {
            return;
        }

        const newNote = {name, email, text, date: formatDate(new Date())};
        setNotes({...notes, [Object.keys(notes).length]: newNote});

        setName('');
        setEmail('');
        setText('');
    };

    const renderNotes = () => {
        const notesContent = [];
        for (const [key, note] of Object.entries(notes)) {
            notesContent.push(
                <div key={key} className="note">
                    <div className="text">
                        <Svg image={Quotes} color={colorBlue} width={36} height={36} hoverColor={colorBlue}/>
                        <p>{note.text}</p>
                    </div>
                    <div className="signature">
                        <p className="bold">{note.name}</p>
                        <p>, le {note.date}</p>
                    </div>
                </div>
            );
        }
        return notesContent;
    };

    return (
        <div id={id} className="col-module golden-book-container">
            <div className="golden-book-form">
                <form>
                    <div className="labelled-form-group">
                        <label htmlFor="nameInput" className="form-label">Nom</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            id="nameInput"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            id="emailInput"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="textInput" className="form-label">Votre mot</label>
                        <textarea
                            name="text"
                            className="textarea-input"
                            id="textInput"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </div>
                </form>
                <div className="btn-container">
                    <div className="default-btn" onClick={e => publishNote(e)}>
                        <Svg color={'white'} height={20} width={20} image={Check}
                             hoverColor={'white'}/>
                        <p>Publier mon mot</p>
                    </div>
                </div>
            </div>
            <div className="golden-book-items">
                {renderNotes()}
            </div>
        </div>
    )
};

export default GoldenBookPluginModule;
