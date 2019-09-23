import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Layout, Menu, Col, Card, List, Icon } from 'antd'
import { FacebookButton, FacebookCount } from 'react-social'
import jwt from 'jsonwebtoken'
const RelatedPost = dynamic(import('../components/desktop/relatedPost'), {ssr:false});
const { Header } = Layout;
const webURL = 'https://niltontravel.com/';
const Index = ({ url: { query: { id } } }) => {
    const [loading, setLoad] = useState(false);
    const [detail, setDetail] = useState([]);
    const [username, setUsername] = useState([]);
    const [message, setMessage] = useState([]);
    useEffect(() => {
        axios.get(`/detail/${id}`).then((res) => {
            if (res.data === null) {
                setDetail([]);
                setUsername([])
            }
            else {
                setDetail(res.data);
                const decode = localStorage.getItem('auth');
                const getToken = jwt.decode(atob(decode));
                setUsername(getToken.username);
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
    const serviceProvide = (service, airlines) => {
        if (service === undefined || airlines === undefined) {
            return (
                <div>

                </div>
            )
        }
        else {
            return (
                <div>
                    <div style={{ marginTop: 12 }} className="clearfix">
                        <span>Agent : <strong style={{ textTransform: 'capitalize' }}>nilton travel center</strong></span>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <span>Services : <strong style={{ textTransform: 'capitalize' }}>{service}</strong></span>
                    </div>
                    <div style={{ marginTop: 12 }} className="clearfix">
                        <span>Airline : <strong style={{ textTransform: 'capitalize' }}>{airlines}</strong></span>
                    </div>
                </div>
            )
        }
    }
    // sharing to facebook
    const webTitle = Object.values(detail).map(item => item.title);
    const description = Object.values(detail).map(item => item.content);
    const image = Object.values(detail).map(item => item.image);
    const appId = '133758567104408';
    const URL = `${webURL}/detail?id=${id}`
    const IconFont = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });
    return (
        <React.Fragment>
            <Head>
                <title>{webTitle}</title>
                <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.3/antd.min.css"/>
                <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit&display=swap"/>
                <meta property="og:url" content={URL} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={webTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={`/static/images/admin/content/${image}`} />
            </Head>
            <Header className="header custom-header">
                <div className="logo">
                    <a href={'/dashboard'}>
                        {!loading && <img src={`/static/logo/logo-nilton.png`} alt="penedge logo" />}
                    </a>
                </div>
                <Menu
                    theme="white"
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right', borderBottom: 0 }}>
                    <Menu.Item key="1" style={{ borderBottom: 0 }}>
                        <a href={'dashboard'} className="adminName">{username}</a>
                    </Menu.Item>
                </Menu>
            </Header>
            <div>
                {
                    !loading && Object.values(detail).map((post) => (
                        <div>
                            <div md={{ span: 12 }} className="mainContent">
                               <Card style={{padding:0}} bordered={false}>
                                    <img src={`/static/images/admin/content/${post.image}`}/>
                               </Card>
                            </div>
                            <div className="contentContainer clearfix">
                                <div>
                                    <h1>{post.title}</h1>
                                    <h3><Icon type={'history'} /> : {post.date}</h3>
                                    <br />
                                    {setAlbums(post.albums)}
                                    <p>
                                        {post.content}
                                    </p>
                                    {serviceProvide(post.service, post.airlines)}
                                </div>
                                <br/>
                                <br/>
                                <h2><strong>Share content</strong></h2>
                                <div className="facebookShare" style={{ marginTop: 10 }}>
                                    <FacebookButton url={URL} appId={appId}>
                                        <Icon type="facebook"/>
                                    </FacebookButton>
                                </div>
                                <br/>
                                <br/>
                                <RelatedPost/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <style>{`
                .clearfix {
                    clear:both;
                }
                .contentContainer {
                    background-color: #fff;
                    padding: 30px;
                    width: 70%;
                    height: auto;
                    margin: auto;
                    margin-top: 0;
                    display: block;
                    float: none;
                }
                .contentContainer h1 {
                    white-space: pre-line;
                    overflow: hidden;
                    font-size: 3rem;
                    font-weight: bold;
                    text-transform: capitalize;
                }
                .contentContainer h3 {
                    color: #868e96;
                    text-transform: capitalize;
                }
                .contentContainer p {
                    font-size: 1rem;
                    line-height: 40px;
                    white-space: pre-line;
                    font-family: sukhumvit set, kanit !important;
                    font-weight: 400 !important;
                }
                .contentContainer span {
                    font-size: 20px;
                    margin-bottom:14px;
                }
                .mainContent {
                    width: 100%;
                    height: auto;
                    background-color: #fff;
                }
                .mainContent img {
                    width: 100%;
                    height: auto;
                }
                .mainContent .ant-card-body {
                    padding: 0;
                }
                .custom-header {
                    overflow: hidden;
                    height: 80px;
                    background-color: #fff;
                    border-bottom: 1px solid #ded6d6;
                }
                .logo {
                    height: 64px;
                    overflow: hidden;
                    float: left;
                    position: relative;
                    top: 4px;
                    padding: 3px
                }
                .logo img {
                    max-width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: relative
                }
                .adminName {
                    font-size: 18px;
                    text-transform: capitalize;
                    color: #3d2e91 !important;
                    font-weight: 700
                }
                .avatar {
                    display: block;
                }
                .avatar img {
                    width: 66px;
                    height: 66px;
                    padding: 8px;
                    overflow: hidden;
                    margin-top: 6px;
                    border-radius: 100%;
                    object-fit: cover;
                    border: 2px solid #eee;
                }
                .albumsLayout {
                    padding-left: 0;
                    text-decoration: none;
                }
                .albumsImageSet {
                    width: 300px;
                    height: 300px;
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
                    height: auto;
                    overflow-x: hidden;
                    margin-bottom: 20px;
                }
                .facebookShare button {
                    border: 0;
                    outline: none;
                    background-color: transparent;
                }
                .facebookShare i{
                    cursor: pointer;
                    font-size: 40px;
                }
                @media screen and (min-width: 320px) and (max-width: 420px) {
                    .avatar {
                        display: none;
                    }
                    .logo img {
                        height: 45px;
                    }
                    .custom-header {
                        padding: 20px;
                        padding-top: 0;
                    }
                    .backgroundImages {
                        height: 250px;
                    }
                    .contentContainer {
                        width: 100%;
                    }
                    .albumsImageSet {
                        width: 155px;
                        height: 155px;
                    }
                    .contentContainer h1 {
                        font-size: 1.8rem;
                    }
                    .contentContainer span {
                        font-size: 17px;
                        margin-bottom:14px;
                    }
                }
            `}</style>
        </React.Fragment>
    )
}

export default Index;