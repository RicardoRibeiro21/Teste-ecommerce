import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ecommerce from './pages/home/home';

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      isSplash: false
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.setState({ isSplash: true }),
      2000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const style = {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100vw',
      background: 'rgba(235, 32, 73, 0.747)',
      position: 'fixed'
    };

    if (this.state.isSplash == false) {
      return <div style={style}></div>

    } else {
      return (
        <div>
          <Ecommerce />
        </div>
      );
    }
  }
}

export default SplashScreen;