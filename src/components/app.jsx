import React, { Component } from 'react';
import Form from './form';
import { isaM20, isaM10 } from '../../data/isa';
import mcp from '../../data/mcp';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviationIsa : '',
            ias : '',
            trq : '',
            ff : '',
            mcpValue : '',
            tempMcp : '',
            isaM20,
            isaM10,
            mcp
        };
    }

    calculateIsa = (data) => {
        const tempIsa = ( (data['altitudeAct'] / 1000 ) * -2) + 15
        this.setState({ deviationIsa : tempIsa - data['tempAct'] })
    } 
    
    calculateData = (data) => {

        const isaM20 = {...this.state.isaM20};
        const isaM10 = {...this.state.isaM10};

        let array;
        if (this.state.deviationIsa === -20) {
            array = isaM20;
        } else {
            array = isaM10;
        }

        const filter = Object.values(array)
        console.log(filter)

        let result = [];
        filter.map((item) => {
            if ( item['poids'] == parseInt(data['poidsAct']) && item['alt'] == parseInt(data['altitudeAct']) ) {
                result.push(item)    
            } 
        });
        console.log(result)
    }

    render () {  
        return (
            <div className="container">
                <Form calculateIsa={this.calculateIsa} calculateData={this.calculateData} />
                <div className="results">          
                </div>
            </div>
        )
    }
}

export default App;