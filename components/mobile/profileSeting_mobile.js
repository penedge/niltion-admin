import React, { PureComponent } from 'react'
import { Form, Row, Col, Upload, Icon, Collapse, notification } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
const { Panel } = Collapse;
export default class ProfileSetting_mobile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingImage: false,
            password: null,
            profileImage: null,
            fileName: [],
            closed: []
        }
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    newProfile = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loadingImage: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loadingImage: false,
                    profileImage: info.file.originFileObj,
                    fileName: info.file.name
                }),
            );
            const formData = new FormData();
            formData.append('profileImage', info.file.originFileObj);
            formData.append('image', info.file.originFileObj.name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.put(`/changeProfileImage/${this.props.setting}`, formData, config).then((res) => {
                notification.open({
                    message: 'congrats',
                    description: 'Change profile Successful',
                    icon: <Icon type="picture" />,
                });
            });
        }
    };
    newPassword = (e) => {
        this.setState({
            password: e.target.value,
            loading: true
        })
    }
    saveChangePassword = (e) => {
        e.preventDefault();
        e.target.reset()
        if (this.state.loading === false && this.state.password === null) {
            e.target.reset()
        }
        else {
            const decode = localStorage.getItem('auth');
            const getToken = jwt.decode(atob(decode));
            let user = {
                username: getToken.username,
                password: this.state.password
            }
            axios.put(`/changePassword/${this.state.account._id}`, user).then((res) => {
                let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
                localStorage.setItem('auth', btoa(tokenId));
            });
        }
    }
    logOut = () => {
        localStorage.removeItem('auth');
        location.href = "/"
    }
    saveAll = ()=> {
        location.reload()
    }
    closed = ()=> {
        location.reload()
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loadingImage ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
        });
        return (
            <React.Fragment>
                <div className="ProfileSettingContainer">
                    <h2><strong>Profile Setting</strong></h2>
                    <br />
                    <div>
                        <div className="clearfix">
                            <Row gutter={16}>
                                <div className="clearfix">
                                    <Col md={{ span: 12 }}>
                                        <Form onSubmit={this.saveChaneProfile} form={this.props.form}>
                                            <div className="UploadContainer">
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="ediUploadProfile"
                                                    showUploadList={false}
                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    onChange={this.newProfile}
                                                >
                                                    {imageUrl ? <img src={imageUrl} className="changeProfile" /> : uploadButton}
                                                </Upload>
                                            </div>
                                            {/*<button className="save custom-buttonSave" type="submit">Save Change</button>*/}
                                        </Form>
                                    </Col>
                                    <div className="clearfix">
                                        <Col md={{ span: 12 }}>
                                            <Collapse className="custom-border" bordered={false} showArrow={true}>
                                                <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10, fontSize: 18 }} type={'lock'} /><span style={{ textTransform: 'capitalize' }}>Change password</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="3">
                                                    <form className="editContainer" onSubmit={this.saveChangePassword}>
                                                        <input className="ChangeForm" type="password" placeholder={'Change your password'} onChange={this.newPassword} style={{ marginBottom: 20 }} />
                                                        <button className="save" type="submit">Change Password</button>
                                                    </form>
                                                </Panel>
                                            </Collapse>
                                        </Col>
                                    </div>
                                    <button onClick={this.saveAll} className="saveAll">CONFIRM SAVE SETTING</button>
                                    <button onClick={this.closed} className="close">Cancel</button>
                                </div>
                            </Row>
                        </div>
                    </div>
                    <br />
                    <button className="mobileOnly" style={{ fontSize: 19, cursor: 'pointer',marginLeft:-16 }} onClick={this.logOut.bind(this)}><IconFont type="icon-tuichu" style={{ marginRight: 10 }} /> Leave System</button>
                </div>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .mobileOnly {
                        display:none;
                    }
                    .custom-border .ant-collapse-item {
                        border-bottom: 0 !important;
                    }
                    .ProfileSettingContainer {
                        padding: 30px;
                        padding-left: 0;
                    }
                    .ProfileSettingContainer h2{
                        padding-left: 10px;
                    }
                    .customDrop_downIcon {
                        float:right;
                        position:relative;
                        top: 5px;
                    }
                    .editContainer {
                        padding: 0;
                    }
                    .editContainer input {
                        border: 1px solid;
                    }
                    .ant-modal-close {
                        display:none;
                    }
                    .custom-buttonSave {
                        margin-top: 15px;
                    }
                    .save {
                        font-size: 11.3px;
                        height: 35px;
                        border: 0;
                        border-radius: 4px;
                        background-color: #3c3a3a;
                        color: #fff;
                        cursor:pointer;
                        text-transform: uppercase;
                    }
                    .saveAll {
                        position: relative;
                        margin-left: 0;
                        margin-top: 20px;
                        border-radius: 3px;
                        background-color: #3d2e91;
                        padding: 10px;
                        color: #fff;
                        border: 0;
                        width: 100%;
                        text-transform: capitalize;
                        font-weight: bold;
                        cursor: pointer;
                    }
                    .UploadContainer {
                        margin-bottom: 20px;
                    }
                    .ediUploadProfile{
                        margin-bottom: 20px;
                    }
                    .ediUploadProfile > .ant-upload {
                        width: 140px;
                        height: 140px;
                        overflow:hidden;
                        margin-bottom: 20px;
                    }
                    .changeProfile {
                        width: 100%;
                        height: 140px;
                        object-fit:cover;
                        overflow:hidden;
                    }
                    .ChangeForm {
                        width: 100%;
                        height: 35px;
                        padding: 4px 11px;
                        border-radius: 4px;
                        border: 0;
                    }
                    .close {
                        margin-left: 0;
                        margin-top: 20px;
                        width: 100%;
                        height: 35px;
                        border: 1px solid #ccc;
                        border-radius: 3px;
                        cursor:pointer;
                    }
                    @media screen and (min-width:320px) and (max-width: 420px) {
                        .ProfileSettingContainer {
                            padding: 20px;
                            padding-left: 20px;
                        }
                        .ProfileSettingContainer h2{
                            padding-left: 10px;
                        }
                        .mobileOnly {
                            display:block;
                        }
                    }
                `}</style>
            </React.Fragment>
        )
    }
}