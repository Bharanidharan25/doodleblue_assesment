import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardGroup} from './Components/CardGroup/CardGroup';
import {Row,Col} from 'react-bootstrap';
import {ProductModal} from './Components/ProductModal/ProductModal';
import {Categories} from './Components/Categories';
import {RagngeSlider} from './Components/Slider/Slider';
import {Suggession} from './Components/Suggession/Suggession';
// const writeJsonFile = require('write-json-file');

let ProductList = require('./Data/productList.json');


export default class App extends Component {

  state={
    isModalOpen:false,
    allData:[...ProductList],
    dataToDisplay:ProductList,
    prevScrollPos:0,
    visible:true,
    width:window.innerWidth,
    categoryDropdownValue:"All Categories"
  }

  componentDidMount(){
    let additionalProducts = localStorage.getItem('productList')
    if(additionalProducts){
      this.setState({dataToDisplay : [...this.state.dataToDisplay, ...JSON.parse(additionalProducts)], allData: [...this.state.dataToDisplay, ...JSON.parse(additionalProducts)]})
    }
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({width:window.innerWidth})
  };

  handleModal = ()=>{
    this.setState({isModalOpen:!this.state.isModalOpen})
  }

  filterByCategory = (value)=>{
    if(value==="All Categories"){
      this.setState({dataToDisplay:this.state.allData})
    }else{
      let data = this.state.allData.filter(function(item){
        return item.category === value;         
      })
      this.setState({dataToDisplay:data})
    }
  }

  fliterBySlider = (start,end) =>{
    let data = this.state.dataToDisplay.filter(function(item){
      return item.price >= start && item.price <= end
    })
    this.setState({dataToDisplay:data})
  }

  appendData = (data)=>{
    console.log(data);
    this.setState({dataToDisplay:[...this.state.dataToDisplay,data],allData:[...this.state.allData,data]})
  }

  setCategoryDropdownValue = (value) =>{
    this.setState({categoryDropdownValue:value})
  }

  render() {
    return (
      <div className="App">
        <div className='header'>
          <div className="header-div">
            <div className="title">Products</div>
            <div className="button-div"><button className="primary-button" onClick={this.handleModal}>Add products</button></div>
          </div>
        </div>
        <Row style={{marginTop:"50px"}}>
          {this.state.width >600 &&
            <Col sm={3} className="left-div">
              <div className="left-side">
                <span className="left-side-heading">category</span>
                <Categories filterFunction={this.filterByCategory}/>
              </div>
              <div className="left-side">
              <span className="left-side-heading">filter by price</span>
                <RagngeSlider sliderFilter={this.fliterBySlider}/>
              </div>
              <div className="left-side">
                <span className="left-side-heading">top rated products</span>
                <Suggession cardData={this.state.dataToDisplay}/>
              </div>
            </Col>
          }
          <Col sm={9}>
            <CardGroup key={this.state.dataToDisplay.length} cardData={this.state.dataToDisplay} filterFunction={this.filterByCategory} width={this.state.width} setCategoryDropdownValue = {this.setCategoryDropdownValue} categoryDropdownValue={this.state.categoryDropdownValue}/>
          </Col>
        </Row>
        <ProductModal 
          displayModal={this.state.isModalOpen} 
          closeModal={this.handleModal} 
          appendData = {this.appendData}
        />
      </div>
    )
  }
}
