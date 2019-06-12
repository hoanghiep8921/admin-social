import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SockJsClient from 'react-stomp';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';

class Header extends Component {
  constructor(props){
    super(props);
    const {isLogin,user} = this.props;
    this.state = {
      countNotifi:'',
      listNotifi:[]
    }
  }

  componentDidMount(){
    this._getData();
    this._getCount();
  }
 
  _getCount = () => {
    request({
      url: API_BASE_URL + "/notifi/count/1",
      method:'GET',
    }).then(response => {
      if(response.success){
        this.setState({
          countNotifi:response.data,
        })
      }
    })
  }

  _readNoti = (id,url) => {
    let {countNotifi} = this.state;
    request({
      url: API_BASE_URL + "/notifi/read/"+ id,
      method: 'GET'
  }).then(response => {
      if(response.success){
        if(countNotifi>0){
          this.setState({
            countNotifi:--countNotifi,
          })
        }
       
      }
      
    this._getData();
    window.open(url, '_blank');
  }).catch(error => {
      console.log(error);
  })
  }

  _getData = () => {
    request({
      url: API_BASE_URL + "/notifi/getAll/1?page=0&limit=30",
      method:'GET',
    }).then(response => {
      console.log("response",response);
      if(response.success){
        this.setState({
          listNotifi:response.data.reverse(),
        })
      }
    })
  }

  _onNotification = (notification) => {
    let {listNotifi,countNotifi} = this.state;
    listNotifi.unshift(notification);
    this.setState({
      listNotifi,
      countNotifi:++countNotifi
    });
  }
  render () {
    const {countNotifi,listNotifi} = this.state;
    return (
      <nav className="main-header navbar navbar-expand bg-white navbar-light border-bottom">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#"><i className="fa fa-bars" /></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          
        <Link to="/"><a  className="nav-link">Home</a></Link>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Messages Dropdown Menu */}
       
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="fa fa-bell-o" />
            <span className="badge badge-warning navbar-badge">{countNotifi>0 && countNotifi}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{minWidth:'none',maxWidth:'none'
}}>
            <div className="dropdown-divider" />
           {!_.isEmpty(listNotifi) && listNotifi.map((item,index) => <a key={index}  onClick={() => this._readNoti(item.id,item.url)} className="dropdown-item">
              <i className="fa fa-envelope mr-2" />{item.title}
              <span className="float-right text-muted text-sm">{moment(item.timestamp).fromNow()}</span>
           </a>)} 
          </div>
        </li>
        <li className="nav-item">
          <a onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }} className="nav-link"><i className="fa fa-sign-out" /></a>
        </li>
      </ul>
      <SockJsClient url="http://localhost:8088/newNotification"  topics={["/topic/newNotification/1"]}
            onMessage={ (notification) => this._onNotification(notification)} ref={ (client) => 1}
            onConnect={() => console.log('connected to notifi')}
            onDisconnect={ () => console.log("fuck you")}
            debug={ false }/>
    </nav>
    );
  }
}

export default Header;