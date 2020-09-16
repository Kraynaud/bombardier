import React, { Component } from 'react';
import './Form.module.css'
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tempAct : '',
            altitudeAct : '',
            poidsAct : '',
            altTarget : '',
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        const data = {...this.state}
        this.props.calculateIsa(data)
        setTimeout(() => {
            this.props.calculateData(data)
        }, 250);
        setTimeout(() => {
            this.props.calculateMCP(data)
        }, 500);
    }

    render() {
        return (
            <div className="FormFull">
                <h2>Données de vol</h2>
                <form action="submit" onSubmit={this.handleSubmit} className="Form">
                    <label htmlFor="name">Température actuelle °C</label>
                    <input value={this.state.tempAct} name="tempAct" onChange={this.handleChange} type="text" placeholder="Température °C" />
                    <label htmlFor="name">Altitude actuelle ft</label>
                    <input value={this.state.altitudeAct} name="altitudeAct" onChange={this.handleChange} type="text" placeholder="Altitude ft" />
                    <label htmlFor="name">Poids actuelle Kg</label>
                    <input value={this.state.poidsAct} name="poidsAct" onChange={this.handleChange} type="text" placeholder="Poids Kg" />
                    <label htmlFor="name">Altitude Target ft</label>
                    <input value={this.state.altTarget} name="altTarget" onChange={this.handleChange} type="text" placeholder="Altitude Target ft" />
                    <button type="submit">Calculer</button>
                </form>
            </div>
        );
    }
}

export default Form;