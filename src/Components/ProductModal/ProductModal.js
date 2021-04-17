import React, { useState } from 'react';
import './ProductModal.css';
import close from '../../images/close.png';
import {Form} from 'react-bootstrap';

export function ProductModal(props) {
    const divStyle = { 
        display: props.displayModal ? 'block' : 'none'
    };
    function closeModal(e) {
        e.stopPropagation()
        setCategory("")
        setName("")
        setPrice()
        setTopProducts(false)
        setImage_url()  
        props.closeModal()
    }

    const [category,setCategory]=useState("accessories")
    const [name,setName]=useState("")
    const [price,setPrice]=useState()
    const [topProducts,setTopProducts]=useState(false)
    const [image_url,setImage_url]=useState("")

    const onclicksubmit = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            let additionalProducts = localStorage.getItem('productList');
            if(!additionalProducts) additionalProducts = []
            else additionalProducts = JSON.parse(additionalProducts)
            additionalProducts.push({category, name, price,topProduct:topProducts,is_discounted: "FALSE", image_url:`data:image/png;base64,${base64String}`})
            console.log(additionalProducts)
            localStorage.setItem('productList',JSON.stringify(additionalProducts))
            props.appendData({category, name, price,topProduct:topProducts,is_discounted: "FALSE", image_url:`data:image/png;base64,${base64String}`})
        }
        reader.readAsDataURL(image_url);
        closeModal(e);
    }

    return (
    <div className="modal-background" style={divStyle}>
        <div className="modal-card" style={divStyle}>
            <div className="modal-content" onClick={ e => e.stopPropagation() } >
                <span className="close" onClick={closeModal}><img src={close} alt="close" /></span>
                <span className="form-heading">Add Product</span>
                <div className="modal-form">
                    <Form style={{textAlign:'left',fontSize:'15px', borderBottom:'1px solid lightGrey'}}>
                        <Form.Group className="margin-bottom-1x" controlId="exampleForm.ControlSelect1">
                            <Form.Label >Category</Form.Label>
                            <Form.Control 
                                name="category" 
                                defaultValue={category} 
                                onChange={(e)=>setCategory(e.target.value)} as="select"
                            >
                                <option value="accessories">Accessories</option>
                                <option value="kids">Kids</option>
                                <option value="shoes">Shoes</option>
                                <option value="clothing">Clothing</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="margin-bottom-1x" controlId="exampleForm.ControlInput1">
                            <Form.Label >Product Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Product Title" 
                                name="name" 
                                value={name} 
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="margin-bottom-1x" controlId="exampleForm.ControlInput1">
                            <Form.Label >Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="price" 
                                placeholder="Enter Product Price" 
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="margin-bottom-1x">
                            <Form.Check
                                type="checkbox"
                                className="my-1 mr-sm-2"
                                id="customControlInline"
                                label="Top Products"
                                custom
                                name="topProducts"
                                onChange={(e)=>{setTopProducts(e.target.checked)}}
                            />
                        </Form.Group>

                        <Form.Group className="margin-bottom-1x">
                            <Form.Label>Upload Product Image</Form.Label>
                                <span style={{display:'block'}}>
                                    <input 
                                        type="file" 
                                        id="fileUpload" 
                                        name="image_url" 
                                        onChange={(e)=>setImage_url(e.target.files[0])}
                                    />
                                </span>
                        </Form.Group>
                    </Form>
                </div>
                <div className="modal-footer-div">
                    <div className="modal-footer-button-div">
                        <span><button className="modal-secondary-button" onClick={closeModal}>CLOSE</button></span>
                        <span><button className="modal-primary-button" onClick={onclicksubmit}>CREATE</button></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}