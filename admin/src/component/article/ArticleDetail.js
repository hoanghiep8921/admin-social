import React, { Component } from 'react';
import Swal from 'sweetalert2';
import {request,API_BASE_URL} from '../../utils/APIUtils';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

class ArticleDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            isCreate:_.isNil(this.props.match.params.id),
            content: '',
            image:'',
            title:'',
            createdAt:'',
            username:'',
            categoryId:'',
            status:'',
        }
    }
    componentDidMount() {
        console.log(this.state.isCreate,this.props.match.params.id)
        if(!this.state.isCreate){
          this._getArticle();
        }
      }
      _getArticle = () => {
        request({
          url: API_BASE_URL + "/article/get/"+this.props.match.params.id,
          method: 'GET'
        }).then(response => {
          console.log("data",response);
          this.setState({
            title:response.data.title,
            content:response.data.content,
            categoryId:response.data.categoryId,
            username:response.data.userName,
            image:response.data.image,
            status:response.data.status,
            createdAt:response.data.createdAt
          })
        }).catch(error => {
          console.log(error);
        });
      }
  
    render(){
        const {title,username,createdAt,content} = this.state;
        return (

            <div class="container">
<hr></hr>
            <div class="row">
                <div class="col-lg-12">
                    <h1><a href="">{title}</a></h1>
                    <p class="lead"><i class="fa fa-user"></i> by <a href="">{username}</a>
                    </p>
                    <hr/>
                    <p><i class="fa fa-calendar"></i> Posted on {moment(createdAt*1000).format('DD/MM/YYYY HH:mm')}</p>
                    <p><i class="fa fa-tags"></i> Tags: <a href=""><span class="badge badge-info">Bootstrap</span></a> <a href=""><span class="badge badge-info">Web</span></a> <a href=""><span class="badge badge-info">CSS</span></a> <a href=""><span class="badge badge-info">HTML</span></a></p>
                        
                    <hr/>
                   
                    <div
                        className='content'
                        dangerouslySetInnerHTML={{__html: content}}>
                        </div>
                </div>
               
    
        </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);