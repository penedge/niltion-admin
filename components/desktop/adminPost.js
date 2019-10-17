import React, { PureComponent } from 'react';
import { Row, Col, Card, Icon, List, Modal, Input, Button } from 'antd';
import Link from 'next/link'
import jwt from 'jsonwebtoken';
import axios from 'axios'
import dynamic from 'next/dynamic'
const Edit_post = dynamic(import('../desktop/editpost_Form'), { ssr: false });
const UserTable = dynamic(import('../desktop/UserTable'), { ssr: false });
const storageAPI = 'https://nilton.sgp1.digitaloceanspaces.com/content';
export default class AdminPost extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            blog: [],
            albums: [],
            Modal_id: [],
            openModal: false,
            previewBox: false,
            editContent: [],
            imageModal: [],
            content_delete_id: [],
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
    delete = (id) => {
        axios.delete(`/blog/${id}`).then(res => {
        })
        setTimeout(() => {
            location.reload()
        }, 460);
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
    searchBox = (e) => {
        this.setState({
            search: e.target.value
        })
    }
    previewModal = (albums, id) => {
        this.setState({
            imageModal: albums,
            content_delete_id: id
        })
        this.setState({
            previewBox: true
        })
    }
    closed = () => {
        this.setState({
            previewBox: false
        })
    }
    deleteAlbums = (albums) => {
        axios.delete(`/deleteAlbums/${albums}`).then(res => {
            setInterval(() => {
                location.reload()
            }, 400)
        })
    }
    previewBox = () => {
        return (
            <Modal
                visible={this.state.previewBox} footer={null} closable={false}>
                <Icon onClick={this.closed} type="close" className="closeButton" />
                <img width={'100%'} src={`${storageAPI}/${this.state.imageModal}`} />
                <span style={{cursor:'pointer'}} onClick={this.deleteAlbums.bind(this,this.state.imageModal)}>
                    <Icon type={'delete'} style={{ fontSize: 22, marginTop: 20, marginRight: 10 }} />
                    <span>DELETE</span>
                </span>
            </Modal>
        )
    }
    render() {
        const setAlbums = (albums, id) => {
            if (Object.values(albums).length === 0) {
                <div>

                </div>
            }
            else {
                return (
                    <div className="SetalbumsContainer">
                        <List className="albumsImageContainer" dataSource={albums} renderItem={List => (
                            <div>
                                <li onClick={this.previewModal.bind(this, List, id)} key={List._id}>
                                    <img className="albumsImage" src={`${storageAPI}/${List}`} alt={List} />
                                </li>
                                {this.previewBox()}
                            </div>
                        )} />
                    </div>
                )
            }
        }
        const find_Blog = this.state.blog.filter((item) => item.title.indexOf(this.state.search) !== -1);
        return (
            <React.Fragment>
                <div className="storiesContainer">
                    <UserTable />
                    <br />
                    <br />
                    <h2><strong>All You Content</strong></h2>
                    <Input className="search" onChange={this.searchBox.bind(this)} placeholder="Search Content..." />
                    <Row gutter={16}>
                        {
                            !this.state.loading && find_Blog.map((blog) => (
                                <Col md={{ span: 8 }} className="itemList">
                                    <Card key={blog._id} title={<span><Link href={{ pathname: 'detail', query: { id: blog._id } }} className="storyName"><h3 style={{ cursor: 'pointer', textTransform: 'capitalize' }}><strong>{blog.title}</strong></h3></Link><span className="author"><Icon type={'user'} /> : <span style={{ textTransform: 'capitalize' }}>{blog.author}</span></span><div className="clearfix"><span style={{ fontSize: 12, fontWeight: 'lighter' }}><Icon type={'history'} /> : {blog.date}</span></div></span>}
                                        actions={[<span onClick={this.openModal.bind(this, blog._id, blog.title, blog.content, blog.albums, blog.image, blog.category)}><Icon type="form" /></span>, <Button style={{ backgroundColor: 'transparent', border: 0 }} onClick={this.delete.bind(this, blog._id)}><Icon type="minus-square" /></Button>]}>
                                        <div className="cover">
                                            <Link style={{ cursor: 'pointer' }} href={{ pathname: 'detail', query: { id: blog._id } }}><img src={`${storageAPI}/${blog.image}`} alt={blog.image} /></Link>
                                        </div>
                                        {setAlbums(blog.albums, blog._id)}
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
                        font-size: 1.1rem;
                        cursor:pointer;
                        font-family: sukhumvit set, kanit !important;
                        font-weight: 400 !important;
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
                        cursor: pointer;
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
                        cursor: pointer;
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
                    .closeButton {
                        position: absolute;
                        float: right;
                        z-index: 30000;
                        right: 9px;
                        top: 8px;
                        font-size: 14px;
                        cursor: pointer;
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