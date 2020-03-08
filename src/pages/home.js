import React, { Component } from 'react';
import Data from '../data/db.json';
import '../pages/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

let carrinho = [];
let tamanhos = [];
class Ecommerce extends Component {
    constructor() {
        super();
        this.state = {
            itens: [],
            search: '',
            carState: [],
            modalShow: false,
            prodSelected: []
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
    //Função que adiciona os itens escolhidos ao carrinho.
    addToCar() {
        carrinho.push(this.state.prodSelected);
        this.setState({ carState: carrinho })
        console.log(carrinho)
    }

    chamaModal(item) {
        this.setState({ modalShow: !this.state.modalShow });
        this.setState({ prodSelected: null });
        this.setState({ prodSelected: item });
        //Esvaziando o vetor caso tenha valores
        tamanhos = [];
        item.sizes.map((size) => {
            tamanhos.push(size.size)
        })
    }


    render() {
        //Função do meu Modal
        function MyVerticallyCenteredModal(props) {
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton style={{ heigth: '10px' }}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <p>{props.prod.name}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: 'flex' }}>
                            <img style={{ width: '30%' }} src={props.prod.image}></img>
                            <div style={{ width: '50%' }}>
                                <p>Cor {props.prod.color}</p>
                                <select>Tamanho {tamanhos.map((tamanho) => {
                                    return (
                                        <option>{tamanho.size}</option>
                                    )
                                })}</select>
                                <p>Preço: {props.prod.actual_price}</p>
                                <p>ou {props.prod.installments}</p>
                                {props.prod.discount_percentage != '' ? <p>Desconto de {props.prod.discount_percentage}</p> : ""}
                            </div>
                            <p>Carrinho ({props.car.length})</p>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Fechar</Button>
                        <Button onClick={props.add}>Adicionar</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

        //Criando o filtro
        var DataFiltra = Data.products.filter(
            (result) => {
                return result.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <h2>O melhor E-commerce para você</h2>
                <input type="text" id="txtBusca" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Pesquisar produtos..." />
                <p>Carrinho ({this.state.carState.length > 0 ? this.state.carState.length : '0'})</p>
                <div className="container">
                    {/* Mapeando o meu array de products */}
                    {DataFiltra.map((item, index, data) => {
                        if (data.length == 0) {
                            return <h3>Nenhum produto encontrado...</h3>
                        }
                        else {
                            return (
                                <div className="container-produtos" >
                                    <MyVerticallyCenteredModal
                                        show={this.state.modalShow}
                                        prod={this.state.prodSelected}
                                        car={this.state.carState}
                                        add={(event) => this.addToCar(event, this.state.prodSelected)}
                                    />
                                    <div  className="image">
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
                                                <select style={{ display: 'flex', flexDirection: 'rows' }}>
                                                    {item.sizes.map((size, index) => {
                                                        return (
                                                            <option style={{ fontSize: '1em', marginLeft: '2px', color: (size.available == true ? '#5A5FE8' : '#839693') }} className="size">{size.size}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    )}
                </div>
            </div>
        )
    }
}

export default Ecommerce;
