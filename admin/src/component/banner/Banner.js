import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';

class Banner extends Component {
  constructor () {
    super()
    this.state={
      listData:[],
      data:{
        image:"",
        title:"",
        position:"center",
        description:"",
        id:""
      }
    }
  }

  componentDidMount(){
      this._getData();
  }

  _getData = () => {
    request({
      url:API_BASE_URL +"/banner/getAll",
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
    let {data} = this.state;
    console.log("submit",data);
    request({
      url:API_BASE_URL +"/banner/create",
      method:'POST',
      body:JSON.stringify(data)
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
                  image : image.data
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

_openEdit = (id) => {
      request({
        url:API_BASE_URL +"/banner/get/"+id,
        method:'GET',
      }).then(response => {
          if(response.success){
            let {data} = this.state;
            data.image = response.data.image;
            data.title = response.data.title ;
            data.position =response.data.position ;
            data.description =response.data.description ;
            data.id = response.data.id;
            this.setState({
              data,
            })
          
        const j = window.jQuery.noConflict();
        j('#myModalEdit').modal('show');
          }
      })
}

_update = () => {
  let {data} = this.state;
  request({
    url:API_BASE_URL +"/banner/update/"+this.state.data.id,
    method:'PUT',
    body:JSON.stringify(data)
  }).then(response => {
      if(response.success){
        let {data} = this.state;
            data.image = response.data.image;
            data.title = response.data.title ;
            data.position =response.data.position ;
            data.description =response.data.description ;
            data.id = response.data.id;
            this.setState({
              data,
            })
            this._getData();
        Swal.fire(
          'Updated!',
          'Your banner has been updated.',
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
        url:API_BASE_URL +"/banner/delete/"+id,
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

  render(){
    let {data,listData} = this.state;
    let {image,description,position,title} = data;
      return (
          <div className="container-fluid">
            <h2>Banner</h2>
            <button className="btn btn-primary btn-lg mb-3 " data-toggle="modal" data-target="#myModal">Add +</button>
          
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Position</th>
                    <th scope="col">Description</th>
                    <th scope="col">Ation</th>
                  </tr>
                </thead>
                <tbody>
                 {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
                    <th scope="row" key={index}>{item.id}</th>
                    <td>{item.title}</td>
                    <td><img src={item.image}  height={50} width={50}/></td>
                    <td>{item.position}</td>
                    <td>{item.description}</td>
                    <td><button className="btn btn-success" onClick={() => this._openEdit(item.id)}><i className='fa fa-edit'></i></button><span> </span>
                    <button className="btn btn-danger" onClick={() => this._delete(item.id)}><i className='fa fa-times'></i> </button></td>
                  </tr>)}
                </tbody>
                </table>


        <div class="modal fade" id="myModal" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Create Banner</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div class="modal-body">
              <div class="form-group">
                <label for="email">Title :</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.handleInputChange}/>
              </div>
              <div class="form-group">
                <label for="email">Position :</label>
                <select name="position" className="custom-select" onChange={this.handleInputChange} 
                value={position} > 
                  <option value="center">Center</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
              <div class="form-group">
                <label for="email">Description :</label>
                <input type="text" class="form-control" name="description" value={description} onChange={this.handleInputChange}/>
              </div>
              <div class="form-group">
              <label for="group1">Chọn ảnh </label><br></br>
                                        {!_.isEmpty(image) && <img className='img-product-primary' src={image} width={200} height={200}/> }
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
          <button class="btn btn-primary" onClick={this._submit}>Submit</button>
              </div>
              </div>
            </div>
            </div>
            

            <div class="modal fade" id="myModalEdit" >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Detail Banner</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div class="modal-body">
              <div class="form-group">
                <label for="email">Title :</label>
                <input type="text" class="form-control" name="title" onChange={this.handleInputChange} value={title} />
              </div>
              <div class="form-group">
                <label for="email">Description :</label>
                <input type="text" class="form-control" name="description" onChange={this.handleInputChange} value={description} />
              </div>
              
              <div class="form-group">
                <label for="email">Position :</label>
                <select name="position" className="custom-select" onChange={this.handleInputChange} value={data.position} >
                  
                <option value="center">Center</option>
                  <option value="bottom">Bottom</option>
                        </select></div>

              <div class="form-group">
              <label for="group1">Chọn ảnh đại diện cho sản phẩm</label><br></br>
                  {!_.isEmpty(image) && <img className='img-product-primary' src={image} width={200} height={200}/> }
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
          <button class="btn btn-primary" onClick={this._update}>Submit</button>
              </div>
              </div>
            </div>
            </div>
          
          </div>
      )
  }
}

export default Banner;