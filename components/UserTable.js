import React from 'react';
import axios from 'axios';
import { List, Avatar, Col, Icon } from 'antd';
export default class UserTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active_user: []
        }
    }
    componentDidMount() {
        axios.get('/register').then((res) => {
            if (res.data === null) {
                this.setState({
                    active_user: []
                })
            }
            else {
                this.setState({
                    active_user: res.data
                })
            }
        })
    }
    render() {
        const { active_user } = this.state;
        return (
            <div>
                <Col className="UserTable">
                    <strong><h2 style={{fontWeight:'bold'}}><Icon type={'user'} style={{marginRight:10}}/>Admins | {active_user.length}</h2></strong>
                    <List
                        itemLayout="horizontal"
                        dataSource={active_user}
                        renderItem={admin=> (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<img className="proImage" src={`/static/images/admin/profile_image/${admin.image}`} />}
                                    title={<strong><span style={{textTransform:'capitalize'}}>{admin.username}</span></strong>}
                                    description={<div><span>{admin.email}</span><span style={{textTransform:'capitalize',fontWeight:'bold'}} className="clearfix">status : admin</span></div>}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
                <style>{`
                    .proImage {
                        width: 80px;
                        height: 80px;
                        overflow: hidden;
                        border-radius: 100%;
                        object-fit:cover;
                        margin-bottom:20px;
                    }
                    .UserTable {
                        width: 100%;
                        float:left;
                        margin-bottom: 30px;
                    }
                `}</style>
            </div>
        )
    }
}