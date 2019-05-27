import React, { Component } from 'react';

import {Bar,Line,Doughnut ,Chart} from 'react-chartjs-2';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class Order extends Component {
  constructor () {
    super()
    this.state={
      filter:"",
      listData:[],
      data:""
    }
  }

  componentDidMount(){
      this._getData();
  }

  _searchData = () => {

  }

  _getData = () => {
    request({
      url:API_BASE_URL +"/order/getAll?page=0&limit=20",
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              listData:response.data,
              filter:"All"
          })
        }
    })
  }

  _getByStatus = (status) => {
    request({
      url:API_BASE_URL +"/order/getStatus?status="+status,
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              listData:response.data,
              filter:status
          })
        }
    })
  }

_delete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      request({
        url:API_BASE_URL +"/order/delete/"+id,
        method:'GET',
      }).then(response => {
          if(response.success){
            this._getData();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
      })
      
    }
  })
}

  render(){
    let {data,listData,filter} = this.state;
    let {product,delevierAt,user,status,createdAt,updatedAt,isPrice,isDone} = data || {};
      return (
          <div className="container-fluid">
            <h2>Order</h2>
            <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter List Order  <span>by <strong>{filter}</strong></span>
  </button><hr></hr>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
   
    <a className="dropdown-item" onClick={this._getData}>All</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Block")}>Block</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Accept")}>Accept</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Pending")}>Pending</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Deliver")}>Deliver</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Done")}>Done</a>
   </div>

   <ReactHTMLTableToExcel
                    id="orderDetail"
                    className="btn btn-success float-right mb-2 btn-sm"
                    table="order"
                    filename="order"
                    sheet="tablexls"
                    buttonText="Export to Excel"/>
</div>
 <div className="table-responsive">
              <table className="table table-bordered table-responsive" id="order">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">User Buyer</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Deliver At</th>
                    <th scope="col">Status</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Done</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                 {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
                    <th scope="row" key={index}>{item.id}</th>
                    
                    <td>{item.product.name}</td>
                    <td>{item.user.name}</td>
                    <td>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    
                    <td>{moment(item.updatedAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{moment(item.delevierAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{item.status}</td>
                    <td>{item.isPrice == 0  ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                    <td>{item.isDone  == 0  ? "Đã giao hàng " : "Chưa giao hàng"}</td>
                    <td><span> </span>
                    <button className="btn btn-danger" onClick={() => this._delete(item.id)}><i className='fa fa-times'></i> </button></td>
                  </tr>)}
                </tbody>
              </table>
              </div>
          </div>
      )
  }
}

export default Order;