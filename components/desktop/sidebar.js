import React, { PureComponent } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
// desktop only
import { Icon, Tabs } from 'antd';
const EditorForm = dynamic(import('../desktop/editor'), { ssr: false })
const AdminPost = dynamic(import('../desktop/adminPost'), { ssr: false })
const ProfileSetting = dynamic(import('../desktop/profile_Setting'), { ssr: false })
const MobileOnly = dynamic(import('../mobile/dashboard_mobile'), { ssr: false })
const { TabPane } = Tabs;
export default class SideBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            modal_load: false,
            tabPosition: 'left'
        }
    }
    logOut = () => {
        localStorage.removeItem('auth');
        location.href = "/"
    }
    editFormModal = ()=> {
        this.setState({modal_load: true})
    }
    render() {
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
        });
        const logOutButton = <div><div onClick={this.editFormModal} style={{marginTop:25,cursor:'pointer'}}><span style={{marginRight:10}} className="tabsIcon"><Icon type="setting" /></span>Profile Setting</div><div onClick={this.logOut.bind(this)} className="logOut" style={{ cursor: 'pointer' }}><span className="tabsIcon" style={{ marginRight: 10 }}><IconFont type="icon-tuichu" /></span><span>Leave System</span></div></div>
        return (
            <div>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                </Head>
                <div className="desktopOnly">
                    <div>
                        <div style={{ position: 'relative', marginLeft: 50, marginBottom: 26 }}>
                            <span className="tabsIcon">
                                <Icon type="home" style={{ marginRight: 10 }} />
                            </span>
                            <a style={{ fontWeight: 'bold', color: '#5b5b5b' }} href={`http://niltontravel.com/package`}>Home</a>
                        </div>
                        <Tabs className="sideBar" tabPosition={this.state.tabPosition} tabBarExtraContent={logOutButton}>
                            <TabPane tab={<span><span className="tabsIcon"><Icon type="book" /></span>Overview</span>} key="1">
                                <AdminPost />
                            </TabPane>
                            <TabPane tab={<span><span className="tabsIcon"><Icon type="edit" /></span>Add Content</span>} key="2">
                                <EditorForm />
                            </TabPane>
                        </Tabs>
                        <ProfileSetting setting={this.props.admin} modal_load={this.state.modal_load}/>
                    </div>
                </div>
                <MobileOnly />
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .sideBar {
                        width: 100%;
                        background-color: #fff;
                        float:left;
                    }
                    .tabsIcon {
                        font-size: 21px;
                    }
                    .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-nav .ant-tabs-tab:hover {
                        color:#3d2e91 !important;
                        font-weight: bold;
                    }
                    .logOut {
                        margin-top:20px;
                    }
                    .desktopOnly {
                        display:block;
                    }
                    @media screen and (max-width: 375px) {
                        .desktopOnly {
                            display:none;
                        }
                    }
                `}
                </style>
            </div>
        );
    }
}