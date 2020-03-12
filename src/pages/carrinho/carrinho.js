import React, { Component } from 'react';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import indisponivel from '../../assets/img/indisponivel.jpg';
import '../carrinho/carrinho.css'

let preco = 0;
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
        console.log(this.state.itens);
    }

    //Retorna o só o preco ou preco com promoção
    retPrecoDisponivel(onSale, preco, precoPromocao) {
        if (onSale === true) {
            return (
                <div>
                    <strike>De {preco}</strike>
                    <p className="preco">Por {precoPromocao} </p>
                </div>
            )
        } else return <p className="preco">Por {preco}</p>
    }

    getCar() {
        this.state.itens = JSON.parse(localStorage.getItem("Itens"));
        return this.state.itens.map((item) => {
            return (
                <div className="carrinho-itens">
                    <div className="carrinho-itens-image">
                        {this.retImageOrNotFound(item.produto.image)}
                    </div>
                    <div >
                        <div>
                            <h3>{item.produto.name}</h3>
                            <p >{item.produto.color}</p>
                            <div>
                                {this.retPrecoDisponivel(item.produto.on_sale, item.produto.regular_price, item.produto.actual_price, item.produto.discount_percentage)}
                                <p >ou {item.produto.installments}</p>
                                <p>Tamanho {item.tamanho}</p>
                            </div>
                        </div>
                    </div>
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
            <div className="container-carrinho">
                <h2 className="titulo">A melhor loja de roupas e acessórios para você</h2>
                <div>
                    <p className="qtd-carrinho"> Carrinho ({this.state.itens == null ? '0' : this.state.itens.length})</p>
                    {
                        this.getCar()
                    }
                    <button className="button"><a href="/home">Voltar as compras</a></button>
                </div>
            </div>
        )
    }
}

export default Carrinho;