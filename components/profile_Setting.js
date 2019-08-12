import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Upload, Icon, Collapse } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
const { Panel } = Collapse;
export default class ProfileSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            account: [],
            username: null,
            password: null
        }
    }
    componentDidMount() {
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        axios.get(`/register/${getToken.username}`).then((res) => {
            if (res.data === null) {
                this.setState({
                    account: []
                })
            }
            else {
                this.setState({
                    account: res.data
                })
            }
        })
    }
    newUsername = (e) => {
        this.setState({
            username: e.target.value,
            loading: true
        })
    }
    newPassword = (e) => {
        this.setState({
            password: e.target.value,
            loading: true
        })
    }
    saveChangeUsername = () => {
        if (this.state.loading === false && this.state.username === null) {
            window.location.reload()
        }
        else {
            const decode = localStorage.getItem('auth');
            const getToken = jwt.decode(atob(decode));
            let user = {
                username: this.state.username,
                password: getToken.password
            }
            axios.put(`/changeUsername/${getToken.username}`, user).then((res) => {
                let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
                localStorage.setItem('auth', btoa(tokenId));
                if (res.data) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1300);
                }
            });
        }
    }
    saveChangePassword =()=> {
        if (this.state.loading === false && this.state.password === null) {
            window.location.reload()
        }
        else {
            const decode = localStorage.getItem('auth');
            const getToken = jwt.decode(atob(decode));
            let user = {
                username: getToken.username,
                password: this.state.password
            }
            axios.put(`/changePassword/${getToken.username}`, user).then((res) => {
                let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
                localStorage.setItem('auth', btoa(tokenId));
                if (res.data) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1300);
                }
            });
        }
    }
    render() {
        return (
            <div>
                <div className="ProfileSettingContainer">
                    <h2><strong>Profile Setting</strong></h2>
                    <br />
                    <form>
                        <div className="clearfix">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Collapse className="custom-border" bordered={false} showArrow={true}>
                                        <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10,fontSize:18 }} type={'user'} /><span style={{ textTransform: 'capitalize' }}>Change username</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="1">
                                            <div className="editContainer">
                                                <Input placeholder={'Change your username'} onChange={this.newUsername} style={{ marginBottom: 20 }} />
                                                <button className="save" type="button" onClick={this.saveChangeUsername}>Save Change</button>
                                            </div>
                                        </Panel>
                                    </Collapse>
                                </Col>
                                <Col span={8}>
                                    <Collapse className="custom-border" bordered={false} showArrow={true}>
                                        <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10,fontSize:18 }} type={'lock'} /><span style={{ textTransform: 'capitalize' }}>Change password</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="1">
                                            <div className="editContainer">
                                                <Input placeholder={'Change your password'} onChange={this.newPassword} style={{ marginBottom: 20 }} />
                                                <button className="save" type="button" onClick={this.saveChangePassword}>Save Change</button>
                                            </div>
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </div>
                    </form>
                </div>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .custom-border .ant-collapse-item {
                        border-bottom: 0 !important;
                    }
                    .ProfileSettingContainer {
                        padding: 30px;
                        padding-left: 0;
                    }
                    .customDrop_downIcon {
                        float:right;
                        position:relative;
                        top: 5px;
                    }
                    .editContainer {
                        padding: 30px;
                        background-color: #001528;
                    }
                    .save {
                        font-size: 11.3px;
                        height: 35px;
                        border: 0;
                        border-radius: 4px;
                        background-color: #f26522;
                        color: #fff;
                        cursor:pointer;
                    }
                `}</style>
            </div>
        )
    }
}