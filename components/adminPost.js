import React from 'react';
import { Row, Col, Card, Icon, List } from 'antd';
import jwt from 'jsonwebtoken';
import axios from 'axios'
export default class AdminPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            blog: [],
            albums: []
        }
    }
    data() {
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        axios.get(`/blog/${getToken.username}`).then((res) => {
            if (res.data === null) {
                this.setState({
                    blog: [],
                    loading: false
                });
            }
            else {
                this.setState({
                    blog: res.data
                });
            }
        })
    }
    componentDidMount() {
        this.data();
    }
    componentDidUpdate() {
        this.data();
    }
    delete = (id) => {
        axios.delete(`/blog/${id}`).then(res => {
            console.log(res.data);
        })
    }
    render() {
        return (
            <div>
                <div className="storiesContainer">
                    <h3>Your Stories</h3>
                    <Row gutter={16}>
                        {
                            !this.state.loading && this.state.blog.map((blog) => (
                                <Col span={7} className="itemList">
                                    <Card key={blog._id} title={<span><h3 className="storyName">{blog.title}</h3><span className="author">post by : {blog.author}</span><div className="clearfix"><span>Date : {blog.date}</span></div></span>}
                                        actions={[<span><Icon type="form" /></span>, <span onClick={this.delete.bind(this, blog._id)}><Icon type="minus-square" /></span>]}>
                                        <div className="cover">
                                            <img src={`/static/images/admin/content/${blog.image}`} />
                                        </div>
                                        <p>{blog.content}</p>
                                        <List className="albumsList" dataSource={blog.albums} renderItem={List => (
                                            <div>
                                                <img className="albumsImage" src={`/static/images/admin/content/${List}`} />
                                            </div>
                                        )} />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .itemList p {
                        font-size: 12.3px;
                        height: 110px;
                        line-height: 26px;
                        overflow:hidden;
                        overflow-wrap: break-word;
                        text-overflow: ellipsis;
                        text-rendering: optimizeSpeed;
                    }
                    .storiesContainer {
                        padding: 30px;
                        padding-top: 16px;
                    }
                    .storiesContainer .ant-card-bordered{
                        border-radius: 13px;
                    }
                    .storiesContainer .ant-card-actions {
                        margin: none !important;
                    }
                    .itemList {
                        padding-top: 20px;
                        margin-right: 33px;
                        margin-bottom: 30px;
                    }
                    .storyName {
                        font-weight: bold;
                        text-transform: capitalize;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .author {
                        font-size: 12.6px;
                        text-transform: capitalize;
                        font-weight: lighter;
                    }
                    .contentFooter {
                        width: 100%;
                    }
                    .albumsImage {
                        width: 123px;
                        height: 110px;
                        float: left;
                        object-fit: cover;
                        overflow: hidden;
                        padding-right: 9px;
                        padding-bottom: 9px;
                    }
                    .albumsList {
                        height: 54px;
                        overflow: auto;
                        margin-bottom: 10px;
                    }
                    .cover {
                        width: 100%;
                        height: 145px;
                        overflow: hidden;
                        margin-bottom: 14px;
                    }
                    .cover img {
                        width: 100%;
                        height: auto;
                        object-fit: cover; 
                        overflow:hidden;
                    }
                 `}</style>
            </div>
        );
    }
}