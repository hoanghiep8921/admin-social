import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Header from '../common/Header';

import {connect} from 'react-redux';

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
import ChartReport from '../chart/ChartReport';


import Sidebar from '../common/Sidebar';
import NotFound from '../common/NotFound';
import './App.css';
import Login from '../../container/Login';
import cookie from 'react-cookies';
import _ from 'lodash';
import ArticleDetail from '../article/ArticleDetail';

import Article from '../article/Article';
 
class App extends Component {
  constructor () {
    super()
    this.state={
      //token: cookie.load('token'),
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('next props',nextProps.user);
    if(nextProps.user != this.state.user){
      this.setState({
        user:nextProps.user
      })
    }
}
  render() {
    
    const title='Home';
    const {user} = this.state;
    return (
      <Router>
      <div>
        {_.isEmpty(localStorage.getItem("token")) ? <Login /> :
            <div className="wrapper">  
              <Header/>
              <Sidebar/> 
              <div className="content-wrapper">
              
              <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route path="/categories" component={Category}></Route>
                  <Route path="/banners" component={Banner}></Route>
                  <Route path="/articles" component={Article}></Route>
                  <Route path="/article/:id" component={ArticleDetail}></Route>
                  <Route path="/report" component={Report}></Route>
                  <Route path="/products" component={Product}></Route>
                  <Route path="/orders" component={Order}></Route>
                  <Route path="/notifications" component={Notification}></Route>
                  <Route path="/users" component={User}></Route>
                  <Route path="/chart" component={ChartReport}></Route>
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

const mapStateToProps = (state) => {
  return {
    user:state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
