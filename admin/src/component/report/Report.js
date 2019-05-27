import React, { Component } from 'react';

import {Bar,Line,Doughnut ,Chart} from 'react-chartjs-2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class Report extends Component {
  constructor () {
    super()
    this.state={
      bestSaleNow:{},
      bestSale:{},
      dataDougnutNow: {
        datasets: [],
        labels: [
          'Peding',
          'Accept',
          'Deliver',
          'Done'
        ]
      },
      dataDougnut: {
        datasets: [],
        labels: [
          'Peding',
          'Accept',
          'Deliver',
          'Done'
        ]
      },
      dataYearNow:[],
      dataYear:[],
      orderByYear : {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: []
      }
    }
  }

  componentDidMount(){
    let now = new Date();
    this._getReportOrder(now.getFullYear()-1,'rgba(255,0,0,1)');
    this._getReportOrder(now.getFullYear(),'rgba(75,192,192,1)');
    this._getStatusOrder(2018);
    this._getStatusOrderNow(2019);
    this._getBest(2018);
    this._getBest(2019);
  }
  _getStatusOrderNow = (year) => {
    request({
      url:API_BASE_URL +"/order/countStatus?year="+year,
      method:'GET'
    }).then(response => {
        if(response.success){
          let {dataDougnutNow} =this.state;
          let dataset = {
            data: [],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ],
              hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
              ]
          }
          dataset.data= response.data;
          dataDougnutNow.datasets.push(dataset);
          this.setState({
            dataDougnutNow,
          })
        }
    })
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

export default Report;