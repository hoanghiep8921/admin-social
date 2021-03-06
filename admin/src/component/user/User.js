import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';

class User extends Component {
  constructor () {
    super()
    this.state={
      listData:[],
      search:'',
      data:{
        id:"",
        emailVerified:"",
        email:"",
        imageUrl:"",
        name:"",
        address:"",
        provider:"",
        description:"",
        phone:""
      },
      newData:{
        id:"",
        email:"",
        imageUrl:"",
        name:"",
        address:"",
        provider:"",
        description:"",
        phone:"",
        password:""
      }
    }
  }

  componentDidMount(){
    this._getData();
  }

  _getData = () => {
    request({
      url:API_BASE_URL +"/user/getAll",
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
      url:API_BASE_URL +"/user/create",
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

handleUploadImages = (event) => {
    let data = new FormData();
    data.append('file', event.target.files[0]);
    console.log('file',event.target.files);
    fetch(`${API_BASE_URL}/upload-image`, {
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(image => {

          let {data} = this.state;
          this.setState({
              data:{
                  ...data,
                  imageUrl : image.data
              }
          });
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

handleUploadImagesNew = (event) => {
  let data = new FormData();
  data.append('file', event.target.files[0]);
  console.log('file',event.target.files);
  fetch(`${API_BASE_URL}/upload-image`, {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(image => {

        let {newData} = this.state;
        this.setState({
            newData:{
                ...newData,
                imageUrl : image.data
            }
        });
  })
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
        url:API_BASE_URL +"/user/get/"+id,
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
        url:API_BASE_URL +"/user/delete/"+id,
        method:'DELETE',
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
_active = () => {
  let {data} = this.state;
  request({
    url:API_BASE_URL +"/user/active/"+this.state.data.id,
    method:'PUT',
    body:JSON.stringify(data)
  }).then(response => {
      if(response.success){
            this._getData();
        Swal.fire(
          'Success!',
          'User has been updated.',
          'success'
        )
      }
  })
}
_block = () => {
  let {data} = this.state;
  request({
    url:API_BASE_URL +"/user/block/"+this.state.data.id,
    method:'PUT',
    body:JSON.stringify(data)
  }).then(response => {
      if(response.success){
            this._getData();
        Swal.fire(
          'Success!',
          'User has been updated.',
          'success'
        )
      }
  })
}
_getDataByName = () => {
  request({
    url:API_BASE_URL +"/user/searchUser?category=0&name="+this.state.search,
    method:'GET',
  }).then(response => {
      if(response.success){
        this.setState({
            listData:response.data,
        })
      }
  })
  
}
handleInput = (event) => {
  this.setState({
      search:event.target.value,
  })
}
  render(){
    let {data,listData,newData,search} = this.state;
    let {phone,description,imageUrl,name,address,email,provider,emailVerified} = data;
      return (
          <div className="container-fluid">
            <h2>User</h2>
            <button className="btn btn-primary btn-lg mb-3 " data-toggle="modal" data-target="#myModal">Add +</button>
            <hr></hr>
            <input type='text' value={search} onChange={this.handleInput} style={{width:'200px',borderRadius:'5px',padding:'5px',border:'none'}}  placeholder='Input name product ...'/>
            <span> </span><button onClick={this._getDataByName} className='btn btn-primary' >Tìm</button><hr></hr>

              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Provider</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                 {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
                    <th scope="row" key={index}>{item.id}</th>
                    <td>{item.email}</td>
                    <td><img src={item.imageUrl}  height={50} width={50}/></td>
                    <td>{item.name}</td>
                    <td>{item.provider}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                    <td>{item.description}</td>
                    <td>{item.emailVerified ? "Kích hoạt" : "Khóa"}</td>
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
                <label for="email">Email :</label>
                <input type="text" class="form-control" name="email" value={newData.email} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
                <label for="email">Password :</label>
                <input type="password" class="form-control" name="password" value={newData.password} onChange={this.handleInputChangeNew}/>
              </div>
              {/* <div class="form-group">
                <label for="email">Role :</label>
                <select name="position" className="custom-select" onChange={this.handleInputChange} 
                value={role} > 
                  <option value="center">Admin</option>
                  <option value="bottom">Center</option>
                </select>
              </div> */}

              <div class="form-group">
                <label for="email">Description :</label>
                <input type="text" class="form-control" name="description" value={newData.description} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
                <label for="email">Address :</label>
                <input type="text" class="form-control" name="address" value={newData.address} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
                <label for="email">Phone :</label>
                <input type="text" class="form-control" name="phone" value={newData.phone} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
                <label for="email">Name :</label>
                <input type="text" class="form-control" name="name" value={newData.name} onChange={this.handleInputChangeNew}/>
              </div>
              <div class="form-group">
              <label for="group1">Chọn ảnh </label><br></br>
                {!_.isEmpty(newData.imageUrl) && <img className='img-product-primary' src={newData.imageUrl} width={200} height={200}/> }
                <br/>
                <div className="input-group" id="group1">
                      <div className="input-group-prepend">
                      <span className="input-group-text" id="addon1"><i className="far fa-file-image"></i></span>
                      </div>
                      <div className="custom-file">
                      <input type="file" className="custom-file-input" id="file1" accept="image/*" 
                       aria-describedby="addon1" onChange={this.handleUploadImagesNew}/>
                      <label className="custom-file-label" for="file1">Chọn ảnh</label>
                      </div>  
                  </div>
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

export default User;