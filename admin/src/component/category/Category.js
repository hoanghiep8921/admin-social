import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
class Category extends Component {
    constructor () {
      super()
      this.state={
          data:[]
      }
    }

    _submit = () => {
      let {data} = this.state;
      request({
        url:API_BASE_URL +"/category/create",
        method:'POST',
        body:JSON.stringify(data)
      }).then(response => {
          if(response.success){
            Swal.fire('Success', 'You have created new category successfully', 'success');
          }else{
            Swal.fire('Oops...', 'Something went wrong!', 'error');
          }
      })
    }
    render(){
        return (
            <div className="container-fluid">
              <h2>Category</h2>
              <button className="btn btn-primary btn-lg mb-3 " data-toggle="modal" data-target="#myModal">Add +</button>
            
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Creator</th>
                      <th scope="col">Ation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Máy giặt</td>
                      <td><img src=''  height={50} width={50}/></td>
                      <td>22-12-2012</td>
                      <td>Jvever.Return</td>
                      <td><button className="btn btn-success"><i className='fa fa-edit'></i></button><span>  </span>
                      <button className="btn btn-danger"><i className='fa fa-times'></i> </button></td>
                    </tr>
                  </tbody>
                  </table>


          <div class="modal fade" id="myModal" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Modal Heading</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" id="email" />
  </div>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd"/>
  </div>
  <div class="form-group form-check">
    <label class="form-check-label">
      <input class="form-check-input" type="checkbox" /> Remember me
    </label>
  </div>
            <button class="btn btn-primary" onClick={this._submit}>Submit</button>
                </div>
                </div>
              </div>
              </div>
              
            </div>
        )
    }
}

export default Category;