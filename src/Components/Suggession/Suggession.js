import React,{useEffect, useState} from 'react';
import './Suggession.css';
import star from '../../images/star.png';
let productData = require('../../Data/productList.json')

export function Suggession(props) {
    const [Data,setData] = useState([])


    useEffect(()=>{
        let products = JSON.parse(localStorage.getItem('productList'))
        if(products){
            products = [...productData, ...products]
        }else{
            products = [...productData]
        }
        const data = products.filter(item=>{return item.topProduct===true})
        setData(data)
    },[])

    return (
        <div>
            {Data.map(product=>{
                    return(
                        <div className="suggession-item-group" key={product.name}>
                            <div className="suggession-img-div">
                                <img src={product.image_url} alt="img"/>
                            </div>
                            <div className="suggession-body">
                                <span><b>{product.name}</b></span>
                                <span className="star-img"><img src={star} alt="star"/></span>
                                <span>&#36;{product.price}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
