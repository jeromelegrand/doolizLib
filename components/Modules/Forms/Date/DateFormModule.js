import React, {useState} from 'react';
import './DateFormModule.scss';
import '../../Modules.scss';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr'
import {colorBlue, colorGreyDarken,} from '../../../../../../css/colors.scss';

const DateFormModule = ({id}) => {

    const [date, setDate] = useState(null);

    const modifiers = {
        saturdays: {daysOfWeek: [0]},
        sundays: {daysOfWeek: [6]},
        today: new Date(),
        selectedDate: date,
    };

    const modifiersStyles = {
        saturdays: {
            color: colorGreyDarken,
        },
        sundays: {
            color: colorGreyDarken,
        },
        today: {
            color: colorBlue,
        },
        selectedDate: {
            color: 'white',
            backgroundColor: colorBlue,
        },
    };

    return (
        <div id={id} className="col-module module-container">
            <DayPicker
                onDayClick={e => setDate(e)}
                selectedDays={date}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                firstDayOfWeek={1}
                localeUtils={MomentLocaleUtils}
                locale="fr"
            />
        </div>
    )
};

export default DateFormModule;
