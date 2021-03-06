import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Carrinho from './pages/carrinho/carrinho';
import Ecommerce from './pages/home/home';

const rotas =  (
    <Router>
        <div>
            <Switch>
            <Route exact path="/" component={App} />
            <Route path="/Home" component={Ecommerce} />           
            <Route path="/Carrinho" component={Carrinho} />           
            {/* <Route component={NaoEncontrada}/> */} 
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();