import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';

class Report extends Component {
  constructor () {
    super()
    this.state={
      listData:[],
      data:{}
    }
  }

  componentDidMount(){
      this._getData();
  }

  _getData = () => {
    request({
      url:API_BASE_URL +"/report/getAll",
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              listData:response.data,
          })
        }
    })
  }

  _submit = (id,status) => {
    request({
      url:API_BASE_URL +"/report/status/"+id+"?status="+status,
      method:'GET'
    }).then(response => {
      console.log("data",response);
        if(response.success){
          this._getData();
          Swal.fire('Success', 'Update status  successfully', 'success');
        }else{
          Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
    })
  }

_openEdit = (id) => {
  request({
    url:API_BASE_URL +"/report/detail/"+id,
    method:'GET'
  }).then(response => {
    console.log("data",response);
    this.setState({
      data:response.data,
    })
    const j = window.jQuery.noConflict();
    j('#myModalEdit').modal('show');
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
        url:API_BASE_URL +"/report/delete/"+id,
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
    let {data,listData} = this.state;
    console.log('data state :',data);
      return (
          <div className="container-fluid">
            <h2>Report</h2>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Reporter</th>
                    <th scope="col">Order</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Ation</th>
                  </tr>
                </thead>
                <tbody>
                 {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
                    <th scope="row" key={index}>{index}</th>
                    <td><img src={item.image}  height={50} width={50}/></td>
                    
                    <td>{item.reporter}</td>
                    <td>{item.orderId}</td>
                    <td>{item.status == 1 && <button class="btn btn-primary">Pending</button>}
                {item.status == 2 && <button class="btn btn-primary">Accept</button>}
                {item.status == 3 && <button class="btn btn-primary">Block</button>}</td>
                    <td>{moment(item.timestamp).format("DD/MM/YYYY HH:mm")}</td>
                    <td><button className="btn btn-success" onClick={() => this._submit(item.id,2)}><i className='fa fa-check-circle'></i></button><span> </span>
                    <button className="btn btn-warning" onClick={() => this._submit(item.id,3)}><i className='fa fa-lock'></i></button><span> </span>
                    <button className="btn btn-success" onClick={() => this._openEdit(item.id)}><i className='fa fa-eye'></i></button><span> </span>
                    <button className="btn btn-danger" onClick={() => this._delete(item.id)}><i className='fa fa-times'></i> </button></td>
                  </tr>)}
                </tbody>
              </table>


        <div class="modal fade" id="myModalEdit" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Detail Report</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div class="modal-body">
              <div class="form-group">
                <label for="email">Creator :</label>
                <input type="text" class="form-control" value={data.reporter} readOnly/>
              </div>
              <div class="form-group">
                <label for="email">Image:</label>
                <img src={data.image} style={{width:'100%',height:'400px'}}/>
              </div>
              <div class="form-group">
                <label for="email">Content:</label>
                <textarea  className='form-control' value={data.content} readOnly></textarea>
              </div>
              <div class="form-group">
                <label for="email">Accused :</label>
                <input type="text" class="form-control" value={data.accused} readOnly/>
              </div>
              <div class="form-group">
                <label for="email">Transaction ID :</label>
                <input type="text" class="form-control" value={data.orderId} readOnly/>
              </div>
              <div class="form-group">
                <label for="email">Status :</label>
                {data.status == 1 && <button class="btn btn-primary">Pending</button>}
                {data.status == 2 && <button class="btn btn-primary">Accept</button>}
                {data.status == 3 && <button class="btn btn-primary">Block</button>}
              </div>
               
              </div>
              </div>
            </div>
            </div> 
          </div>
      )
  }
}

export default Report;