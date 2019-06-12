import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signIn} from "../actions/user";
import {login} from "../utils/APIUtils";
import _ from 'lodash';
import { Redirect,Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
    componentWillReceiveProps(nextProps){
        console.log('next props',nextProps.user);
        if(nextProps.user != this.state.user){
          this.setState({
            user:nextProps.user
          })
        }
    }

    _handleInputChange = (event) => {
      const target = event.target;
      const inputName = target.name;
      const inputValue = target.value;
      this.setState({
        [inputName] : inputValue
      });
    }

    _submitLogin = (event) => {
      event.preventDefault();
      const {email,password} = this.state;
      const user = {
        email:email,
        password:password
      }


      if(email == 'admin@gmail.com' && password == '123456zx'){
        const loginRequest = Object.assign({}, user);

        login(loginRequest)
          .then(response => {
            let {accessToken} = response || {};
            localStorage.setItem('token', accessToken || {});
            console.log("ket qua",response);
            this.props.signIn(accessToken || {});

          }).catch(error => {

          alert('Welcome to Admin');
          window.location.reload();
        });
      }else{
        alert("Tài khoản không đúng. Vui lòng kiểm tra lại");
      }
    }

  render(){
    // if(!_.isEmpty(localStorage.getItem("token")))
    //   return <Redirect to='/home'/>;
    
    return (
      <div className="login-box">
      <div className="login-logo">
        <a href="#"><b>Admin</b>LTE</a>
      </div>
      {/* /.login-logo */}
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form action="../../index2.html" method="post">
            <div className="form-group has-feedback">
              <input type="email" className="form-control" placeholder="Email"  name='email' onChange={this._handleInputChange}/>
              <span className="fa fa-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" placeholder="Password"  name='password' onChange={this._handleInputChange}  />
              <span className="fa fa-lock form-control-feedback" />
            </div>
            <div className="row">
                <button type="submit" className="btn btn-primary btn-block btn-flat" onClick={this._submitLogin}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user:state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn:(token) => dispatch(signIn(token)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);