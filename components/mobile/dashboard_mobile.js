import React, { PureComponent } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head';
import { Icon } from 'antd'
import { Tabs } from 'antd-mobile';
const AdminPost = dynamic(import('../desktop/adminPost'), { ssr: false })
const Editor_mobile = dynamic(import('../mobile/editor_mobile'), { ssr: false });
const ProfileSetting = dynamic(import('../desktop/profile_Setting'), { ssr: false })
export default class MobileOnly extends PureComponent {
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
                            <AdminPost/>
                        </div>
                        <div style={{ height: 'auto', backgroundColor: '#fff' }}>
                            <Editor_mobile />
                        </div>
                        <div style={{ height: 'auto', backgroundColor: '#fff' }}>
                            <ProfileSetting/>
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