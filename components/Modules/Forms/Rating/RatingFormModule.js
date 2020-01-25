import React, {useState} from 'react';
import '../../Modules.scss';
import './RatingFormModule.scss';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css'

const RatingFormModule = ({id}) => {

    const [rating, setRating] = useState(0);

    return (
        <div id={id} className="col-module module-container">
            <div className="star-rating-container">
                <Rater total={5} rating={rating} onRate={e => setRating(e.rating)}/>
            </div>
        </div>
    )
};

export default RatingFormModule;
