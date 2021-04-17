import {React,useState,useEffect} from 'react';
import {ProductCard} from '../Card/Card';
import './CardGroup.css';

import { Dropdown, DropdownButton } from "react-bootstrap";
import ReactPaginate from 'react-paginate';


export function CardGroup(props) {

    // const [width, setWidth] = useState(window.innerWidth);
    const [dropdownValue, setDropdownValue] = useState("Default Sorting")
    const [dataToDisplay,setDataToDisplay] = useState([...props.cardData])
    const [currentPage, setCurrentPage] = useState(0)

    const perPage = 9
    let offset = currentPage*perPage
    let currentPageData = dataToDisplay.slice(offset,offset+perPage)
    let pageCount = Math.ceil(dataToDisplay.length / perPage);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
        offset = selectedPage*perPage;
        currentPageData = dataToDisplay.slice(offset,offset+perPage);
    }

    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowSizeChange);
    //     return () => {
    //       window.removeEventListener('resize', handleWindowSizeChange)
    //     }
    //   }, [])
      
    //   const handleWindowSizeChange = () => {
    //     setWidth(window.innerWidth)
    //   };
    
    useEffect(()=>{
        setDataToDisplay(props.cardData)
        setCurrentPage(0);
    },[props.cardData])

    const sortValues = (value) => {
        setDropdownValue(value)
        if(value === "Price High to Low"){
            let data=[...dataToDisplay]
            data.sort(function(a,b){
                return b.price - a.price;
                })
            setDataToDisplay(data)
        }else if(value==="Price Low to High"){
            let data=[...dataToDisplay]
            data.sort(function(a,b){
                return a.price - b.price;
                })
            setDataToDisplay(data)
        }else{
            setDataToDisplay([...props.cardData])
        }
    }

    const handleCategoryDropdown = (value) =>{
        props.setCategoryDropdownValue(value)
        props.filterFunction(value)
    }
    
    
    return (
        <>
            <div className="filter">
                {props.width>600 ? <span style={{fontStyle:'italic'}}>Page {currentPage+1} of {pageCount}</span> : 
                    <span>
                        <DropdownButton id="dropdown-item-button" title={props.categoryDropdownValue} bsPrefix="customized-dropdown">
                            <Dropdown.Item as="button" value="All Categories" onClick={(e)=> handleCategoryDropdown(e.target.value)}>All Categories</Dropdown.Item>
                            <Dropdown.Item as="button" value="accessories" onClick={(e)=> handleCategoryDropdown(e.target.value)}>Accessories</Dropdown.Item>
                            <Dropdown.Item as="button" value="kids" onClick={(e)=> handleCategoryDropdown(e.target.value)}>kids</Dropdown.Item>
                            <Dropdown.Item as="button" value="shoes" onClick={(e)=> handleCategoryDropdown(e.target.value)}>shoes</Dropdown.Item>
                            <Dropdown.Item as="button" value="clothing" onClick={(e)=> handleCategoryDropdown(e.target.value)}>clothing</Dropdown.Item>
                        </DropdownButton>
                    </span>
                }
                <DropdownButton id="dropdown-item-button" title={dropdownValue} bsPrefix="customized-dropdown">
                    <Dropdown.Item as="button" value="Default Sorting" onClick={(e)=>sortValues(e.target.value)}>Default Sorting</Dropdown.Item>
                    <Dropdown.Item as="button" value="Price High to Low" onClick={(e)=>sortValues(e.target.value)}>Price High to Low</Dropdown.Item>
                    <Dropdown.Item as="button" value="Price Low to High" onClick={(e)=>sortValues(e.target.value)}>Price Low to High</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className='product-grid'>
            {props.width<600 ? dataToDisplay.map((product)=>{
                return(
                <ProductCard 
                    name={product.name}
                    price={product.price}
                    image={product.image_url}
                    isDiscounted={product.is_discounted}
                    discountedPrice = {product.discounted_price}
                    key={product.name}
                />
                )
            }):
                currentPageData.map((product)=>{
                    return(
                    <ProductCard 
                        name={product.name}
                        price={product.price}
                        image={product.image_url}
                        isDiscounted={product.is_discounted}
                        discountedPrice = {product.discounted_price}
                        key={product.name}
                    />
                    )
                })
            }
            </div>
            {props.width>600 &&
                <div className="pagination-div">
                    <ReactPaginate
                        key={dataToDisplay.length}
                        previousLabel={<span>&#60;</span>}
                        nextLabel={<span>&#62;</span>}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            }
            
        </>
    )
}
