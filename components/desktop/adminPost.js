import React, {PureComponent} from 'react';
import { Row, Col, Card, Icon, List, Modal, Input } from 'antd';
import jwt from 'jsonwebtoken';
import axios from 'axios'
import dynamic from 'next/dynamic'
const Edit_post = dynamic(import('../desktop/editpost_Form'),{ssr:false});
export default class AdminPost extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            blog: [],
            albums: [],
            Modal_id: [],
            openModal: false,
            editContent: [],
            search: ''
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
                if (this.state.blog === null || this.state.blog === []) {
                    this.setState({
                        blog: []
                    });
                }
                else {
                    this.setState({
                        blog: res.data
                    });
                }
            }
        })
    }
    componentDidMount() {
        this.data();
    }
    componentWillUpdate() {
        this.data();
    }
    delete = (id) => {
        axios.delete(`/blog/${id}`).then(res => {
        })
    }
    openModal = (id, title, content, albums, image, category) => {
        let editContent = {
            title,
            content,
            albums,
            image,
            category
        }
        this.setState({
            openModal: true,
            Modal_id: id,
            editContent: editContent
        })
    }
    closeModal = (id) => {
        this.setState({
            openModal: false,
            Modal_id: id
        })
    }
    searchBox = (e)=> {
        this.setState({
            search: e.target.value
        })
    }
    render() {
        const setAlbums = (albums) => {
            if (albums === null) {
                <div>
                    
                </div>
            }
            else {
                return (
                    <div className="SetalbumsContainer">
                        <List className="albumsImageContainer" dataSource={albums} renderItem={List => (
                            <li key={List._id}>
                                <img className="albumsImage" src={`/static/images/admin/content/${List}`} alt={List} />
                            </li>
                        )} />
                    </div>
                )
            }
        }
        const find_Blog = this.state.blog.filter((item) => item.title.indexOf(this.state.search) !== -1);
        return (
            <React.Fragment>
                <div className="storiesContainer">
                    <h2><strong>All You Content</strong></h2>
                    <Input className="search" onChange={this.searchBox.bind(this)} placeholder="Search Content..."/>
                    <Row gutter={16}>
                        {
                            !this.state.loading && find_Blog.map((blog) => (
                                <Col md={{ span: 8}} className="itemList">
                                    <Card key={blog._id} title={<span><h3 className="storyName">{blog.title}</h3><span className="author"><Icon type={'user'} /> : <span style={{ textTransform: 'capitalize' }}>{blog.author}</span></span><div className="clearfix"><span style={{ fontSize: 12, fontWeight: 'lighter' }}><Icon type={'history'} /> : {blog.date}</span></div></span>}
                                        actions={[<span onClick={this.openModal.bind(this, blog._id, blog.title, blog.content, blog.albums, blog.image, blog.category)}><Icon type="form" /></span>, <span onClick={this.delete.bind(this, blog._id)}><Icon type="minus-square" /></span>]}>
                                        <div className="cover">
                                            <img src={`/static/images/admin/content/${blog.image}`} alt={blog.image} />
                                        </div>
                                        <p>{blog.content}</p>
                                        {setAlbums(blog.albums)}
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
                                <Edit_post id={this.state.Modal_id} edit={this.state.editContent} />
                            </Modal>
                        }
                    </Row>
                </div>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .itemList p {
                        width: 100%;
                        height: 130px;
                        overflow: hidden;
                        padding: 20px;
                        text-transform: capitalize;
                        line-height: 26px;
                        padding-bottom: 0;
                        font-size: 12px;
                    }
                    .storiesContainer {
                        padding: 30px;
                        padding-top: 16px;
                        padding-left: 0;
                    }
                    .storiesContainer .ant-card-body{
                        padding:0;
                    }
                    .storiesContainer .ant-card-actions {
                        margin: none !important;
                    }
                    .itemList {
                        padding-top: 20px;
                        margin-right: 0;
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
                    .SetalbumsContainer {
                        padding-left: 10px;
                        text-decoration: none;
                        margin-bottom: 20px;
                    }
                    .albumsImage {
                        width: 170px;
                        height: 100px;
                        float: left;
                        object-fit: cover;
                        object-position: center top;
                        overflow: hidden;
                        padding-right: 0;
                        padding-top: 0;
                        padding: 3px;
                    }
                    .albumsList {
                        width: 218px;
                        height: 62px;
                        overflow: auto;
                        margin-bottom: 10px;
                    }
                    .cover {
                        width: 100%;
                        height: 200px;
                        overflow: hidden;
                        margin-bottom: 14px;
                    }
                    .cover img {
                        width: 100%;
                        height: auto;
                        object-fit: cover; 
                        overflow:hidden;
                    }
                    .search {
                        width: 50%;
                        margin-top:10px;
                        margin-bottom:20px;
                    }
                    .albumsImageContainer {
                        width: 100%;
                        height: 100px;
                        overflow-y: auto;
                    }
                    @media screen and (min-width: 320px) and (max-width: 420px) {
                        .search {
                            width: 100%;
                            margin-top:0;
                            margin-bottom:0;
                        }
                        .storiesContainer {
                            margin: 30px;
                            margin-top: 20px;
                            padding: 0;
                        }
                        .albumsImage {
                            width: 148px !important;
                            padding: 3px;
                        }
                        .cover {
                            margin-bottom: 0;
                        }
                        .itemList p {
                            padding-top: 0;
                        }
                    }
                 `}</style>
            </React.Fragment>
        );
    }
}