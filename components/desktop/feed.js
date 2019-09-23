import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link'
import { Row, Col, Card, Icon, List } from 'antd'
const UserTable = dynamic(import('../desktop/UserTable'), { ssr: false });
const Home_feed = () => {
    const [loading, setLoad] = useState(false);
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        axios.get(`/blog`).then(res => {
            if (res.data === null) {
                setBlog([])
            }
            else {
                setTimeout(() => {
                    setBlog(res.data)
                }, 500)
            }
        });
    })
    const setAlbums = (albums) => {
        if (Object.values(albums).length === 0) {
            <div>
            </div>
        }
        else {
            return (
                <div className="albumsContainer">
                    <List dataSource={albums} renderItem={albumsSet => (
                        <li key={albumsSet._id} className="albumsLayout">
                            <img src={`/static/images/admin/content/${albumsSet}`} className="albumsImageSet lazyload" alt={albumsSet} />
                        </li>
                    )} />
                </div>
            )
        }
    }
    return (
        <React.Fragment>
            <div className="homeContainer">
                <UserTable/>
                <div className="feed_Thumbnail clearfix">
                    <h2><strong><Icon type="read" style={{marginRight:10}}/> Content | {blog.length}</strong></h2>
                    <Row gutter={16}>
                        {
                            !loading && blog.map((post) => (
                                <div>
                                    <Col md={{ span: 8}}>
                                        <Card key={post._id} title={<span><h3 className="storyName">{post.title}</h3><span className="author"><Icon type={'user'} /> : <span style={{ textTransform: 'capitalize',fontSize:13,fontWeight:'lighter' }}>{post.author}</span></span><div className="clearfix"><span style={{ fontSize: 12, fontWeight: 'lighter' }}><Icon type={'history'} /> : {post.date}</span></div></span>}>
                                            <div className="cardBlock">
                                                <div className="thumbnail">
                                                    <img src={`/static/images/admin/content/${post.image}`} alt={post.image} className="lazyload"/>
                                                </div>
                                                <Link href={{pathname:'detail', query: {id: post._id}}}>
                                                    <p>{post.content}</p>
                                                </Link>
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
                .feed_Thumbnail .ant-card {
                    margin-bottom: 32px;
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
                    font-size: 12px;
                    cursor:pointer;
                    font-family: sukhumvit set, kanit !important;
                    font-weight: 400 !important;
                }
                .albumsLayout {
                    padding-left: 10px;
                    text-decoration: none;
                }
                .albumsImageSet {
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
                .albumsContainer{
                    width: 100%;
                    height: 100px;
                    overflow-x: hidden;
                    margin-bottom: 20px;
                }
                .searchBox {
                    width: 50%;
                    margin-bottom: 25px;
                }
                @media screen and (min-width: 320px) and (max-width: 420px) {
                    .searchBox {
                        width: 100%;
                        margin-bottom: 25px;
                    }
                    .feed_Thumbnail p {
                        padding-top: 0;
                    }
                }
            `}</style>
        </React.Fragment>
    )
}
export default Home_feed;