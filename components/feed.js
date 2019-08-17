import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { Breadcrumb, Row, Col, Card, Icon, List } from 'antd';
const Home_feed = () => {
    const [loading, setLoad] = useState(false);
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        axios.get(`/blog/${getToken.username}`).then(res => {
            if (res.data === null) {
                setBlog([])
            }
            else {
                setBlog(res.data)
            }
        });
    })
    const setAlbums = (albums) => {
        if (albums === null) {
            <div>

            </div>
        }
        else {
            return (
                <div className="albumsContainer">
                    <List dataSource={albums} renderItem={albumsSet => (
                        <div className="albumsLayout">
                            <img className="albumsImageSet" src={`/static/images/admin/content/${albumsSet}`} />
                        </div>
                    )} />
                </div>
            )
        }
    }
    return (
        <div>
            <div className="homeContainer">
                <h2>
                    <strong>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <span>Feed</span>
                    </strong>
                </h2>
                <div className="feed_Thumbnail">
                    <Row gutter={16}>
                        {
                            !loading && blog.map((post) => (
                                <div>
                                    <Col span={8}>
                                        <Card key={post._id} title={<span><h3 className="storyName">{post.title}</h3><span className="author"><Icon type={'user'} /> : <span style={{ textTransform: 'capitalize' }}>{post.author}</span></span><div className="clearfix"><span style={{ fontSize: 12, fontWeight: 'lighter' }}><Icon type={'history'} /> : {post.date}</span></div></span>}>
                                            <div className="cardBlock">
                                                <div className="thumbnail">
                                                    <img src={`/static/images/admin/content/${post.image}`} />
                                                </div>
                                                <p>{post.content}</p>
                                                {setAlbums(post.albums)}
                                            </div>
                                        </Card>
                                    </Col>
                                </div>
                            ))
                        }
                    </Row>
                </div>
            </div>
            <style>{`
                .clearfix {
                    clear:both;
                }
                .homeContainer{
                    padding: 30px;
                    padding-top: 16px;
                    padding-left: 0;
                }
                .feed_Thumbnail {
                    margin-top:26px;
                    margin-bottom:20px;
                }
                .feed_Thumbnail .ant-card-body{
                    padding: 0;
                }
                .thumbnail {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                }
                .thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit:cover;
                }
                .storyName {
                    font-size: 21px;
                    font-weight: bold;
                    text-transform: capitalize;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .feed_Thumbnail p {
                    width: 100%;
                    height: 130px;
                    overflow: hidden;
                    padding: 20px;
                    text-transform: capitalize;
                    line-height: 26px;
                    padding-bottom: 0;
                }
                .albumsLayout {
                    padding-left: 17px;
                }
                .albumsImageSet {
                    width: 150px;
                    height: 100px;
                    float: left;
                    object-fit: cover;
                    overflow: hidden;
                    padding-right: 15px;
                    padding-top: 15px;
                }
                .albumsContainer{
                    width: 100%;
                    height: 100px;
                    overflow-x: hidden;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    )
}
export default Home_feed;