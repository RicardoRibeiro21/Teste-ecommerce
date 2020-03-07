import React, { Component } from 'react';
import Data from '../data/db.json';
import '../pages/home.css';

let carrinho= [];
class Ecommerce extends Component {
    constructor() {
        super();
        this.state = {
            itens: [],
            search: '',    
            carState: []        
        }
    }
    //Funcão que verifica se minha
    retImageOrNotFound(item) {
        if (item != null && item != "") item = <img src={item} alt="imagem do produto"></img>
        return item;
    }
    //Atualizando o meu estado a cada letra digitada
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    retPrecoDisponivel(onSale, preco, precoPromocao) {
        if (onSale == true) {
            return (
                <div>
                    <strike style={{ fontSize: '0.8em' }}>De {preco}</strike>
                    <p className="preco">Por {precoPromocao} </p>
                </div>
            )
        } else return <p className="preco">Por {preco}</p>
    }
    addToCar(index) {
        carrinho.push(index);
        this.setState({ carState : carrinho })
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
                <p>Carrinho ({this.state.carState.length > 0 ? this.state.carState.length : '0' })</p>
                <div className="container">
                    {/* Mapeando o meu array de products */}
                    {DataFiltra.map((item, index, data) => {
                        if (data.length == 0) {
                            return <h3>Nenhum produto encontrado...</h3>
                        }
                        else {
                            return (
                                <div onClick={(event) => this.addToCar(event, index)} className="container-produtos" tabIndex="0">
                                    <div className="image">
                                        {this.retImageOrNotFound(item.image)}
                                    </div>
                                    <div className="container-informacoes">
                                        <div className="informacoes">
                                            <h3>{item.name}</h3>
                                            <p className="cor">{item.color}</p>
                                            <div className="descricao">
                                                {this.retPrecoDisponivel(item.on_sale, item.regular_price, item.actual_price, item.discount_percentage)}
                                                <p>ou {item.installments}</p>
                                                <p style={{ height: '1px' }}>Tamanhos</p>
                                                <p style={{ display: 'flex', flexDirection: 'rows' }}>
                                                    {item.sizes.map((size, index) => {
                                                        return (
                                                            <p style={{ fontSize: '1em', marginLeft: '2px', color: (size.available == true ? '#5A5FE8' : '#839693') }} className="size">{size.size}</p>
                                                        )
                                                    })}
                                                    {/* <select> {item.sizes.map((size, index) => {                                             
                                                return (
                                                    <option disabled={size.available == true ? false : true} style={{ fontSize: '1em', marginLeft: '2px', color: (size.available == true ? '#4346FF' : '#839693') }} className="size">{size.size}</option>
                                                )
                                            })}</select> */}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default Ecommerce;
