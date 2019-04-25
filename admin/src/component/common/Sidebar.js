import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

const menuList = [
  {route: 'index', text: 'Dashboard', icon: 'fa fa-dashboard'},
  {route: 'categories', text: 'Danh mục', icon: 'fa fa-list-alt'},
  {route: 'articles', text: 'Bài viết', icon: 'fa fa-newspaper-o'},
  {route: 'banners', text: 'Banner', icon: 'fa fa-image'}];

class Sidebar extends Component {

//   _signOut = () => {
//     UserManager.getInstance().signOut();
//     const j = window.jQuery.noConflict();
//     j('#signOutModal').modal('hide');
//     Router.pushRoute('/login');
//   };

  render () {

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
              </div>
              <div className="info">
                <a href="#" className="d-block">Alexander Pierce</a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                  <a href="pages/widgets.html" className="nav-link">
                    <i className="nav-icon fa fa-th" />
                    <p>
                      Widgets
                      <span className="right badge badge-danger">New</span>
                    </p>
                  </a>
                </li>
                <li className="nav-header">EXAMPLES</li>
                <li className="nav-item">
                  <a href="pages/calendar.html" className="nav-link">
                    <i className="nav-icon fa fa-calendar" />
                    <p>
                      Calendar
                      <span className="badge badge-info right">2</span>
                    </p>
                  </a>
                </li>
                 <li className="nav-header">MISCELLANEOUS</li>
                <li className="nav-item">
                  <a href="https://adminlte.io/docs" className="nav-link">
                    <i className="nav-icon fa fa-file" />
                    <p>Documentation</p>
                  </a>
                </li>
                <li className="nav-header">LABELS</li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fa fa-circle-o text-danger" />
                    <p className="text">Important</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fa fa-circle-o text-warning" />
                    <p>Warning</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fa fa-circle-o text-info" />
                    <p>Informational</p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
    );
  }
}

export default Sidebar;