import React, {useState} from 'react';
import '../../Modules.scss';
import Select from 'react-select';
import {colorBlue, colorBlueLighten75, colorBlueLighten50, colorBlueLighten25} from '../../../../../../css/colors.scss';

const ChoiceFormModule = ({id}) => {

    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ];

    const [choice, setChoice] = useState(null);

    return (
        <div id={id} className="col-module module-container">
            <form>
                <div className="labelled-form-group">
                    <label htmlFor="choiceInput" className="form-label">Sélectionnez votre choix</label>
                    <Select
                        id="choiceInput"
                        value={choice}
                        onChange={e => setChoice(e)}
                        placeholder={null}
                        options={options}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 3,
                            colors: {
                                ...theme.colors,
                                primary: colorBlue,
                                primary75: colorBlueLighten75,
                                primary50: colorBlueLighten50,
                                primary25: colorBlueLighten25
                            },
                        })}
                    />
                </div>
            </form>
        </div>
    )
};

export default ChoiceFormModule;
