import React, {PureComponent} from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { notification, Icon, Layout } from 'antd';
const { Content } = Layout;
const Navbar = dynamic(import('../components/desktop/navbar'), { ssr: false })
const SideBar = dynamic(import('../components/desktop/sidebar'), { ssr: false })
export default class Dashboard extends PureComponent {
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
    getData () {
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
                if (Object.values(res.data).includes(checked_username) === true && Array(decode).includes(checked_password) === true) {
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
    componentDidMount() {
        this.getData()
    }
    componentWillUpdate() {
       setTimeout(()=> {
        this.getData()
       },500)
    }
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Penedge | Dashboard</title>
                    <link type="text/css" rel="stylesheet" href="/static/css/antd/antd.css" />
                    <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit&display=swap"/>
                    <meta name="description" content="penedge admin using to control content in pendege.com" />
                    <meta name="author" content={this.state.admin.username} />
                </Head>
                <Layout className="custom-bg">
                    <Navbar admin={this.state.admin} />
                    <Content className="DashboardContainer">
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <React.Fragment>
                                <SideBar admin={this.state.admin}/>
                            </React.Fragment>
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
                    .desktopOnly {
                        display: block;
                    }
                    @media screen and (min-width: 320px) and (max-width: 420px) {
                        body {
                            background-color: #fff !important;
                        }
                        .DashboardContainer {
                            padding: 0;
                            margin-top: 0;
                            margin-bottom: 0;
                        }
                        .desktopOnly {
                            display: none;
                        }
                    }
                `}
                </style>
            </React.Fragment>
        );
    }
}