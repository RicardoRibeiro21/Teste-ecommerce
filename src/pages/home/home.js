import React, { Component } from 'react';
import Data from '../../data/db.json';
import '../home/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import indisponivel from '../../assets/img/indisponivel.jpg';
import Carrinho from '../carrinho/carrinho';

let carrinho = [];
let tamanhos = [];
let tamanhoSelect = null;
class Ecommerce extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            carState: [],
            modalShow: false,
            setModalShow: true,
            prodSelected: [],
            showCar: false
        }
    }
    componentDidMount() {
        //Carregando os itens do carrinho
        let vetor = JSON.parse(localStorage.getItem("Itens"));
        this.setState({ carState: vetor })
        if (vetor !== null) {
            for (let i = 0; i < vetor.length; i++) {
                carrinho.push(vetor[i]);
            }
        }
    }
    //Verifica se a imagem retorna nula e retorna uma img de feedback
    retImageOrNotFound(item) {
        if (item !== null && item !== "") item = <img src={item} alt="imagem do produto"></img>
        else item = <img src={indisponivel}></img>
        return item;
    }
    //Atualizando o meu estado a cada letra digitada
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }
    //Retorna o só o preco ou preco com promoção
    retPrecoDisponivel(onSale, preco, precoPromocao) {
        if (onSale === true) {
            return (
                <div>
                    <strike style={{ fontSize: '0.8em' }}>De {preco}</strike>
                    <p className="preco">Por {precoPromocao} </p>
                </div>
            )
        } else return <p className="preco">Por {preco}</p>
    }
    //Função que adiciona os itens escolhidos ao carrinho.
    addToCar(event, produto) {
        let itemAdicionado = {
            produto: produto,
            tamanho: tamanhoSelect
        }
        carrinho.push(itemAdicionado);
        this.setState({ carState: carrinho });
        localStorage.setItem("Itens", JSON.stringify(carrinho));
        console.log(localStorage.getItem('Item'));
    }
    //Responsável  por chamar o modal
    chamaModal(event, item, sizes, index) {
        this.valorSelectSize(index);
        this.setState({ modalShow: !this.state.modalShow });
        this.setState({ prodSelected: null });
        this.setState({ prodSelected: item });
        //Esvaziando vetor
        tamanhos = [];
        sizes.map((size) => {

            tamanhos.push()
        })
        console.log(item)
        // console.log(sizes);
    }
    //Pego o valor do tamanho selecionado
    valorSelectSize(index) {
        var select = document.getElementById('selectedSize' + index);
        var value = select.options[select.selectedIndex].value;
        tamanhoSelect = value;
    }
    showCarrinho() {
        this.setState({ showCar: true })
    }

    render() {
        //Criando meu modal
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
                        <div style={{ display: 'flex' }}>
                            <img style={{ width: '30%' }} src={props.prod.image}></img>
                            <div style={{ width: '50%' }}>
                                <p>Cor {props.prod.color}</p>
                                {/* <select>Tamanho {tamanhos.map((tamanho) => {
                                    return (
                                        <option>{tamanho.size}</option>
                                    )
                                })}</select> */}
                                <p>Preço: {props.prod.actual_price}</p>
                                <p>ou {props.prod.installments}</p>
                                {props.prod.discount_percentage !== '' ? <p>Desconto de {props.prod.discount_percentage}</p> : ""}
                                <p>Tamanho {tamanhoSelect}</p>
                            </div>
                            <p>Carrinho ({props.car === null ? 0 : props.car.length}) </p>
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
        if (this.state.showCar === false) {
            return (
                <div>
                    <h2 className="titulo">A melhor loja de roupas e acessórios para você</h2>
                    <div className="busca">
                        <input type="text" id="txtBusca" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Pesquisar produtos..." />
                        <a onClick={(event) => this.showCarrinho(event)}>Carrinho ({this.state.carState === null ? 0 : this.state.carState.length})</a>
                    </div>
                    <div className="container">
                        {/* Mapeando o meu array de products */}
                        {DataFiltra.map((item, index, data) => {
                            if (item.index == 0) {
                                return <h3>Nenhum produto encontrado...</h3>
                            }
                            else {
                                return (
                                    <div className="container-produtos" >
                                        <div onClick={(event) => this.chamaModal(event, item, item.sizes, index)} >
                                            {/* Chamando meu modal e passando as props */}
                                            <MyVerticallyCenteredModal
                                                show={this.state.modalShow}
                                                onHide={() => this.setState({ modalShow: true })}
                                                prod={this.state.prodSelected}
                                                car={this.state.carState}
                                                add={(event) => this.addToCar(event, this.state.prodSelected)}
                                            />
                                            <div className="image">
                                                {this.retImageOrNotFound(item.image)}
                                            </div>
                                        </div>
                                        <div className="container-informacoes">
                                            <div className="informacoes">
                                                <h3 style={{ marginTop: '6%' }}>{item.name}</h3>
                                                <p className="cor">{item.color}</p>
                                                <div className="descricao">
                                                    {this.retPrecoDisponivel(item.on_sale, item.regular_price, item.actual_price, item.discount_percentage)}
                                                    <p>ou {item.installments}</p>
                                                    <p style={{ height: '1px' }}>Tamanhos</p>
                                                    <select id={`selectedSize${index}`} onChange={(event) => this.chamaModal(event, item, item.sizes, index)} className="dropdown">
                                                        {/* Mapeando o vetor de tamanhos de cada produto */}
                                                        {item.sizes.map((size, index) => {
                                                            return (
                                                                <option disabled={size.available === true ? false : true} style={{ fontSize: '1em', marginLeft: '2px', color: (size.available === true ? '#5A5FE8' : '#839693') }} className="size">{size.size}</option>
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
        else {
            return <Carrinho />
        }
    }
}

export default Ecommerce;