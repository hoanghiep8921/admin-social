import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
      <footer className='main-footer'>
        <div className='float-right d-none d-sm-block'>
          <b>Version</b> 3.0.0-alpha
        </div>
        <strong>Copyright &copy; 2014-2018 <a
          href='http://adminlte.io'>AdminLTE.io</a>.</strong> All rights
        reserved.
      </footer>
    );
  }
}

export default Footer;