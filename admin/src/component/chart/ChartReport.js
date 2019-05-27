import React, { Component } from 'react';
import {Bar,Line,Doughnut ,Chart, Pie} from 'react-chartjs-2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './ChartReport.scss';
import moment from 'moment';

class ChartReport extends Component {
  constructor () {
    super();
    let date = new Date();
    this.state={
      month:date.getMonth()+1,
      year:date.getFullYear(),
      dataDougnut: {
        datasets: [],
        labels: [
          'Peding',
          'Accept',
          'Deliver',
          'Done'
        ]
      },
      listData:[]
    }
  }

  componentDidMount(){
    this._getReportOrder();
    this._getStatusOrder();
  }
  _getStatusOrder = () => {
    const {year,month} = this.state;
    request({
      url:API_BASE_URL +"/order/countStatusMonth?month="+month+"&year="+year,
      method:'GET'
    }).then(response => {
        if(response.success){
          let dataDougnut = {
            datasets: [],
            labels: [
              'Peding',
              'Accept',
              'Deliver',
              'Done'
            ]
          };
          let dataset = {
            data: [],
            backgroundColor: [
              '#FF432E',
              '#B1EB00',
              '#53BBF4',
              '#FFAC00'
              ],
              hoverBackgroundColor: [
                '#FF432E',
                '#B1EB00',
                '#53BBF4',
                '#FFAC00'
              ]
          }
          dataset.data= response.data;
          dataDougnut.datasets.push(dataset);
          this.setState({
            dataDougnut:dataDougnut
          })
        }
    })
  }
  
  _getReportOrder = () => {
    const {month,year} = this.state;
    request({
      url:API_BASE_URL +"/order/getDetail?year="+year+"&month="+month,
      method:'GET'
    }).then(response => {
        if(response.success){
          this.setState({
            listData:response.data
          })
        }
    })
  }

  _findData = () => {
    this._getReportOrder();
    this._getStatusOrder();
  }

  changeMonth = (event) => {
    this.setState({
      month:event.target.value
    })
  }

  changeYear = (event) => {
    this.setState({
      year:event.target.value
    })
  }
  
  render(){
    const {dataDougnut,year,month,listData} = this.state;
    console.log(listData);
    return (
      <div className="container chart" style={{width:'100%'}}>
        
        <h2><center>Chi tiết số giao dịch theo tháng <input id='month' type="number" value={month} onChange={this.changeMonth} min={1} max={12}/> năm <span> </span> 
        <input id='year' type="number" value={year} min={2015} max={2019} onChange={this.changeYear}/>
        <br></br>
        <lable className='btn btn-primary ml-10' onClick={this._findData}>Tìm</lable></center></h2>
       <hr></hr>
        <div className="row">
            <div className="col-md-4">
                <Pie
                width={300}
                height={300}
                  data={dataDougnut}
              />
            </div>
            <div className="col-md-8">
            <ReactHTMLTableToExcel
                    id="orderDetail"
                    className="btn btn-success float-right mb-2 btn-sm"
                    table="order"
                    filename="order"
                    sheet="tablexls"
                    buttonText="Export to Excel"/>
            <div className="table-responsive">
              <table className="table table-bordered table-responsive" id="order">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">User Buyer</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Deliver At</th>
                    <th scope="col">Status</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Done</th>
                  </tr>
                </thead>
                <tbody>
                 {!_.isEmpty(listData) && listData.map((item,index) =>  <tr>
                    <th scope="row" key={index}>{item.id}</th>
                    
                    <td>{item.product.name}</td>
                    <td>{item.user.name}</td>
                    <td>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{moment(item.delevierAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{item.status}</td>
                    <td>{item.isPrice == 0  ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                    <td>{item.isDone  == 0  ? "Đã giao hàng " : "Chưa giao hàng"}</td>
                  </tr>)}
                </tbody>
              </table>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default ChartReport;