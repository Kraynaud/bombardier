import React, { Component } from 'react';
import Form from './form';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            deviationIsa : '',
            ias : '',
            trq : '',
            ff : '',
            mcpValue : '',
            tempMcp : ''
        };
    }

    calculateIsa = (data) => {
        const tempIsa = ((data['altitudeAct'] / 1000) * -2) + 15
        this.setState({ deviationIsa : tempIsa - data['tempAct'] })
    }

    render () {
        return (
            <div className="container">
                <Form calculateIsa={this.calculateIsa}/>
                <div className="results">
                    <p>Your ISA deviation is {this.state.deviationIsa}</p>
                </div>
            </div>
        )
    }
}

export default App;