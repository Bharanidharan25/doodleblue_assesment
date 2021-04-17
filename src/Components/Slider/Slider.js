import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Slider.css';

const { Range } = Slider;

export class RagngeSlider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: [20, 40],
      };
    }
  
    onLowerBoundChange = (e) => {
      this.setState({ lowerBound: +e.target.value });
    };
  
    onUpperBoundChange = (e) => {
      this.setState({ upperBound: +e.target.value });
    };
  
    onSliderChange = (value) => {
      this.setState({
        value,
      });
    };
  
    handleApply = () => {
      const { lowerBound, upperBound } = this.state;
      this.setState({ value: [lowerBound, upperBound] });
    };
  
    render() {
      return (
        <div>
          <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
          <div className="slider-body">
            <span>
              <button className="slider-button" onClick={()=>this.props.sliderFilter(this.state.value[0],this.state.value[1])}>Filter</button>
            </span>
            <span className="slider-price-text">
              Price : &#36;{this.state.value[0]} - &#36;{this.state.value[1]}
            </span>
          </div>
        </div>
      );
    }
  }