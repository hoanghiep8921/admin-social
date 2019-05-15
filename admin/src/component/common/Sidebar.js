import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";

const menuList = [
  {route: '/categories', text: 'Danh mục', icon: 'nav-icon fa fa-list-alt'},
  {route: '/articles', text: 'Bài viết', icon: 'nav-icon fa fa-newspaper-o'},
  {route: '/banners', text: 'Banner', icon: 'nav-icon fa fa-image'},
  {route: '/products', text: 'Sản phẩm', icon: 'nav-icon fa fa-image'},
  {route: '/orders', text: 'Giao dịch', icon: 'nav-icon fa fa-image'},
  {route: '/chart', text: 'Thống kê', icon: 'nav-icon fa fa-image'},
  {route: '/notifications', text: 'Thông báo', icon: 'nav-icon fa fa-image'},
  {route: '/report', text: 'Đơn từ', icon: 'nav-icon fa fa-image'},
  {route: '/users', text: 'Người dùng', icon: 'nav-icon fa fa-user'},];

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
          <Link to="/"><a className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">Admin Do2geder</span>
          </a></Link>
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
                <li className="nav-header">EXAMPLES</li>
                {menuList.map((item,index) => <li key={index} className="nav-item">
                  <Link to={item.route}><a className="nav-link">
                    <i className={item.icon} />
                    <p>
                      {item.text}
                      {/* <span className="badge badge-info right">2</span> */}
                    </p>
                  </a></Link>
                </li>)}
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