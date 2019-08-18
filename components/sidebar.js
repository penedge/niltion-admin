import React from 'react'
import { Icon, Menu, Tabs } from 'antd';
import Home_feed from '../components/feed';
import EditorForm from '../components/editor';
import AdminPost from '../components/adminPost';
import ProfileSetting from '../components/profile_Setting'
const { TabPane } = Tabs;
export default class SideBar extends React.Component {
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
        return (
            <div>
                <Tabs className="sideBar" tabPosition={this.state.tabPosition}>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="home" /></span>Home</span>} key="0">
                        <Home_feed/>
                    </TabPane>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="edit" /></span>Add new Story</span>} key="1">
                        <EditorForm />
                    </TabPane>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="book" /></span>Overview</span>} key="2">
                        <AdminPost />
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
                    <TabPane tab={<span onClick={this.logOut.bind(this)}><span style={{ fontSize: 21 }}><IconFont type="icon-tuichu" /></span>Leave system</span>} key="5"></TabPane>
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
                `}</style>
            </div>
        );
    }
}