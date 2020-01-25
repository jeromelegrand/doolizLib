import React, {useState} from 'react';
import '../../Modules.scss';

const AddressFormModule = ({id}) => {

    const [number, setNumber] = useState('');
    const [street, setStreet] = useState('');
    const [information, setInformation] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');

    return (
        <div id={id} className="col-module module-container">
            <form>
                <div className="labelled-form-group">
                    <label htmlFor="numberInput" className="form-label">Numéro</label>
                    <input
                        type="number"
                        name="number"
                        className="form-input"
                        id="numberInput"
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                    />
                </div>
                <div className="labelled-form-group">
                    <label htmlFor="streetInput" className="form-label">Voie</label>
                    <input
                        type="text"
                        name="street"
                        className="form-input"
                        id="streetInput"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                    />
                </div>
                <div className="labelled-form-group">
                    <label htmlFor="informationInput" className="form-label">Informations complémentaires</label>
                    <input
                        type="text"
                        name="information"
                        className="form-input"
                        id="informationInput"
                        value={information}
                        onChange={e => setInformation(e.target.value)}
                    />
                </div>
                <div className="labelled-form-group">
                    <label htmlFor="zipCodeInput" className="form-label">Code postal</label>
                    <input
                        type="number"
                        name="zipCode"
                        className="form-input"
                        id="zipCodeInput"
                        value={zipCode}
                        onChange={e => setZipCode(e.target.value)}
                    />
                </div>
                <div className="labelled-form-group">
                    <label htmlFor="cityInput" className="form-label">Ville</label>
                    <input
                        type="text"
                        name="city"
                        className="form-input"
                        id="cityInput"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
};

export default AddressFormModule;
