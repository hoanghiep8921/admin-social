import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';

class Product extends Component {
  constructor () {
    super()
    this.state={
      filter:"",
      category:[],
      listData:[],
      data:""
    }
  }

  componentDidMount(){
      this._getData();
      this._getCategory();
  }

  _getCategory = () => {
    request({
      url:API_BASE_URL +"/category/getAll",
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              category:response.data,
          })
        }
    })
  }

  _getData = () => {
    request({
      url:API_BASE_URL +"/product/getAll?page=0&limit=20",
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

  _getByCategory = (id,name) => {
    request({
      url:API_BASE_URL +"/product/category/"+id,
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              listData:response.data,
              filter:name
          })
        }
    })
  }

  _updateBlock = () => {
    console.log(this.state.data);
    request({
      url:API_BASE_URL +"/product/block/"+this.state.data.id,
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              data:response.data,
          })
          Swal.fire('Success', 'You have created new category successfully', 'success');
          const j = window.jQuery.noConflict();
          j('#myModalEdit').modal('hide');
          this._getData();
        }
    })
  }
  _updateAccept = () => {
    request({
      url:API_BASE_URL +"/product/accept/"+this.state.data.id,
      method:'GET',
    }).then(response => {
        if(response.success){
          this.setState({
              data:response.data,
          })
          Swal.fire('Success', 'You have created new category successfully', 'success');
          
        const j = window.jQuery.noConflict();
          j('#myModalEdit').modal('hide');
          this._getData();
        }
    })
  }

_openEdit = (id) => {
      request({
        url:API_BASE_URL +"/product/"+id,
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
        url:API_BASE_URL +"/product/delete/"+id,
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

_getByStatus = (status) => {
  request({
    url:API_BASE_URL +"/product/status/"+status,
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

  render(){
    let {data,listData,filter} = this.state;
    let {name,description,viewer,status,createdAt,price,images,files,video} = data || {};
      return (
          <div className="container-fluid">
            <h2>Product</h2>
            <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter List Product  <span>by <strong>{filter}</strong></span>
  </button><hr></hr>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
   
    <a className="dropdown-item" onClick={this._getData}>All</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Block")}>Block</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Accept")}>Accept</a>
    <a className="dropdown-item" onClick={() => this._getByStatus("Pending")}>Pending</a>
    <div class="dropdown-divider"></div>
    {!_.isEmpty(this.state.category) && this.state.category.map((item,index) => 
      <a key={index} className="dropdown-item" onClick={() => this._getByCategory(item.id,item.name)}>{item.name}</a>)}
  </div>
</div>
 <div className="table-responsive">
              <table className="table table-bordered table-responsive">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">User</th>
                    
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Attachment</th>
                    
                    <th scope="col">Description</th>
                    
                    <th scope="col">Time</th>
                    
                    <th scope="col">View</th>
                    
                    <th scope="col">Status</th>
                    
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                 {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
                    <th scope="row" key={index}>{item.id}</th>
                    
                    <td><img src={item.images}  height={50} width={50}/></td>
                    <td>{item.name}</td>
                    <td><img src={item.user.imageUrl}  height={50} width={50}/>
                    {item.user.name}</td>
                    
                    <td>{item.category.name}</td>
                    <td>{item.price} VNĐ</td>
                    <td>{item.video}<br>
                    </br>{item.files && item.files.split(",")[0]}</td>
                    <td>{item.description}</td>
                    <td>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{item.viewer}</td>
                    <td>{item.status}</td>
                    <td><button className="btn btn-success" onClick={() => this._openEdit(item.id)}><i className='fa fa-edit'></i></button><span> </span>
                    <button className="btn btn-danger" onClick={() => this._delete(item.id)}><i className='fa fa-times'></i> </button></td>
                  </tr>)}
                </tbody>
              </table>
              </div>

            <div className="modal fade" id="myModalEdit" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Detail Product</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              
              <div className="modal-body">
              <div className="form-group">
                <label for="email">Name :</label>
                <input type="text" className="form-control" value={name} />
              </div>
              <div className="form-group">
                <label for="email">Price : VNĐ</label>
                <input type="text" className="form-control" value={price} />
              </div>
              <div className="form-group">
                <label for="email">Attachment :</label>
                <h3>{files && files.split(",")[0]}</h3>
                <h3>{video && video.split(",")[0]}</h3>
              </div>
              <div className="form-group">
                <label for="email">Description :</label>
                <textarea className="form-control" rows="3" id="comment" value={description}></textarea>
              </div>
              <div className="form-group">
                <label for="email">Time:</label>
                <input type="text" className="form-control" value={moment(createdAt).format("DD/MM/YYYY HH:mm")} />
              </div>
              <div className="form-group">
                <label for="email">View :</label>
                <input type="text" className="form-control" value={viewer} />
              </div>
              <div className="form-group">
                <label for="email">Status :</label>
                <input type="text" className="form-control" value={status} />
              </div>
              <div className="form-group">
              <label for="group1">Chọn ảnh đại diện cho sản phẩm</label><br></br>
                  {!_.isEmpty(images) && <img className='img-product-primary' src={images} width={200} height={200}/> }
                <br/>
                </div>
          <button className="btn btn-danger" onClick={this._updateBlock}>Khóa</button>
          
          <button className="btn btn-success" onClick={this._updateAccept}>Duyệt</button>
              </div>
              </div>
            </div>
            </div>
          
          </div>
      )
  }
}

export default Product;