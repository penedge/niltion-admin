import React, { PureComponent } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head';
import { Icon } from 'antd'
import { Tabs } from 'antd-mobile';
import axios from 'axios'
import jwt from 'jsonwebtoken'
const AdminPost = dynamic(import('../desktop/adminPost'), { ssr: false })
const Editor_mobile = dynamic(import('../mobile/editor_mobile'), { ssr: false });
const ProfileSetting_mobile = dynamic(import('../mobile/profileSeting_mobile'), { ssr: false })
export default class MobileOnly extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            id: []
        }
    }
    async getData() {
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        await axios.get(`/register/${getToken.username}`).then(res => {
            if (res.data === null) {
                this.setState({
                    id: []
                })
            }
            else {
                this.setState({
                    id: res.data._id
                })
            }
        })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const tabs = [
            { title: <Icon type="home" className="tabIcon" /> },
            { title: <Icon type="edit" className="tabIcon" /> },
            { title: <Icon type="setting" className="tabIcon" /> }
        ];
        return (
            <React.Fragment>
                <Head>
                    <link type="text/css" rel="stylesheet" href="/static/css/mobile/dashboard_mobile.css" />
                </Head>
                <div className="mobileOnly">
                    <Tabs tabs={tabs} animated={false} useOnPan={false}>
                        <div style={{ height: 'auto', backgroundColor: '#fff' }}>
                            <AdminPost />
                        </div>
                        <div style={{ height: 'auto', backgroundColor: '#fff' }}>
                            <Editor_mobile />
                        </div>
                        <div style={{ height: 'auto', backgroundColor: '#fff' }}>
                            <ProfileSetting_mobile  setting={this.state.id}/>
                        </div>
                    </Tabs>
                </div>
                <style>{`
                    .mobileOnly {
                        display: none;
                    }
                    .tabIcon {
                        font-size: 18px;
                    }
                    @media screen and (min-width: 320px) and (max-width: 420px) {
                        .mobileOnly {
                            display: block;
                        }
                    }
                `}</style>
            </React.Fragment>
        )
    }
}