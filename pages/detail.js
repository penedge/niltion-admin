import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Card, List, Icon, Timeline, Divider, Layout, Menu } from 'antd'
const RelatedPost = dynamic(import('../components/desktop/relatedPost'), { ssr: false });
const Footer = dynamic(import('../components/desktop/footer'))
const { Header } = Layout;
const storageAPI = 'https://nilton.sgp1.digitaloceanspaces.com/content';
const Index = ({ url: { query: { id } } }) => {
    const [loading, setLoad] = useState(false);
    const [detail, setDetail] = useState([]);
    const data = async() => await axios.get(`/detail/${id}`);
    useEffect(() => {
        data().then(res => {
            if (res.data === null) {
                setDetail([])
            }
            else {
                setDetail(res.data)
            }
        })
    },[]);
    const openBox = () => {
        setBox(true)
    }
    const closed = () => {
        setBox(false)
    }
    const setAlbums = (albums) => {
        if (Object.values(albums).length === 0) {
            <div>
            </div>
        }
        else {
            return (
                <div className="albumsContainer">
                    <List dataSource={albums} renderItem={albumsSet => (
                        <li onClick={openBox} key={albumsSet._id} className="albumsLayout">
                            <img src={`${storageAPI}/${albumsSet}`} className="albumsImageSet lazyload" alt={albumsSet} />
                        </li>
                    )} />
                </div>
            )
        }
    }
    // sharing to facebook
    const webTitle = Object.values(detail).map(item => item.title);
    const description = Object.values(detail).map(item => item.content);
    const image = Object.values(detail).map(item => item.image);
    const appId = '133758567104408';
    const IconFont = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });
    return (
        <React.Fragment>
            <Head>
                <title>{webTitle}</title>
                <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.3/antd.min.css" />
                <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit&display=swap" />
            </Head>
            <Header className="header custom-header">
                <div className="logo">
                    <a href={'/dashboard'}>
                        {!loading && <img src={`https://nilton.sgp1.digitaloceanspaces.com/static/logo/logo-nilton.png`} alt="penedge logo" />}
                    </a>
                </div>
                <Menu
                    theme="white"
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right', borderBottom: 0 }}>
                    <Menu.Item key="1" style={{ borderBottom: 0 }}>
                        <a href={`/dashboard`} className="adminName">back to admin</a>
                    </Menu.Item>
                </Menu>
            </Header>
            <div>
                {
                    !loading && Object.values(detail).map((post) => (
                        <div>
                            <div md={{ span: 12 }} className="mainContent">
                                <Card style={{ padding: 0 }} bordered={false}>
                                    <img className="bg_images" src={`${storageAPI}/${post.image}`} />
                                </Card>
                            </div>
                            <div className="contentContainer clearfix">
                                <div>
                                    <h1>{post.title}</h1>
                                    <p>
                                        {post.content}
                                    </p>
                                </div>
                                <br />
                                {<RelatedPost />}
                            </div>
                            <div className="serviceInfo">
                                <Divider orientation="left"><h2><strong>Package Info</strong></h2></Divider>
                                <Timeline>
                                    <Timeline.Item style={{ textTransform: 'capitalize' }}><strong>Airline :</strong> {post.airlines}</Timeline.Item>
                                    <Timeline.Item style={{ textTransform: 'capitalize' }}><strong>Service Types :</strong> {post.service}</Timeline.Item>
                                    <Timeline.Item style={{ textTransform: 'capitalize' }}><strong>Date : </strong> {post.date}</Timeline.Item>
                                    <Timeline.Item style={{ textTransform: 'capitalize' }}><strong>Distribution : </strong> {post.author}</Timeline.Item>
                                </Timeline>
                                <br />
                                {setAlbums(post.albums)}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="clearfix">
                <Footer />
            </div>
            <style>{`
                .clearfix {
                    clear:both;
                }
                .contentContainer {
                    padding: 30px;
                    width: 60%;
                    height: auto;
                    margin: auto;
                    margin-top: 0;
                    display: block;
                    float: left;
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
                    font-size: 1.6rem;
                    line-height: 40px;
                    white-space: pre-line;
                    font-family: sukhumvit set, kanit !important;
                    font-weight: 400 !important;
                    padding-top: 13px;
                }
                .contentContainer span {
                    font-size: 20px;
                    margin-bottom:14px;
                    text-transform: capitalize;
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
                    width: 250px;
                    height: 250px;
                    float: left;
                    object-fit: cover;
                    object-position: center top;
                    overflow: hidden;
                    padding-right: 0;
                    padding-top: 0;
                    padding: 3px;
                    cursor: pointer;
                }
                .albumsContainer{
                    width: 100%;
                    height: auto;
                    overflow-x: hidden;
                    margin-bottom: 20px;
                }
                .serviceInfo {
                    padding:25px;
                    width: 40%;
                    height: auto;
                    float:left;
                    border-left: 2.2px dashed #f1f1f1;
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