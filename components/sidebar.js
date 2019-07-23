import React from 'react'
import { Icon, Menu, Tabs } from 'antd';
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
        location.href = "/"
    }
    render() {
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
        });
        return (
            <div>
                <Tabs className="sideBar" tabPosition={this.state.tabPosition}>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="book" /></span>Add new Story</span>} key="1">
                        editor
                    </TabPane>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="setting" /></span>Profile Setting</span>} key="2">
                        profile
                    </TabPane>
                    <TabPane tab={<span><span className="tabsIcon"><Icon type="message" /></span>Message</span>} key="3">
                        message
                    </TabPane>
                    <TabPane tab={<span onClick={this.logOut.bind(this)}><span style={{fontSize:21}}><IconFont type="icon-tuichu" /></span>LogOut</span>} key="4"></TabPane>
                </Tabs>
                <style>{`
                    .sideBar {
                        background-color: #fff;
                        float:left;
                    }
                    .clearfix {
                        clear:both;
                    }
                    .tabsIcon {
                        font-size: 18px;
                    }
                `}</style>
            </div>
        );
    }
}