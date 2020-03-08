import React, { Component } from 'react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import indisponivel from '../../assets/img/indisponivel.jpg';

class Carrinho extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    //Verifica se a imagem retorna nula e retorna uma img de feedback
    retImageOrNotFound(item) {
        if (item !== null && item !== "") item = <img src={item} alt="imagem do produto"></img>
        else item = <img src={indisponivel}></img>
        return item;
    }

    render() {
        return (
            <div>
                <h2>O melhor E-commerce para você</h2>
            </div>
        )
    }
}

export default Carrinho;