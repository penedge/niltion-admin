import React from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import { notification, Icon, Layout, Breadcrumb } from 'antd';
import Navbar from '../components/navbar'
import SideBar from '../components/sidebar'
const { Content } = Layout;
export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            admin: []
        }
    }
    messageAlert() {
        notification.open({
            message: 'Login to system failed',
            description:
                'Your username or password maybe is wrong.',
            icon: <Icon type="warning" style={{ color: 'red' }} />,
        });
    }
    componentDidMount() {
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        if (getToken === null) {
            this.messageAlert();
            setTimeout(() => {
                location.href = "admin"
            }, 1500);
        }
        else {
            axios.get(`/register/${getToken.username}`).then(res => {
                // ถ้ามี user อยู่ในระบบถึงจะเข้าได้
                const checked_username = getToken.username;
                const checked_password = getToken.password;
                const decode = jwt.decode(res.data.password);
                if (Object.values(res.data).includes(checked_username) === true && decode === checked_password === true) {
                    this.setState({
                        admin: res.data
                    })
                }
                else {
                    localStorage.removeItem('auth');
                    this.messageAlert();
                    setTimeout(() => {
                        location.href = "admin"
                    }, 1500);
                }
            });
        }
    }
    render() {
        return (
            <div>
                <Head>
                    <title>Penedge | Dashboard</title>
                    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.3/antd.min.css" />
                </Head>
                <Layout className="custom-bg">
                    <Navbar admin={this.state.admin} />
                    <Content className="DashboardContainer">
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <SideBar />
                        </Layout>
                    </Content>
                </Layout>
                <style>{`
                    body {
                        background-color: #f0f2f5 !important;
                    }
                    .custom-bg {
                        background: transparent;
                    }
                    .DashboardContainer {
                        padding: 0 50px;
                        margin-top: 50px;
                        margin-bottom: 50px;
                    }
                `}</style>
            </div>
        );
    }
}