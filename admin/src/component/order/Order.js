import React, { Component } from 'react';

class Order extends Component {
    constructor () {
        super()
        this.state={
            data:[]
        }
      }
  
      render(){
          return (
              <div className="container">
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
        <button className="btn btn-primary"><i className='fa fa-times'></i> </button></td>
      </tr>
    </tbody>
  </table>
              </div>
          )
      }
}

export default Order;