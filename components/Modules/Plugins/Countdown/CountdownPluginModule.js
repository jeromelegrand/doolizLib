import React, {useState, useEffect} from 'react';
import './CountdownPluginModule.scss';
import '../../Modules.scss';

const CountdownPluginModule = ({id}) => {

    const calculateTimeLeft = () => {
        const endDate = new Date("2021-01-01");
        const difference = +endDate - +new Date();
        let timeLeft = {};

        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const years = Math.round(days / 365) - 1;
        days = days - (365 * years);

        if (difference > 0) {
            timeLeft = {
                ans: years,
                jours: days,
                heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                secondes: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const renderTimeLeft = () => {
        const timer = [];
        Object.keys(timeLeft).map(interval => {
            if (timeLeft[interval]) {
                timer.push(
                    <div className="countdown-element" key={interval}>
                        <p key={interval} className="countdown-time">{timeLeft[interval]}</p>
                        <p>{interval}</p>
                    </div>
                );
            }
        });
        return timer;
    };

    return (
        <div id={id} className="col-module module-container">
                {renderTimeLeft()}
        </div>
    )
};

export default CountdownPluginModule;
