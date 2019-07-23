import React from 'react'
import { Icon, Input, Upload, message } from 'antd'
export default class RegisterAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            previewImage: '/static/images/bg/profileDefault.png'
        }
    }
    upload = (e)=> {
        this.setState({
            previewImage: URL.createObjectURL(e.target.files[0])
        });
    }
    render() {
        return (
            <div>
                <form enctype="multipart/form-data" action="/register" method="POST">
                    <div style={{ backgroundImage: `url(${this.state.previewImage})` }} className="UploadForm">
                        <Input type="file" name="profileImage" onChange={this.upload}/>
                    </div>
                    <Input type={'email'} name={'email'} onChange={this.email} className="createEmail" placeholder="Email"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    <Input type={'username'} name={'username'} onChange={this.username} className="createUsername" placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    <Input type={'password'} name={'password'} onChange={this.password} className="createPassword" placeholder="Password" />
                    <button type="submit" className="create">CREATE ACCOUNT</button>
                </form>
                <style>{`
                .createEmail, .createUsername, .createPassword {
                    width: 100%;
                    margin-bottom: 20px;
                  }
                  .create {
                    width: 160px;
                    height: 35px;
                    background-color: #f26522;
                    border: 0;
                    color: #fff;
                    border-radius: 4px;
                  }
                  .create {
                    cursor:pointer;
                  }
                  .avatar-uploader > .ant-upload {
                    width: 128px;
                    height: 128px;
                    margin: auto;
                    margin-bottom: 26px;
                  }
                  .avatar {
                      width: 100%;
                      height: 128px;
                      overflow:hidden;
                      object-fit:cover;
                  }
                  .UploadForm {
                    width: 160px;
                    height: 160px;
                    margin: auto;
                    display: block;
                    margin-bottom: 30px;
                    border-radius: 100%;
                    background-size: cover;
                  }
                  .UploadForm input {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    opacity: 0;
                    cursor:pointer;
                  }
                `}</style>
            </div>
        );
    }
}