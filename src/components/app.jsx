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
        if (this.state.deviationIsa <= -16) {
            array = isaM20;
        } else if (this.state.deviationIsa >= -15 && this.state.deviationIsa <= -6) {
            array = isaM10;
        } else if (this.state.deviationIsa >= -5 && this.state.deviationIsa <= 4) {
            array = isa;
        } else if (this.state.deviationIsa >= 5 && this.state.deviationIsa <= 14) {
            array = isa10;
        } else if (this.state.deviationIsa >= 15 && this.state.deviationIsa <= 24) {
            array = isa20;
        } else if (this.state.deviationIsa >= 25 && this.state.deviationIsa <= 32) {
            array = isa30;
        } else if (this.state.deviationIsa >= 33 && this.state.deviationIsa <= 36) {
            array = isa35;
        } else if (this.state.deviationIsa >= 37) {
            array = isa37;
        } else {
            array = null;
        }

        if (array !== null) {
            const filter = Object.values(array);
            const result = [];
            filter.forEach((item) => {
                if ( item['poids'] == data['poidsAct'] && item['alt'] == data['altitudeAct'] ) {
                    result.push(item)   
                }
            });
            this.setState({
                ias : result[0]['ias'],
                ff : result[0]['ff'],
                trq : result[0]['trq'],
            })
        } else {
            this.setState({
                ias : "Out of indicated charts",
                ff : "Out of indicated charts",
                trq : "Out of indicated charts",
            })
        }
    }

    calculateMCP = (data) => {
        let tempMcp;
        let mcpValue;
        const altitude = parseInt(data['altitudeAct']);
        const temperature = parseInt(data['tempAct']);
        const altitudeTarget = parseInt(data['altTarget']);
        const tempRound = temperature > 0 ? Math.floor((temperature+5)/10 ) * 10  : Math.floor((temperature-5)/10 ) * 10 ;    
        const mcpRecord = [];

        this.state.mcp.forEach((item) => {
            if ( item['altitude'] === altitude ) {
                mcpRecord.push(item) 
            }
        });

        for (const key in mcpRecord[0]) {
            if (parseInt(key) === tempRound) {
                mcpValue = mcpRecord[0][key]
            }
        }
        if (mcpValue === undefined) {
            mcpValue = "MCP out of indicated charts"
        }

        tempMcp = ((altitudeTarget - altitude) / 1000 * -2) + temperature;
        
        this.setState({
            mcpValue,
            tempMcp
        })
    } 

    render () {  
        return (
            <div className="container">
                <Form 
                    calculateIsa={this.calculateIsa} 
                    calculateData={this.calculateData} 
                    calculateMCP={this.calculateMCP}
                />
                <div className="results">
                    <h2>Your ISA deviation is {this.state.deviationIsa} (%)</h2> 
                    <h2>Your flight data</h2>
                        <ul>
                            <li>Torque : {this.state.trq} (%)</li>
                            <li>Indicated Air Speed : {this.state.ias} (Kt)</li>
                            <li>Fuel Flow : {this.state.ff} (Kg)</li>
                        </ul>
                    <h2>Your Max Continuous Power is {this.state.mcpValue} (%)</h2>
                    <h2>MCP temperature is {this.state.tempMcp} (°C)</h2>    
                </div>
            </div>
        )
    }
}

export default App;