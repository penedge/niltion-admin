import React, {PureComponent} from 'react'
import { Icon, Menu, Tabs } from 'antd';
import dynamic from 'next/dynamic'
const Home_feed = dynamic(import('../components/feed'), {ssr: false})
const EditorForm = dynamic(import('../components/editor'), {ssr: false})
const AdminPost = dynamic(import('../components/adminPost'), {ssr: false})
const ProfileSetting = dynamic(import('../components/profile_Setting'), {ssr: false})
const { TabPane } = Tabs;
export default class SideBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            tabPosition: 'left'
        }
    }
    logOut = () => {
        localStorage.removeItem('auth');
        location.href = "admin"
    }
    render() {
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
        });
        const logOutButton = <div onClick={this.logOut.bind(this)} className="logOut" style={{cursor:'pointer'}}><span className="tabsIcon" style={{marginRight:10}}><IconFont type="icon-tuichu" /></span><span>Leave System</span></div>
        return (
            <React.Fragment>
                <Tabs className="sideBar" tabPosition={this.state.tabPosition} tabBarExtraContent={logOutButton}>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="home" /></span>Home</span>} key="0">
                        <Home_feed/>
                    </TabPane>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="book" /></span>Overview</span>} key="1">
                        <AdminPost />
                    </TabPane>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="edit" /></span>Add Story</span>} key="2">
                        <EditorForm />
                    </TabPane>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="setting" /></span>Profile Setting</span>} key="3">
                        <ProfileSetting />
                    </TabPane>
                    {
                        /*
                        <TabPane tab={<span><span className="tabsIcon"><Icon type="inbox" /></span>Message inbox</span>} key="4">
                            message
                        </TabPane>
                        */
                    }
                </Tabs>
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
                        color:#f26522 !important;
                        font-weight: bold;
                    }
                    .logOut {
                        margin-top:20px;
                    }
                `}</style>
            </React.Fragment>
        );
    }
}