import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ecommerce from './pages/home/home';
import Loading from 'react-loading';

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      isSplash: false
    }
  }
  //Setando intervalo para SplashScreen
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.setState({ isSplash: true }),
      1500
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'rgba(235, 32, 73, 0.747)',
      position: 'fixed'
    };

    //Verificando o state e renderizando condicionalmente
    if (this.state.isSplash == false) {
      return <div style={style}>
        <h2 style={{ color: 'white', fontSize: '2.5em' }}>Carregando</h2>
        <Loading color="white" type="spin" />
      </div>
    } else return this.props.history.push("/home")


  }
}

export default SplashScreen;