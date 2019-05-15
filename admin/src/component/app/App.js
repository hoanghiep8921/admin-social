import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Header from '../common/Header';

import {BrowserRouter as Router} from 'react-router-dom';
import Footer from '../common/Footer';
import Home from '../home/Home';
import User from '../user/User';
import Category from '../category/Category';
import Banner from '../banner/Banner';
import Order from '../order/Order';
import Report from '../report/Report';
import Notification from '../notification/Notification';
import Product from '../product/Product';
import Chart from '../chart/Chart';


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
      <Router>
      <div>
        {!_.isEmpty(token) ? <Login /> :
            <div className="wrapper">  
              <Header/>
              <Sidebar/> 
              <div className="content-wrapper">
              
              <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route path="/categories" component={Category}></Route>
                  <Route path="/banners" component={Banner}></Route>
                  <Route path="/articles" component={Banner}></Route>
                  <Route path="/report" component={Report}></Route>
                  <Route path="/products" component={Product}></Route>
                  <Route path="/orders" component={Order}></Route>
                  <Route path="/notifications" component={Notification}></Route>
                  <Route path="/user" component={User}></Route>
                  <Route path="/chart" component={Chart}></Route>
                  <Route component={NotFound}></Route>
              </Switch>
              </div>
                
              </div>
        }
      </div>
      </Router>
    );
  }
}

export default App;
