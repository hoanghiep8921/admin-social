import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Home from '../home/Home';
import Sidebar from '../common/Sidebar';
import NotFound from '../common/NotFound';
import './App.css';
import Login from '../../container/Login';
import cookie from 'react-cookies';
import _ from 'lodash';
 
class App extends Component {
  constructor () {
    super()
    this.state={
      token: cookie.load('token'),
    }
  }
  render() {
    
    const title='Home';
    const {token} = this.state;
    return (
      <div>
        {_.isEmpty(token) ? <Login /> :
            <div className="wrapper">  
              <Header/>
              <Sidebar/> 
              <div className="content-wrapper">
              
              <Switch>
                  <Route path="/" component={Home}></Route>
                  <Route exact path="/vcl" component={Footer}></Route>
                  <Route component={NotFound}></Route>
              </Switch>
              </div>
                
              </div>
        }
      </div>
    );
  }
}

export default App;
