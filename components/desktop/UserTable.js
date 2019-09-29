import React,{PureComponent} from 'react';
import axios from 'axios';
import { Col, Icon } from 'antd';
const storageAPI = 'https://nilton.sgp1.digitaloceanspaces.com/profile_image/'
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
                    <div className="active_userContainer">
                        {
                            active_user.map((activeUser) => (
                                <div className="userProfile">
                                    <img src={`${storageAPI}${activeUser.image}`} alt={activeUser.image}/>
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
                        background-color: #fff;
                        border-radius: 100%;
                        margin-bottom: 15px;
                        object-fit: cover;
                        object-position: center top;
                        border: 4px solid #3d2e91;
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
                      .UserTable {
                        width: 100%;
                        display: block;
                      }
                      @media screen and (min-width: 320px) and (max-width: 420px) {
                        .UserTable {
                            width: 300px;
                            overflow-y: auto;
                            display: block;
                            margin: auto;
                        }
                        .feed_Thumbnail {
                            margin-top: 26px;
                            margin-bottom: 20px;
                            margin-left: 26px;
                        }
                        .albumsImageSet {
                            width: 148px !important;
                        }
                      }
                `}</style>
            </React.Fragment>
        )
    }
}