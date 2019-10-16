import React, { PureComponent } from 'react'
import { Row, Col, Card, Icon } from 'antd'
import Link from 'next/link'
import axios from 'axios'
const storageAPI = 'https://nilton.sgp1.digitaloceanspaces.com/content';
export default class RelatedPost extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            blog: []
        }
    }
    componentDidMount() {
        axios.get(`/blog`).then(res => {
            if (res.data === null) {
                this.setState({
                    blog: []
                })
            }
            else {
                this.setState({
                    blog: Object.values(res.data).slice(0, 6)
                })
            }
        });
    }
    render() {
        return (
            <div>
                <br/>
                <h2><strong>Other services</strong></h2>
                <div className="feed_Thumbnail clearfix">
                    <Row gutter={16}>
                        {
                            !this.state.loading && this.state.blog.map((post) => (
                                <div>
                                    <Col md={{ span: 8 }}>
                                        <Card key={post._id} title={<span><Link href={{ pathname: 'detail', query: { id: post._id } }}><h3 style={{cursor:'pointer',textTransform:'capitalize'}} className="storyName">{post.title}</h3></Link><span className="author"><Icon type={'user'} /> : <span style={{ textTransform: 'capitalize', fontSize: 13, fontWeight: 'lighter' }}>{post.author}</span></span><div className="clearfix"><span style={{ fontSize: 12, fontWeight: 'lighter' }}><Icon type={'history'} /> : {post.date}</span></div></span>}>
                                            <div className="cardBlock">
                                                <div className="thumbnail">
                                                    <img src={`${storageAPI}/${post.image}`} alt={post.image} className="lazyload" />
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                </div>
                            ))
                        }
                    </Row>
                </div>
                <style>{`
                    .feed_Thumbnail {
                        margin-top:26px;
                        margin-bottom:20px;
                    }
                    .feed_Thumbnail .ant-card-body{
                        padding: 0;
                    }
                    .feed_Thumbnail .ant-card {
                        margin-bottom: 32px;
                    }
                    .thumbnail {
                        width: 100%;
                        height: 370px;
                        overflow: hidden;
                        cursor: pointer;
                    }
                    .thumbnail img {
                        width: 100%;
                        height: 100%;
                        object-fit:cover;
                    }
                    .storyName {
                        color: #000 !important;
                        font-size: 21px;
                        font-weight: bold;
                        text-transform: capitalize !important;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .feed_Thumbnail p {
                        width: 100%;
                        height: 130px;
                        overflow: hidden;
                        padding: 20px;
                        text-transform: capitalize;
                        line-height: 26px !important;
                        padding-bottom: 0;
                        font-size: 1.2rem !important;
                        font-family: sukhumvit set, Kanit !important;
                        cursor: pointer;
                        padding-top: 0 !important;
                    }
                `}
                </style>
            </div>
        )
    }
}