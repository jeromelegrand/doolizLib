import React, {useState, useEffect} from 'react';
import '../../Modules.scss';
import './CarpoolingPluginModule.scss';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Svg from '../../../Svg/Svg';
import {Check} from '../../../Svg/SvgImages';

const CarpoolingPluginModule = ({id}) => {

    const [carpoolingType, setCarpoolingType] = useState('propose');
    const [departure, setDeparture] = useState('');
    const [seats, setSeats] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [information, setInformation] = useState('');

    const [ads, setAds] = useState({propose: {}, recherche: {}});

    const [selectedTab, setSelectedTab] = useState(0);
    const [tabTitles, setTabTitles] = useState([]);
    const [tabPanels, setTabPanels] = useState([]);

    const renderAds = type => {
        const tabContent = [];
        if (ads[type]) {
            for (const [key, ad] of Object.entries(ads[type])) {
                tabContent.push(
                    <div key={key} className="ad">
                        <div className="title">
                            <p className="bold">{ad.name} </p>
                            <p> {type} {ad.seats} place(s) au départ de</p>
                            <p className="bold"> {ad.departure}</p>
                        </div>
                        <div className="contact">
                            <p className="bold">Pour contacter {ad.name} :</p>
                            {ad.email && <p>Email : {ad.email}</p>}
                            {ad.phone && <p>Téléphone : {ad.phone}</p>}
                        </div>
                        {ad.information &&
                        <div className="info">
                            <p className="bold">Informations complémentaires : </p>
                            <p>{ad.information}</p>
                        </div>
                        }
                    </div>
                )
            }
        }
        return tabContent;
    };

    useEffect(() => {
        const tempTabTitles = [];
        const tempTabPanels = [];
        const tabList = [
            {title: 'Propositions', content: renderAds('propose')},
            {title: 'Recherches', content: renderAds('recherche')},
        ];

        for (const [index, tabs] of Object.entries(tabList)) {
            tempTabTitles.push(<Tab key={index}>{tabs.title}</Tab>);
            tempTabPanels.push(
                <TabPanel key={index} id={tabs.title}>
                    {tabs.content}
                </TabPanel>,
            );

            setTabTitles(tempTabTitles);
            setTabPanels(tempTabPanels);
        }
    }, [ads]);

    const publishAd = e => {
        e.preventDefault();

        if (departure === '' || seats === '' || name === '' || (email === '' && phone === '')) {
            return;
        }

        const newAd = {departure, seats, name, email, phone, information};

        if (carpoolingType === 'propose') {
            setAds({...ads, propose: {...ads.propose, [Object.keys(ads.propose).length]: newAd}});
        } else {
            setAds({...ads, recherche: {...ads.recherche, [Object.keys(ads.recherche).length]: newAd}});
        }

        setDeparture('');
        setSeats('');
        setName('');
        setEmail('');
        setPhone('');
        setInformation('');
    };

    return (
        <div id={id} className="col-module carpooling-container">
            <div className="carpooling-form">
                <form>
                    <div className="labelled-form-group">
                        <p className="form-label">Quel co-voitureur êtes-vous ?</p>
                        <div className="radio-inputs-group">
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    name="carpoolingType"
                                    className="form-check-input"
                                    id="carpoolingProposition"
                                    value="propose"
                                    onChange={e => setCarpoolingType(e.target.value)}
                                    checked={carpoolingType === 'propose'}
                                />
                                <label htmlFor="carpoolingProposition">Je propose</label>
                            </div>
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    name="carpoolingType"
                                    className="form-check-input"
                                    id="carpoolingResearch"
                                    value="recherche"
                                    onChange={e => setCarpoolingType(e.target.value)}
                                    checked={carpoolingType === 'recherche'}
                                />
                                <label htmlFor="carpoolingResearch">Je recherche</label>
                            </div>
                        </div>
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="departureInput" className="form-label">Ville de départ</label>
                        <input
                            type="text"
                            name="departure"
                            className="form-input"
                            id="departureInput"
                            value={departure}
                            onChange={e => setDeparture(e.target.value)}
                        />
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="placesNumberInput" className="form-label">Nombre de places</label>
                        <input
                            type="number"
                            name="placesNumber"
                            className="form-input"
                            id="placesNumberInput"
                            value={seats}
                            onChange={e => setSeats(e.target.value)}
                        />
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="nameInput" className="form-label">Prénom</label>
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
                        <label htmlFor="phoneInput" className="form-label">Téléphone</label>
                        <input
                            type="number"
                            name="phone"
                            className="form-input"
                            id="phoneInput"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="labelled-form-group">
                        <label htmlFor="informationInput" className="form-label">Informations complémentaires</label>
                        <textarea
                            name="information"
                            className="textarea-input"
                            id="informationInput"
                            value={information}
                            onChange={e => setInformation(e.target.value)}
                        />
                    </div>
                </form>
                <div className="btn-container">
                    <div className="default-btn" onClick={e => publishAd(e)}>
                        <Svg color={'white'} height={20} width={20} image={Check}
                             hoverColor={'white'}/>
                        <p>Publier mon annonce</p>
                    </div>
                </div>
            </div>
            <div className="carpooling-ads">
                <Tabs selectedIndex={selectedTab} onSelect={setSelectedTab}>
                    <TabList>
                        {tabTitles}
                    </TabList>
                    {tabPanels}
                </Tabs>
            </div>
        </div>
    )
};

export default CarpoolingPluginModule;
