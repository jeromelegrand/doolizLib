import React, {useState} from 'react';
import '../../Modules.scss';
import Svg from '../../../Svg/Svg';
import {Check} from '../../../Svg/SvgImages';

const ContactPluginModule = ({id}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div id={id} className="col-module module-container">
            <div>
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
                        <label htmlFor="textInput" className="form-label">Votre message</label>
                        <textarea
                            name="text"
                            className="textarea-input"
                            id="textInput"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                </form>
                <div className="btn-container">
                    <div className="default-btn">
                        <Svg color={'white'} height={20} width={20} image={Check}
                             hoverColor={'white'}/>
                        <p>Envoyer</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContactPluginModule;
