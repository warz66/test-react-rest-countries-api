//import logo from './logo.svg';
import './App.css';
import Header from 'components/header/Header';
import Home from 'views/home/Home';
import Country from 'views/country/Country';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mode: true}
    this.changeMode = this.changeMode.bind(this);
  }

  changeMode() {
    this.setState(state => ({
        mode: !state.mode       
    })); 
  }
  
  render() {
    return (
      <div className={this.state.mode ? 'App light-mode' : 'App dark-mode'}>
        <Header mode={this.state.mode} changeMode={this.changeMode}/>
        <Router>
          <Switch>
            <Route path="/Country/:a3c" component={Country}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </Router>
      </div>
    );
  }
} 

export default App;
