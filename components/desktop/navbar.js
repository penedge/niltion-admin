import React, { PureComponent } from 'react'
import { Layout, Menu } from 'antd'
const { Header } = Layout;
const storageAPI = 'https://nilton.sgp1.digitaloceanspaces.com/profile_image/'
export default class Navbar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    render() {
        const { admin } = this.props;
        return (
            <React.Fragment>
                <Header className="header custom-header">
                    <div className="logo">
                        <a href={'/dashboard'}>
                            <img src={`https://nilton.sgp1.digitaloceanspaces.com/static/logo/logo-nilton.png`} alt="penedge logo" />
                        </a>
                    </div>
                    <Menu
                        theme="white"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px', float: 'right', borderBottom: 0 }}>
                        <Menu.Item key="1" style={{ backgroundColor: 'transparent', borderBottom: 0 }}>
                            <span className="adminName">{admin.username}</span>
                        </Menu.Item>
                        <Menu.Item key="2" style={{ backgroundColor: 'transparent', borderBottom: 0 }}>
                            <div className="avatar">
                                <img src={`${storageAPI}${admin.image}`} alt={`profile : ${admin.username}`} />
                            </div>
                        </Menu.Item>
                    </Menu>
                </Header>
                <style>{`
                .custom-header {
                    overflow: hidden;
                    height: 80px;
                    background-color: #fff;
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
                    color: #3d2e91;
                    font-weight: 700
                }
                .avatar {
                    display: block;
                }
                .avatar img {
                    width: 66px !important;
                    height: 66px !important;
                    padding: 8px;
                    overflow: hidden;
                    margin-top: 6px;
                    border-radius: 100%;
                    object-fit: cover;
                    border: 0;
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
                }
            `}</style>
            </React.Fragment>
        );
    }
}