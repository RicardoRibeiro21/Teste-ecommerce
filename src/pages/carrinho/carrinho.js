import React, { Component } from 'react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import indisponivel from '../../assets/img/indisponivel.jpg';
import Data from '../../data/db.json'

class Carrinho extends Component {
    constructor() {
        super();
        this.state = {
            itens: []
        }
    }

    componentWillMount() {
        //Pegando os itens armazenados no carrinho        
        this.state.itens = JSON.parse(localStorage.getItem("Itens"))
    }

    //Retorna o só o preco ou preco com promoção
    retPrecoDisponivel(onSale, preco, precoPromocao) {
        if (onSale === true) {
            return (
                <div>
                    <strike>De {preco}</strike>
                    <p >Por {precoPromocao} </p>
                </div>
            )
        } else return <p >Por {preco}</p>
    }

    getCar() {
        this.state.itens = JSON.parse(localStorage.getItem("Itens"));
        return this.state.itens.map((item) => {
            return (
                <div >
                    <div className="image">
                        {this.retImageOrNotFound(item.produto.image)}
                    </div>
                    <div >
                        <div>
                            <h3>{item.produto.name}</h3>
                            <p >{item.produto.color}</p>
                            <div>
                                {this.retPrecoDisponivel(item.produto.on_sale, item.produto.regular_price, item.produto.actual_price, item.produto.discount_percentage)}
                                <p>ou {item.produto.installments}</p>
                                <p>Tamanho {item.tamanho}</p>
                            </div>
                        </div>
                    </div>
                    <p>{item.produto.name}</p>
                </div>
            )
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
            </div>
        )
    }
}

export default Carrinho;