import React, {useState} from 'react';
import '../../Modules.scss';

const IdentityFormModule = ({id}) => {

    const [civility, setCivility] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <div id={id} className="col-module module-container">
            <form>
                <div className="labelled-form-group">
                    <p className="form-label">Civilité</p>
                    <div className="radio-inputs-group">
                        <div className="radio-group">
                            <input
                                type="radio"
                                name="civility"
                                className="form-check-input"
                                id="mCivilityInput"
                                value="m"
                                onChange={e => setCivility(e.target.value)}
                                checked={civility === 'm'}
                            />
                            <label htmlFor="mCivilityInput">Mr</label>
                        </div>
                        <div className="radio-group">
                            <input
                                type="radio"
                                name="civility"
                                className="form-check-input"
                                id="fCivilityInput"
                                value="f"
                                onChange={e => setCivility(e.target.value)}
                                checked={civility === 'f'}
                            />
                            <label htmlFor="fCivilityInput">Mme</label>
                        </div>
                    </div>
                </div>
                <div className="labelled-form-group">
                    <label htmlFor="lastNameInput" className="form-label">Nom</label>
                    <input
                        type="text"
                        name="lastName"
                        className="form-input"
                        id="lastNameInput"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="labelled-form-group">
                    <label htmlFor="firstNameInput" className="form-label">Prénom</label>
                    <input
                        type="text"
                        name="firstName"
                        className="form-input"
                        id="firstNameInput"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
};

export default IdentityFormModule;
