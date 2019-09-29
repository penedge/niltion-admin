import React, {PureComponent} from 'react'
import { Form, Row, Col, Upload, Icon, Collapse } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
const { Panel } = Collapse;
export default class ProfileSetting extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingImage: false,
            account: [],
            username: null,
            password: null,
            profileImage: null,
            fileName: []
        }
    }
    componentDidMount() {
        this.setState({account: this.props.setting})
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
        }
    };
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
    saveChangeUsername = (e) => {
        e.preventDefault();
        e.target.reset();
        if (this.state.loading === false && this.state.username === null) {
            e.target.reset()
        }
        else {
            const decode = localStorage.getItem('auth');
            const getToken = jwt.decode(atob(decode));
            let user = {
                username: this.state.username,
                password: getToken.password
            }
            axios.put(`/changeUsername/${this.state.account._id}`, user).then((res) => {
                let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
                localStorage.setItem('auth', btoa(tokenId));
            });
        }
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
    saveChaneProfile = (e) => {
        e.preventDefault();
        if (this.state.loadingImage === false && this.state.profileImage === null) {
            
        }
        else {
            const formData = new FormData();
            formData.append('profileImage', this.state.profileImage);
            formData.append('image', this.state.fileName);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.put(`/changeProfileImage/${this.state.account._id}`, formData, config).then((res) => {
                
            });
        }
    }
    logOut = () => {
        localStorage.removeItem('auth');
        location.href = "/"
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
            <div>
                <div className="ProfileSettingContainer">
                    <h2><strong>Profile Setting</strong></h2>
                    <br />
                    <form>
                        <div className="clearfix">
                            <Row gutter={16}>
                                <div className="clearfix">
                                    <Col md={{span:8}}>
                                        <Collapse className="custom-border" bordered={false} showArrow={true}>
                                            <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10, fontSize: 18 }} type={'picture'} /><span style={{ textTransform: 'capitalize' }}>Change Profile</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="1">
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
                                                    <button className="save custom-buttonSave" type="submit">Save Change</button>
                                                </Form>
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                    <Col md={{span:8}}>
                                        <Collapse className="custom-border" bordered={false} showArrow={true}>
                                            <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10, fontSize: 18 }} type={'user'} /><span style={{ textTransform: 'capitalize' }}>Change username</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="2">
                                                <form id="ChangeUsername" className="editContainer" onSubmit={this.saveChangeUsername}>
                                                    <input className="ChangeForm" placeholder={'Change your username'} onChange={this.newUsername} style={{ marginBottom: 20 }} />
                                                    <button className="save" type="submit">Save Change</button>
                                                </form>
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                    <Col md={{span:8}}>
                                        <Collapse className="custom-border" bordered={false} showArrow={true}>
                                            <Panel showArrow={false} header={<span><Icon style={{ marginRight: 10, fontSize: 18 }} type={'lock'} /><span style={{ textTransform: 'capitalize' }}>Change password</span><Icon className="customDrop_downIcon" type="caret-down" /></span>} key="3">
                                                <form className="editContainer" onSubmit={this.saveChangePassword}>
                                                    <input className="ChangeForm" type="password" placeholder={'Change your password'} onChange={this.newPassword} style={{ marginBottom: 20 }} />
                                                    <button className="save" type="submit">Save Change</button>
                                                </form>
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </div>
                            </Row>
                        </div>
                    </form>
                    <br/>
                    <button className="mobileOnly" style={{fontSize:19,cursor: 'pointer'}} onClick={this.logOut.bind(this)}><IconFont type="icon-tuichu" style={{marginRight:10}}/> Leave System</button>
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
                        padding: 30px;
                        background-color: #001528;
                    }
                    .custom-buttonSave {
                        margin-top: 15px;
                    }
                    .save {
                        font-size: 11.3px;
                        height: 35px;
                        border: 0;
                        border-radius: 4px;
                        background-color: #3d2e91;
                        color: #fff;
                        cursor:pointer;
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
            </div>
        )
    }
}