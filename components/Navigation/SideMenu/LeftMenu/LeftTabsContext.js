import React, {createContext, useState} from 'react';

export const LeftTabsContext = createContext();

const LeftTabsContextProvider = props => {

    const [leftTabs, setLeftTabs] = useState([
        {
            title: 'Basiques',
            columns: {
                '1': {id: '1', title: 'Texte', module: 'basic-text'},
                '2': {id: '2', title: 'Image', module: 'basic-image'},
                '3': {id: '3', title: 'Séparateur', module: 'basic-separator'},
            },
            columnOrder: ['1', '2', '3']
        },
        {
            title: 'Plugins',
            columns: {
                '4': {id: '4', title: 'Document', module: 'plugin-file'},
                '5': {id: '5', title: 'Compte à rebours', module: 'plugin-countdown'},
                '6': {id: '6', title: 'Bouton de réponse', module: 'plugin-reply'},
                '7': {id: '7', title: 'Co-voiturage', module: 'plugin-carpooling'},
                '8': {id: '8', title: 'Livre d\'or', module: 'plugin-golden-book'},
                '9': {id: '9', title: 'Liste d\'invités', module: 'plugin-guest-list'},
                '10': {id: '10', title: 'Formulaire de contact', module: 'plugin-contact'},
                '11': {id: '11', title: 'Ckeck-in', module: 'plugin-checkin'},
            },
            columnOrder: ['4', '5', '6', '7', '8', '9', '10', '11']
        },
        {
            title: 'Forms',
            columns: {
                '12': {id: '12', title: 'Adresse', module: 'form-address'},
                '13': {id: '13', title: 'Identité', module: 'form-identity'},
                '14': {id: '14', title: 'Document', module: 'form-file'},
                '15': {id: '15', title: 'Note', module: 'form-rating'},
                '16': {id: '16', title: 'Choix', module: 'form-choice'},
                '17': {id: '17', title: 'Texte', module: 'form-text'},
                '18': {id: '18', title: 'Date', module: 'form-date'},
            },
            columnOrder: ['12', '13', '14', '15', '16', '17', '18']
        }
    ]);

    return (
        <LeftTabsContext.Provider value={{leftTabs, setLeftTabs}}>
            {props.children}
        </LeftTabsContext.Provider>
    )
};

export default LeftTabsContextProvider;