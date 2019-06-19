import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';
import { Redirect,Link } from 'react-router-dom';
class Article extends Component {
  constructor () {
    super()
    this.state={
      filter:"",
      listData:[],
      search:'',
      category:[],
      categoryId:0
    }
  }

  componentDidMount(){
    this._getData();
    this._getCategory();
  }

  _getData = () => {
    request({
      url: API_BASE_URL + "/article/search?name="+this.createSlug(this.state.search),
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

   createSlug = query => {
    query = query.replace(/^\s+|\s+$/g, ''); // trim
    query = query.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      query = query.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    query = query.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
  
    return query;
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
          url:API_BASE_URL +"/article/delete/"+id,
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

  _getByCategory = (id,name) => {
    this.setState({
      filter:name,
      categoryId:id
    })
  }

  handleInput = (event) => {
    this.setState({
        search:event.target.value,
    })
  }

_getList = () => {
    request({
      url: API_BASE_URL + "/article/search?name="+this.createSlug(this.state.search)+"&category="+this.state.categoryId,
      method: 'GET'
    }).then(response => {
      console.log("data",response);
      this.setState({
        listData:response.data
      })
    }).catch(error => {
      console.log(error);
    });
}

_updateStatus = (id,status) => {
  console.log('id',id);
  request({
    url: API_BASE_URL + "/article/status/"+id+"?status="+status,
    method: 'GET'
  }).then(response => {
    console.log("data",response);
    if(response.success){
      Swal.fire(
        'Updated!',
        'Your article has been updated.',
        'success'
      )
      this._getData();
    }
    
  }).catch(error => {
    console.log(error);
  });
}
  render(){
    let {search,listData,filter} = this.state;
    return (
      <div className="container-fluid">
      <h2>Article</h2>
  
    <div className="table-responsive">
    <div>
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
        <div class="form-group">
            <input type='text' value={search} onChange={this.handleInput} className='form-control' placeholder='Input name article ...'/>
          </div>
        </div>
          
        <div className='col-md-4'><div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category : <strong>{filter}</strong>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={() => this._getByCategory(0,'All')}>All</a>
            {!_.isEmpty(this.state.category) && this.state.category.map((item,index) => 
              <a key={index} className="dropdown-item" onClick={() => this._getByCategory(item.id,item.name)}>{item.name}</a>)}
          </div>
        </div>
        </div>
        <div className='col-md-2'></div>
      </div>
       
        <center><button onClick={this._getList} className='btn btn-primary' >Tìm</button></center>
      </div>
      <br></br>
      <table className="table table-bordered table-responsive">
      <thead>
      <tr>
      <th scope="col">ID</th>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">User</th>
      <th scope="col">Category</th>
      <th scope="col">Created at</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
        {_.isEmpty(listData) && 'Không tìm thấy dữ liệu'}
      {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
    <th scope="row" key={index}>{item.id}</th>

      <td><img src={item.image}  height={50} width={50}/></td>
    <td>{item.title}</td>
    <td>{item.userName}</td>
    <td>{item.categoryId}</td>
    <td>{moment(item.createdAt*1000).format("DD/MM/YYYY HH:mm")}</td>
    <td>{item.status}</td>
   
    {!_.isEmpty(item) && <td><button className="btn btn-success" onClick={() => this._updateStatus(item.id,2)}><i className='fa fa-check-circle'></i></button><span> </span>
    <button className="btn btn-primary" onClick={() => this._updateStatus(item.id,3)}><i className='fa fa-lock'></i></button><span> </span>
      <button className="btn btn-warning">{!_.isUndefined(item.id) && <Link to={`/article/${item.id}`}><i className='fa fa-eye'></i></Link>}</button><span> </span>
    <button className="btn btn-danger" onClick={() => this._delete(item.id)}><i className='fa fa-times'></i> </button></td>}
    </tr>)}
    </tbody>
    </table>
    </div>

      </div>
    )
    }
    }

    export default Article;