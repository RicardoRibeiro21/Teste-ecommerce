import React, { Component } from 'react';
import Data from '../data/db.json';
import '../pages/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap'

let carrinho = [];
let itemSelected = [];
let produtos = [];
class Ecommerce extends Component {
    constructor() {
        super();
        this.state = {
            itens: [],
            search: '',
            carState: [],
            modalShow: false,
            prodSelected: ''
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
        itemSelected.push(item);
        console.log(itemSelected);
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
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <p>{props.prod.name}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img style={{ width: '20%' }} src={props.prod.image}></img>
                        <p>{props.prod.color}</p>
                        <p>{props.prod.actual_price}</p>
                        <p>{props.prod.size}</p>
                        <p>{props.car.length}</p>
                        {/* <select> {this.props.prod.sizes.map((size) => {
                            return (
                                <option disabled={size.available == true ? false : true} style={{ fontSize: '1em', marginLeft: '2px', color: (size.available == true ? '#4346FF' : '#839693') }} className="size">{size.size}</option>
                            )
                        })}</select> */}
                        {console.log(props.prod.name)}
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
                        produtos.push(item)
                        if (data.length == 0) {
                            return <h3>Nenhum produto encontrado...</h3>
                        }
                        else {
                            return (
                                <div onClick={() => { this.chamaModal(item) }} className="container-produtos" tabIndex="0">
                                    <div className="image">
                                        {this.retImageOrNotFound(item.image)}
                                    </div>
                                    <MyVerticallyCenteredModal
                                        show={this.state.modalShow}
                                        prod={this.state.prodSelected}
                                        car={this.state.carState}
                                        add={(event) => this.addToCar(event, this.state.prodSelected)}
                                    />
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
                                                </p>
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
