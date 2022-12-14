import {useState} from "react";
import {Rating} from 'react-simple-star-rating'

export default function StarRating () {
    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
        setRating(rate)
    }

    return (
        <div>
            <Rating onClick={handleRating}
                    ratingValue={rating}
                    size={30}
                    fillColor='black'/>
        </div>
    )
}