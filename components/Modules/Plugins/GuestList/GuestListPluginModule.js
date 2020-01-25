import React, {useState, useEffect} from 'react';
import '../../Modules.scss';
import './GuestListPluginModule.scss';

const GuestListPluginModule = ({id}) => {

    const guestList = [
        {firstName: 'Timéo', lastName: 'Leroux'},
        {firstName: 'Jordan', lastName: 'Andre'},
        {firstName: 'Robin', lastName: 'Grondin'},
        {firstName: 'Agathe', lastName: 'Brun'},
        {firstName: 'Lucie', lastName: 'Gay'},
        {firstName: 'Tatiana', lastName: 'Moulin'},
        {firstName: 'Yohan', lastName: 'Bertrand'},
        {firstName: 'Alicia', lastName: 'Deschamps'},
        {firstName: 'Esteban', lastName: 'Carlier'},
        {firstName: 'Mathilde', lastName: 'Daniel'},
        {firstName: 'Diego', lastName: 'Robert'},
        {firstName: 'Davy', lastName: 'Bailly'},
        {firstName: 'Valentin', lastName: 'Huet'},
        {firstName: 'Inès', lastName: 'Roger'},
        {firstName: 'Clotilde', lastName: 'Carre'},
        {firstName: 'Mathis', lastName: 'Gilbert'},
        {firstName: 'Loane', lastName: 'Poulain'},
        {firstName: 'Marion', lastName: 'Dumont'},
        {firstName: 'Alexandra', lastName: 'Rousseau'},
        {firstName: 'Anthony', lastName: 'Jacob'},
        {firstName: 'Corentin', lastName: 'Da silva'},
        {firstName: 'Juliette', lastName: 'Arnaud'},
        {firstName: 'Rémi', lastName: 'Monnier'},
        {firstName: 'Éléna', lastName: 'Thomas'},
        {firstName: 'Simon', lastName: 'Marchal'},
        {firstName: 'Chloé', lastName: 'Fleury'},
        {firstName: 'Maxence', lastName: 'Perrot'},
        {firstName: 'Anaël', lastName: 'Germain'},
        {firstName: 'Jérémy', lastName: 'Nicolas'},
        {firstName: 'Jules', lastName: 'Leclercq'},
        {firstName: 'Lana', lastName: 'Antoine'},
        {firstName: 'Dimitri', lastName: 'Chauvin'},
        {firstName: 'Quentin', lastName: 'Menard'},
        {firstName: 'Jérémy', lastName: 'Lambert'},
        {firstName: 'Léonie', lastName: 'Berger'},
        {firstName: 'Antoine', lastName: 'Lecomte'},
        {firstName: 'Alicia', lastName: 'Martinez'},
        {firstName: 'Léo', lastName: 'Chevallier'},
        {firstName: 'Maéva', lastName: 'Carre'},
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(guestList);

    useEffect(() => {
        let results = guestList;
        if (searchTerm !== '') {
            results = guestList.filter(guest => {
                return guest.firstName.toLowerCase().search(searchTerm.toLowerCase()) !== -1
                    || guest.lastName.toLowerCase().search(searchTerm.toLowerCase()) !== -1;
            });
        }
        setSearchResults(results);
    }, [searchTerm]);

    const renderGuestList = () => {
        const guestListContent = [];
        for (const [key, guest] of Object.entries(searchResults)) {
            guestListContent.push(
                <li key={key} className="guest">
                    <p>{guest.firstName} <span className="bold">{(guest.lastName).toUpperCase()}</span></p>
                </li>
            )
        }
        return guestListContent;
    };

    return (
        <div id={id} className="col-module guest-list-container">
            <div className="search-form">
                <form>
                    <div className="labelled-form-group">
                        <label htmlFor="searchInput" className="form-label">Rechercher un invité</label>
                        <input
                            type="text"
                            name="search"
                            className="form-input"
                            id="searchInput"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <ul className="guest-list">
                {renderGuestList()}
            </ul>
        </div>
    )
};

export default GuestListPluginModule;