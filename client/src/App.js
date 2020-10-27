import React, { Component } from 'react'
import './App.css';


export default class App extends Component {
  constructor(){
    super()
    this.state={
    balance: 0,
    username: 'user',
    payer: "",
    addPoints: 0,
    deductPoints: 0
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/points')
    .then(req => req.json())
    .then(data => this.setState({balance: data.balance}))
    .catch(err => console.log(err.message))
  }


  handleDeductions = () => {
    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        deductPoints: this.state.deductPoints
      })
    }

    fetch('http://localhost:3000/deductpoints', reqObj)
    .then(req => req.json())
    .then(data => console.log(data))
    .catch(err => console.log(err.message))
  }


  handleAdditions = () => {
    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        payer: this.state.payer,
        addPoints: this.state.addPoints
      })
    }

    fetch('http://localhost:3000/addpoints', reqObj)
    .then(req => req.json())
    .then(data => console.log(data))
    .catch(err => console.log(err.message))
  }
  

  handleTransactions = () => {
    fetch('http://localhost:3000/transactions')
    .then(req => req.json())
    .then(data => console.log(data))
    .catch(err => console.log(err.message))
  }

  handleChange = (e) => {
    this.setState({
    [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div>
        <div>
          <h2>Point Balance</h2>
          <h3>{this.state.balance}</h3>
          <button> Update Point Balance</button>
        </div>
        <hr/>
        <div>
            <div>
              <label htmlFor="payer">Payer</label>
              <input onChange={(e) => { this.handleChange(e)}} type="text" name="payer" id=""/>
              <br/>
              <label htmlFor="points">Points</label>
              <input onChange={(e) => { this.handleChange(e)}} type="number" name="addPoints" id=""/><br/>
              <button onClick={() => this.handleAdditions()}>Earn Points</button>
            </div>
        </div>
        <hr/>
        <div>
          <label htmlFor="deduct">How many points to spend</label>
          <input onChange={(e) => { this.handleChange(e)}} type="number" name="deductPoints"/> <br/>
          <button onClick={() => this.handleDeductions()}>Spend Points</button>
          <br/>
        </div>
        <hr/>
        <button onClick={() => this.handleTransactions()}>See Transactions</button>
      </div>
    )
  }
}

