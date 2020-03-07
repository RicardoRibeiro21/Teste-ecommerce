import React, { Component } from 'react';
import Data from '../data/db.json';
import '../pages/home.css';

let indisponivel = "";
class Ecommerce extends Component {
    constructor() {
        super();
        this.state = {
            itens: []
        }
    }
    retImageOrNotFound(item) {
        if (item != null && item != "") item = <img src={item} alt="imagem do produto"></img>        
        return item;
    }
    render() {
        return (
            <div>
                <h2>O melhor E-commerce para você</h2>
                <div className="container">
                    {/* Mapeando o meu array products para exibir os produtos */}
                    {Data.products.map((item, index) => {
                        return (
                            <div className="container-produtos" >
                                <div className="image">
                                    {this.retImageOrNotFound(item.image)}
                                </div>
                                <div className="container-informacoes">
                                    <div className="informacoes">
                                        <h3>{item.name}</h3>
                                        {/* <p>{item.style}</p>
                                {/* <p>{item.code_color}</p>
                                <p>{item.color_slug}</p> */}
                                        <p>Cor {item.color}</p>
                                        <p>{item.on_sale}</p>
                                        <p>Preço regular {item.regular_price}</p>
                                        <p>Preço atual {item.actual_price}</p>
                                        <p>Desconto de {item.discount_percentage}</p>
                                        <p>ou {item.installments}</p>
                                        <p className="tamanhos">Tamanhos {item.sizes.map((size, index) => {
                                            return (
                                                <div>
                                                    <p style={{ fontSize: '1em', marginLeft: '2px', color: (size.available == true ? '#4346FF' : '#839693') }} className="size">{size.size}</p>
                                                </div>
                                            )
                                        })}</p>
                                    </div>
                                    <div className="btn"><button>Adicionar ao Carrinho</button></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Ecommerce;
