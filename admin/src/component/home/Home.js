import React, { Component } from 'react';

import { Link } from "react-router-dom";
import {Bar,Line,Doughnut ,Chart} from 'react-chartjs-2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    
    var chart = this.chart;
    var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

    var fontSize = (height / 120).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    var sum = 0;
    for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {
      sum += chart.config.data.datasets[0].data[i];
    }

    var text = sum,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 1.7;

    ctx.fillText(text, textX, textY);
  }
});
class Home extends Component {
  constructor () {
    super()
    this.state={
      countOrder:'',
      countProduct:'',
      countUser:'',
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
    this._countOrder();
    this._countProduct();
    this._countUser()
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
  _countProduct = () => {
    request({
      url:API_BASE_URL +"/product/count",
      method:'GET'
    }).then(response => {
        this.setState({
            countProduct:response.data
        })
    })
  }
  _countOrder = () => {
    request({
      url:API_BASE_URL +"/order/count",
      method:'GET'
    }).then(response => {
        this.setState({
            countOrder:response.data
        })
    })
  }
  _countUser = () => {
    request({
      url:API_BASE_URL +"/user/count",
      method:'GET'
    }).then(response => {
        this.setState({
            countUser:response.data
        })
    })
  }
  _getStatusOrder = (year) => {
    request({
      url:API_BASE_URL +"/order/countStatus?year="+year,
      method:'GET'
    }).then(response => {
        if(response.success){
          let {dataDougnut} =this.state;
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
          dataDougnut.datasets.push(dataset);
          this.setState({
            dataDougnut,
          })
        }
    })
  }
  _getReportOrder = (year,color) => {
    request({
      url:API_BASE_URL +"/order/getReport?year="+year,
      method:'GET'
    }).then(response => {
        if(response.success){
          let {orderByYear} =this.state;
          let dataset = {
            label: year,
            fill: false,
            lineTension: 0.1,
            backgroundColor: color,
            borderColor: color,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(0,0,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
          dataset.data= response.data;
          orderByYear.datasets.push(dataset);
          let now = new Date();
          if(now.getFullYear() === year){
            this.setState({
              orderByYear,
              dataYearNow:response.data
            })
          }else{
            this.setState({
              orderByYear,
              dataYear:response.data
            })
          }
        }
    })
  }
  
  _getBest = (year) => {
    request({
      url:API_BASE_URL +"/order/getBest?year="+year,
      method:'GET'
    }).then(response => {
        if(response.success){
          let d = new Date() ;
          if(d.getFullYear() === year){
            this.setState({
              bestSaleNow:response.data,
            })
          }else{
            this.setState({
              bestSale:response.data,
            })
          }
          
        }
    })
  }
  render () {
    const {orderByYear,dataYear,dataYearNow,dataDougnut,dataDougnutNow,bestSale,bestSaleNow,countProduct,countOrder,countUser} = this.state;
    const date = new Date();
    if(!_.isEmpty(bestSaleNow))
    console.log(bestSaleNow.buyer);
    return (
      <div className='container-fluid'>
     <section className="content">
       <div className="container-fluid">
         {/* Small boxes (Stat box) */}
         <div className="row">
           <div className="col-lg-3 col-6">
             {/* small box */}
             <div className="small-box bg-info">
               <div className="inner">
                 <h3>{countProduct}</h3>
                 <p>Product</p>
               </div>
               <div className="icon">
                 <i className="ion ion-bag" />
               </div>
               <a href='/products' className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
             </div>
           </div>
           {/* ./col */}
           <div className="col-lg-3 col-6">
             {/* small box */}
             <div className="small-box bg-success">
               <div className="inner">
                 <h3>{countOrder}</h3>
                 <p>Order</p>
               </div>
               <div className="icon">
                 <i className="ion ion-stats-bars" />
               </div>
               <a href="/orders" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
             </div>
           </div>
           {/* ./col */}
           <div className="col-lg-3 col-6">
             {/* small box */}
             <div className="small-box bg-warning">
               <div className="inner">
                 <h3>{countUser}</h3>
                 <p>User</p>
               </div>
               <div className="icon">
                 <i className="ion ion-person-add" />
               </div>
               <a href="/users" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
             </div>
           </div>
           {/* ./col */}
           <div className="col-lg-3 col-6">
             {/* small box */}
             <div className="small-box bg-danger">
               <div className="inner">
                 <h3>650</h3>
                 <p>Arctice</p>
               </div>
               <div className="icon">
                 <i className="ion ion-pie-graph" />
               </div>
               <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right" /></a>
             </div>
           </div>
           {/* ./col */}
         </div>
         </div>
         </section>
         <div className="container">
        
        <h2><center>Thống kê số giao dịch thành công các năm gần đây</center></h2>
        <Line ref="chart" data={orderByYear} />
          <table class="table table-bordered mt-7">
            <thead>
            <tr>
              <th scope="col">January</th>
              <th scope="col">February</th>
              <th scope="col">March</th>
              <th scope="col">April</th>
              <th scope="col">May</th>
              <th scope="col">June</th>
              <th scope="col">July</th>
              <th scope="col">August</th>
              <th scope="col">September</th>
              <th scope="col">October</th>
              <th scope="col">November</th>
              <th scope="col">December</th>
            </tr>
          </thead>
            <tbody>
            <tr>
              {!_.isEmpty(dataYear) && dataYearNow.map((item,index) => <td scope="col">
              { index > date.getMonth() ? "Chưa đến" :
                (dataYearNow[index] - dataYear[index]) > 0 ? `Tăng ${(dataYearNow[index]/dataYear[index]) *100 -100} %` : 100-(dataYearNow[index]/dataYear[index]) *100 == 0 ? `Không thay đổi` :
            `Giảm ${100-(dataYearNow[index]/dataYear[index]) *100} %`}</td>)}
            </tr>
          </tbody>
          </table>
          <h3 className="mt-5"><center>Biểu đồ thống kê trạng thái đơn hàng </center></h3>
          
          <div className='row '>
            
            <div className='col-md-6'>
            <Doughnut
              data={dataDougnut}
           />
           
           <br></br>
            <h5><center>2018</center></h5>
            </div>
            <div className='col-md-6'>
            <Doughnut
          data={dataDougnutNow}
           />
           <br></br>
           <h5><center>2019</center></h5>
            </div>
          </div>
          <hr></hr>
          <br/>
          <div className='row'>
            <div className='col-md-5'>
            
              <h4><center><i>Top người bán nhiều năm 2018</i></center></h4><br />
              <ReactHTMLTableToExcel
                    id="seller-2018"
                    className="btn btn-success float-right mb-2 btn-sm"
                    table="seller2018"
                    filename="seller-2018"
                    sheet="tablexls"
                    buttonText="Export to Excel"/>
            <table className="table table-bordered" id="seller2018">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {!_.isEmpty(bestSale.seller) && bestSale.seller.map((item,index) => <tr key={index}>
                  <td>{index+1}</td>
                  <td>{_.isNull(item.user) ? "Đang cập nhập" : item.user.name}</td>
                  <td><img src ={_.isNull(item.user) ? "https://static.thenounproject.com/png/7638-200.png" : item.user.imageUrl} height={30} width={30}/></td>
                  <td>{_.isNull(item.numberOrder) ? "Đang cập nhập" : item.numberOrder}</td>
                </tr>
                )}
              </tbody>
              </table>
            </div>
            <div className='col-md-2' style={{paddingTop:'300px'}}><center>
              <img src="https://i.ya-webdesign.com/images/compare-vector-6.png" width={100} height={100} /></center></div>
            <div className='col-md-5'>
            <h4><center><i>Top người bán nhiều năm 2019</i></center></h4><br />
            <ReactHTMLTableToExcel
                    id="seller-2019"
                    className="btn btn-success float-right mb-2 btn-sm"
                    table="seller2019"
                    filename="seller-2019"
                    sheet="tablexls"
                    buttonText="Export to Excel"/>
            <table class="table table-bordered" id="seller2019">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {!_.isEmpty(bestSaleNow.seller) && bestSaleNow.seller.map((item,index) => <tr key={index}>
                 
                  <td>{index+1}</td>
                  <td>{_.isNull(item.user) ? "Đang cập nhập" : item.user.name}</td>
                  <td><img src ={_.isNull(item.user) ? "https://static.thenounproject.com/png/7638-200.png" : item.user.imageUrl} height={30} width={30}/></td>
                  <td>{_.isNull(item.numberOrder) ? "Đang cập nhập" : item.numberOrder}</td>
                </tr>
                )}
              </tbody>
              </table>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-5'>
              <h4><center><i>Top người mua nhiều nhiều năm 2018</i></center></h4><br />
              <ReactHTMLTableToExcel
                    id="buyer-2018"
                    className="btn btn-success float-right mb-2 btn-sm"
                    table="buyer2018"
                    filename="buyer-2018"
                    sheet="tablexls"
                    buttonText="Export to Excel"/>
            <table className="table table-bordered" id='buyer2018'>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {!_.isEmpty(bestSale.buyer) && bestSale.buyer.map((item,index) => <tr key={index}>
                  <td>{index+1}</td>
                  <td>{_.isNull(item.user) ? "Đang cập nhập" : item.user.name}</td>
                  <td><img src ={_.isNull(item.user) ? "https://static.thenounproject.com/png/7638-200.png" : item.user.imageUrl} height={30} width={30}/></td>
                  <td>{_.isNull(item.numberOrder) ? "Đang cập nhập" : item.numberOrder}</td>
                </tr>
                )}
              </tbody>
              </table>
            </div>
            <div className='col-md-2' style={{paddingTop:'300px'}}><center>
              <img src="https://i.ya-webdesign.com/images/compare-vector-6.png" width={100} height={100} /></center></div>
            <div className='col-md-5'>
            <h4><center><i>Top người mua nhiều năm 2019</i></center></h4><br />
            <ReactHTMLTableToExcel
                    id="buyer-2019"
                    className="btn btn-success float-right mb-2 btn-sm"
                    table="buyer2019"
                    filename="buyer-2019"
                    sheet="tablexls"
                    buttonText="Export to Excel"/>
            <table class="table table-bordered" id='buyer2019'>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Name</th>
                  <th>Avatar</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {!_.isEmpty(bestSaleNow.buyer) && bestSaleNow.buyer.map((item,index) => <tr key={index}>
                 
                  <td>{index+1}</td>
                  <td>{_.isNull(item.user) ? "Đang cập nhập" : item.user.name}</td>
                  <td><img src ={_.isNull(item.user) ? "https://static.thenounproject.com/png/7638-200.png" : item.user.imageUrl} height={30} width={30}/></td>
                  <td>{_.isNull(item.numberOrder) ? "Đang cập nhập" : item.numberOrder}</td>
                </tr>
                )}
              </tbody>
              </table>
            </div>
          </div>
      </div>
    
         </div>
    );
  }
}

export default Home;