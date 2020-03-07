import React, { Component } from 'react';
import Data from '../data/db.json';
import '../pages/home.css';

let indisponivel = "";
class Ecommerce extends Component {
    constructor() {
        super();
        this.state = {
            itens: [],
            search: ''
        }
    }
    retImageOrNotFound(item) {
        if (item != null && item != "") item = <img src={item} alt="imagem do produto"></img>
        return item;
    }
    //Atualizando o meu estado a cada letra digitada
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    render() {
        //criando o filtro
        var DataFiltra = Data.products.filter(
            (result) => {
                return result.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <h2>O melhor E-commerce para você</h2>
                <input type="text" id="txtBusca" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Pesquisar produtos..." />
                <div className="container">
                    {/* Mapeando o meu array de products */}
                    {DataFiltra.map((item, index) => {
                        return (
                            <div className="container-produtos" >
                                <div className="image">
                                    {this.retImageOrNotFound(item.image)}
                                </div>
                                <div className="container-informacoes">
                                    <div className="informacoes">
                                        <h3>{item.name}</h3>
                                        {/* <p>{item.style}</p>
                                        <p>{item.code_color}</p>
                                        <p>{item.color_slug}</p> */}
                                        <p>Cor {item.color}</p>
                                        <p>{item.on_sale}</p>
                                        <p>Preço regular {item.regular_price}</p>
                                        <p>Preço atual {item.actual_price}</p>
                                        {item.discount_percentage != "" ? <p>Desconto de {item.discount_percentage}</p> : ""}
                                        <p>ou {item.installments}</p>
                                        <p>Tamanho
                                         <select> {item.sizes.map((size, index) => {
                                            return (
                                                <option disabled={size.available == true ? false : true} style={{ fontSize: '1em', marginLeft: '2px', color: (size.available == true ? '#4346FF' : '#839693') }} className="size">{size.size}</option>
                                            )
                                        })}</select></p>
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
