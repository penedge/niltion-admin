import React from 'react';
import { Row, Col, Card, Icon, List, Modal } from 'antd';
import jwt from 'jsonwebtoken';
import axios from 'axios'
import Edit_post from '../components/editpost_Form'
export default class AdminPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            blog: [],
            albums: [],
            Modal_id: [],
            openModal: false,
            editContent: []
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
    // realtime
    /*componentDidUpdate() {
        this.data();
    }*/
    delete = (id) => {
        axios.delete(`/blog/${id}`).then(res => {
            console.log(res.data);
        })
    }
    openModal = (id, title, content)=> {
        let editContent = {
            title,
            content
        }
        this.setState({
            openModal: true,
            Modal_id: id,
            editContent: editContent
        })
    }
    closeModal = (id)=> {
        this.setState({
            openModal: false,
            Modal_id: id
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
                                    <Card key={blog._id} title={<span><h3 className="storyName">{blog.title}</h3><span className="author"><Icon type={'user'}/> : <span style={{textTransform:'capitalize'}}>{blog.author}</span></span><div className="clearfix"><span style={{fontSize:12,fontWeight:'lighter'}}><Icon type={'history'}/> : {blog.date}</span></div></span>}
                                        actions={[<span onClick={this.openModal.bind(this, blog._id, blog.title, blog.content)}><Icon type="form" /></span>, <span onClick={this.delete.bind(this, blog._id)}><Icon type="minus-square" /></span>]}>
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
                        {
                           <Modal
                                visible={this.state.openModal}
                                onCancel={this.closeModal} 
                                title={'Edit Blog'}
                                footer={null}>
                                <Edit_post id={this.state.Modal_id} edit={this.state.editContent}/>
                            </Modal>
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
                        font-size: 21px;
                        font-weight: bold;
                        text-transform: capitalize;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .author {
                        font-size: 13.2px;
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
                        height: 62px;
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