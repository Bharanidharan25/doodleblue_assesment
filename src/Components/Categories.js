import React from 'react';
import {ListGroup} from 'react-bootstrap';
import './Categoreis.css';

export function Categories(props) {
    return (
        <div className="categories">
            <ListGroup>
                <ListGroup.Item variant="light" value="All Categories" action defaultChecked onClick={(e)=>props.filterFunction(e.target.value)}><span className='list-text'>All</span></ListGroup.Item>
                <ListGroup.Item variant="light" value="accessories" action onClick={(e)=>props.filterFunction(e.target.value)}><span className='list-text'>Accessories</span></ListGroup.Item>
                <ListGroup.Item variant="light" value="kids" action onClick={(e)=>props.filterFunction(e.target.value)}><span className='list-text'>Kids</span></ListGroup.Item>
                <ListGroup.Item variant="light" value="shoes" action onClick={(e)=>props.filterFunction(e.target.value)}><span className='list-text'>Shoes</span></ListGroup.Item>
                <ListGroup.Item variant="light" value="clothing" action onClick={(e)=>props.filterFunction(e.target.value)}><span className='list-text'>Clothing</span></ListGroup.Item>
            </ListGroup>
        </div>
    )
}
