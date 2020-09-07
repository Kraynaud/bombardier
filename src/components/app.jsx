import React, { Component } from 'react';
import Form from './form';
import { isaM20, isaM10, isa10, isa, isa20, isa30, isa35, isa37 } from '../../data/isa';
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
            isa10,
            isa20,
            isa30,
            isa35,
            isa37,
            isa,
            mcp
        };
    }

    calculateIsa = (data) => {
        const tempIsa = ( (data['altitudeAct'] / 1000 ) * -2) + 15
        this.setState({ deviationIsa : tempIsa - data['tempAct'] })
    } 
    
    calculateData = (data) => {
        
        let array;
        if (this.state.deviationIsa === -20) {
            array = isaM20;
        } else if (this.state.deviationIsa === -10) {
            array = isaM10;
        } else if (this.state.deviationIsa === 0) {
            array = isa;
        } else if (this.state.deviationIsa === 10) {
            array = isa10;
        } else if (this.state.deviationIsa === 20) {
            array = isa20;
        } else if (this.state.deviationIsa === 30) {
            array = isa30;
        } else if (this.state.deviationIsa === 35) {
            array = isa35;
        } else if (this.state.deviationIsa === 37) {
            array = isa37;
        } else {
            alert("No data available");
        }

        const filter = Object.values(array);
        const result = [];
        filter.forEach((item) => {
            if ( item['poids'] == parseInt(data['poidsAct']) && item['alt'] == parseInt(data['altitudeAct']) ) {
                result.push(item)   
            }
        });
        this.setState({
            ias : result[0]['ias'],
            ff : result[0]['ff'],
            trq : result[0]['trq'],
        })
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