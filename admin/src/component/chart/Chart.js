import React, { Component } from 'react';
import {Bar,Line} from 'react-chartjs-2';
const exp= {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
    label: "My First dataset",
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
    }]
}
class Chart extends Component {
    constructor () {
        super()
        this.state={
            data:[]
        }
      }
  
      render(){
          return (
              <div className="container">
              
            <Bar data={exp} />
            < Line
          data={exp}
          height={500}
          width={700}
          />
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

export default Chart;