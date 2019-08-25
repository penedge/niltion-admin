import React,{PureComponent} from 'react';
import axios from 'axios';
import { List, Avatar, Col, Icon, Carousel, Radio } from 'antd';
export default class UserTable extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            active_user: []
        }
    }
    componentDidMount() {
        axios.get('/activeUser').then((res) => {
            if (res.data === null) {
                this.setState({
                    active_user: []
                })
            }
            else {
                this.setState({
                    active_user: res.data
                })
            }
        })
    }
    render() {
        const { active_user } = this.state;
        return (
            <React.Fragment>
                <Col className="UserTable clearfix">
                    <strong><h2 style={{ fontWeight: 'bold' }}><Icon type={'user'} style={{ marginRight: 10 }} />Admins | {active_user.length}</h2></strong>      
                    <div className="active_userContainer">
                        {
                            active_user.map((activeUser) => (
                                <div className="userProfile">
                                    <img src={`/static/images/admin/profile_image/${activeUser.image}`} alt={activeUser.image}/>
                                    <p style={{ textAlign: 'center' }}><strong>{activeUser.username}</strong></p>
                                </div>
                            ))
                        }
                    </div>
                </Col>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .active_userContainer {
                        width: 100%;
                        height: 100%;
                        margin-top: 20px;
                        margin-bottom: 45px;
                        float: left;
                    }
                    .userProfile {
                        width: 90px;
                        height: 90px;
                        float: left;
                        margin-right: 52px;
                    }
                    .userProfile img {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background-color: red;
                        border-radius: 100%;
                        margin-bottom: 15px;
                        object-fit: cover;
                        object-position: center top;
                        border: 4px solid #f26522;
                    }
                    .ant-carousel .slick-slide {
                        text-align: center;
                        height: 160px;
                        line-height: 160px;
                        background: #364d79;
                        overflow: hidden;
                      }
                      
                      .ant-carousel .slick-slide h3 {
                        color: #fff;
                      }
                `}</style>
            </React.Fragment>
        )
    }
}