import React from 'react';
import './Card.css';

export const ProductCard=(props)=>{
    return (
        <div className='ProductCard'>
            {props.isDiscounted==="TRUE" && <div className='sale-bar'>sale!</div>}
                <div className="image-div">
                    <img src={props.image} alt="img"/>
                </div>
            <div className='ProductCard-body'>
                <b>{props.name}</b><br/>
                {
                    props.isDiscounted==="FALSE" ? <span>&#36;{props.price}</span> : <span> <strike>&#36;{props.price}</strike> &#36;{props.discountedPrice}</span>
                }
            </div>
        </div>
    )
}
