import React, { Component } from 'react';
import {Bar,Line,Doughnut ,Chart} from 'react-chartjs-2';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class Notification extends Component {
  constructor () {
    super()
    this.state={
      listData:[],
      data:{
        id:"",
        title:"",
        content:"",
        type:"",
        userId:"",
        url:"",
        read:"",
        timestamp:""
      },
      newData:{
        title:"",
        content:"",
        type:"",
        userId:"",
        url:"",
        read:"",
        timestamp:""
      }
    }
  }

  componentDidMount(){
      this._getData();
  }

  _getData = () => {
    request({
      url:API_BASE_URL +"/notifi/getSystem/0",
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              listData:response.data,
          })
        }
    })
  }

  _submit = () => {
    let {newData} = this.state;
    console.log("submit",newData);
    request({
      url:API_BASE_URL +"/notifi/addNotifi",
      method:'POST',
      body:JSON.stringify(newData)
    }).then(response => {
      console.log("data",response);
        if(response.success){
          this._getData();
          Swal.fire('Success', 'You have created new category successfully', 'success');
        }else{
          Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
    })
  }
handleInputChange = (event) => {
  const target = event.target;
  const inputName = target.name;
  const inputValue = target.value;
  let {data} = this.state;
  this.setState({
      data:{
          ...data,
          [inputName] : inputValue
      }
  });
}

handleInputChangeNew = (event) => {
const target = event.target;
const inputName = target.name;
const inputValue = target.value;
let {newData} = this.state;
this.setState({
    newData:{
        ...newData,
        [inputName] : inputValue
    }
});
}

_openEdit = (id) => {
      request({
        url:API_BASE_URL +"/notifi/get/"+id,
        method:'GET',
      }).then(response => {
          if(response.success){
            this.setState({
              data:response.data
            })
          
        const j = window.jQuery.noConflict();
        j('#myModalEdit').modal('show');
          }
      })
}

_update = () => {
  let {data} = this.state;
  request({
    url:API_BASE_URL +"/user/update/"+this.state.data.id,
    method:'PUT',
    body:JSON.stringify(data)
  }).then(response => {
      if(response.success){
            this.setState({
              data:response.data
            })
            this._getData();
        Swal.fire(
          'Updated!',
          'Your User has been updated.',
          'success'
        )
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
        url:API_BASE_URL +"/notifi/delete/"+id,
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
    let {data,listData,newData} = this.state;
    let {phone,description,imageUrl,name,address,email,provider,emailVerified} = data;
      return (
          <div className="container-fluid">
            <h2>User</h2>
            <button className="btn btn-primary btn-lg mb-3 " data-toggle="modal" data-target="#myModal">Add +</button>
          
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Link</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                 {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
                    <th scope="row" key={index}>{item.type == 0 ? "System" : "Infomation  "}</th>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td><a href={item.url}>{item.url}</a></td>
                    <td>{item.timestamp}</td>
                    <td><button className="btn btn-success" onClick={() => this._openEdit(item.id)}><i className='fa fa-edit'></i></button><span> </span>
                    <button className="btn btn-danger" onClick={() => this._delete(item.id)}><i className='fa fa-times'></i> </button></td>
                  </tr>)}
                </tbody>
                </table>


        <div class="modal fade" id="myModal" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Create User</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div class="modal-body">
              <div class="form-group">
                <label for="email">Title :</label>
                <input type="text" class="form-control" name="title" value={newData.title} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
                <label for="email">Content :</label>
                <input type="text" class="form-control" name="content" value={newData.content} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
                <label for="email">Link :</label>
                <input type="text" class="form-control" name="url" value={newData.url} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
                <label for="email">Type :</label>
                <select name="type" className="custom-select" onChange={this.handleInputChangeNew} 
                value={newData.type} > 
                  <option value={0}>System</option>
                  <option value={1}>Infomation</option>
                </select>
              </div>
                <button class="btn btn-primary" onClick={this._submit}>Submit</button>
              </div>
              </div>
            </div>
            </div>
            

            <div class="modal fade" id="myModalEdit" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Detail User</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div class="modal-body">
              <div class="form-group">
                <label for="email">Email :</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.handleInputChange}/>
              </div>
              <div class="form-group">
                <label for="email">Description :</label>
                <input type="text" class="form-control" name="description" value={description} onChange={this.handleInputChange}/>
              </div>
              <div class="form-group">
                <label for="email">Address :</label>
                <input type="text" class="form-control" name="address" value={address} onChange={this.handleInputChange}/>
              </div>
              <div class="form-group">
                <label for="email">Phone :</label>
                <input type="text" class="form-control" name="phone" value={phone} onChange={this.handleInputChange}/>
              </div>
              <div class="form-group">
                <label for="email">Name :</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.handleInputChange}/>
              </div>
              <div class="form-group">
              <label for="group1">Chọn ảnh đại diện cho sản phẩm</label><br></br>
                  {!_.isEmpty(imageUrl) && <img className='img-product-primary' src={imageUrl} width={200} height={200}/> }
                <br/>
                <div className="input-group" id="group1">
                      <div className="input-group-prepend">
                      <span className="input-group-text" id="addon1"><i className="far fa-file-image"></i></span>
                      </div>
                      <div className="custom-file">
                      <input type="file" className="custom-file-input" id="file1" accept="image/*" 
                       aria-describedby="addon1" onChange={this.handleUploadImages}/>
                      <label className="custom-file-label" for="file1">Chọn ảnh</label>
                      </div>
                  </div>
                </div>
          <button class="btn btn-success" onClick={this._active}>Active</button>
          <button class="btn btn-danger" onClick={this._block}>Block</button>
          <button class="btn btn-primary" onClick={this._update}>Submit</button>
              </div>
              </div>
            </div>
            </div>
          
          </div>
      )
  }
}

export default Notification;