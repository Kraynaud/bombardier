import React, { Component } from 'react';
import './App.module.css'
import Form from '../Form/Form';
import { isaM20, isaM10, isa10, isa, isa20, isa30, isa35, isa37 } from '../../../data/isa';
import mcp from '../../../data/mcp';

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
        } else if (this.state.deviationIsa >= -15 && this.state.deviationIsa <= -4) {
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

        let roundAlt;
        if ( data['altitudeAct']>=0 && data['altitudeAct']<1000 ) {
            roundAlt = "S.L.";
        } else if ( data['altitudeAct']>=1000 && data['altitudeAct']<3000 ) {
            roundAlt = 2000;
        } else if ( data['altitudeAct']>=3000 && data['altitudeAct']<5000 ) {
            roundAlt = 4000;
        } else if ( data['altitudeAct']>=5000 && data['altitudeAct']<7000 ) {
            roundAlt = 6000;
        } else if ( data['altitudeAct']>=7000 && data['altitudeAct']<9000 ) {
            roundAlt = 8000;
        } else if ( data['altitudeAct']>=9000 && data['altitudeAct']<11000 ) {
            roundAlt = 10000;
        } else if ( data['altitudeAct']>=11000 && data['altitudeAct']<13000 ) {
            roundAlt = 12000;
        } else if ( data['altitudeAct']>=13000 && data['altitudeAct']<15000 ) {
            roundAlt = 14000;
        } else if ( data['altitudeAct']>=15000 && data['altitudeAct']<17000 ) {
            roundAlt = 16000;
        } else if ( data['altitudeAct']>=17000 && data['altitudeAct']<19000 ) {
            roundAlt = 18000;
        } else if ( data['altitudeAct']>=19000 && data['altitudeAct']<21000 ) {
            roundAlt = 20000;
        } else if ( data['altitudeAct']>=21000 && data['altitudeAct']<23000 ) {
            roundAlt = 22000;
        } else if ( data['altitudeAct']>=23000 && data['altitudeAct']<24500 ) {
            roundAlt = 24000;
        } else {
            roundAlt = 25000;
        }

        if (array !== null) {
            const filter = Object.values(array);
            const result = [];
            const roundWgt = Math.floor(((parseInt(data['poidsAct']) + 500) / 1000)) * 1000;
            filter.forEach((item) => {
                if ( item['poids'] == roundWgt && item['alt'] == roundAlt ) {
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
            <div  className="Fullwraper">
                <Form 
                    calculateIsa={this.calculateIsa} 
                    calculateData={this.calculateData} 
                    calculateMCP={this.calculateMCP}
                />
                <div className="OutputContainer">
                    <h2>ISA deviation : {this.state.deviationIsa} °C</h2> 
                    <h2>Flight data:</h2>
                        <ul>
                            <li>Torque : {this.state.trq} %</li>
                            <li>Indicated Air Speed : {this.state.ias} Kt</li>
                            <li>Fuel Flow : {this.state.ff} Kg</li>
                        </ul>
                    <h2>Max Continuous Power (MCP) : {this.state.mcpValue} %</h2>
                    <h2>MCP temperature : {this.state.tempMcp} °C</h2>    
                </div>
            </div>
        )
    }
}

export default App;