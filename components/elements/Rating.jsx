import React from 'react';
import StarRatings from 'react-star-ratings';

export default function Rating ({rates}){
    return (
        <span className="ps-rating">
            <StarRatings
            rating={rates}
            starRatedColor="orange"
            numberOfStars={5}
            name='rating'
            starDimension='20px'
            starSpacing='3px'
            />
        </span>
    )
}