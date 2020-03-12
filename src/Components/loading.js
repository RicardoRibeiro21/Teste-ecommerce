import React, { Component } from 'react';
import ReactLoading from 'react-loading';


export default class Loading extends Component {
    render() {
        return (
            <div >
                <ReactLoading className="loading" type={this.props.type} color={this.props.color} height={this.props.height} width={this.props.width} />
            </div>
        )
    }
}
