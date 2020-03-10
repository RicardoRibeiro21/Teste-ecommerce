import React, { Component } from 'react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import indisponivel from '../../assets/img/indisponivel.jpg';


var car = []
class Carrinho extends Component {
    constructor() {
        super();
        this.state = {
            itens: {}
        }
    }

    componentDidMount() {
        //Pegando os itens armazenados no carrinho
        this.getCar();
    }
    getCar() {
        this.state.itens = JSON.parse(localStorage.getItem("Itens"));
        car = this.state.itens;
        return car.map((item) => {
            return <p>{item.produto.name}</p>
        })
    }

    //Verifica se a imagem retorna nula e retorna uma img de feedback
    retImageOrNotFound(item) {
        if (item !== null && item !== "") item = <img src={item} alt="imagem do produto"></img>
        else item = <img src={indisponivel}></img>
        return item;
    }

    render() {
        return (
            <div style={{ height: '449px', width: '444px' }} >
                <h2>O melhor E-commerce para você</h2>
                {
                    this.getCar()
                }
                <p id="teste" style={{ height: '449px', width: '444px', backgroundColor: 'red' }}></p>
                <p>sadas</p>
            </div>
        )
    }
}

export default Carrinho;