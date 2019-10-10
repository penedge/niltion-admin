import React, { PureComponent } from 'react'
import { Icon, Input, Upload, notification } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
export default class RegisterAccount extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            email: [],
            username: [],
            password: [],
            profileImage: []
        }
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    profileImage: info.file.originFileObj
                }),
            );
        }
    };
    email = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    username = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    password = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    registerSubmit = (e) => {
        e.preventDefault();
        if ((this.state.username).length >= 8 && this.state.password.length >= 8) {
            const formData = new FormData();
            const { email, username, password, profileImage } = this.state;
            formData.append('email', email);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('profileImage', profileImage);
            formData.append('image', this.state.profileImage.name);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }
            axios.post('/register', formData, config).then((res) => {
                notification['success']({
                    message: 'Create Username & Password success'
                });
                const user = {
                    username: this.state.username,
                    password: this.state.password
                }
                let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
                localStorage.setItem('auth', btoa(tokenId));
                setTimeout(() => {
                    location.href = "dashboard"
                }, 670)
            })
        }
        else {
            notification['error']({
                message: `You can't register`,
                description:
                    'Username and Password must have 8 characters',
            });
        }
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.registerSubmit}>
                    <div>
                        <Upload name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://jsonplaceholder.typicode.com/todos"
                            onChange={this.handleChange}>
                            {imageUrl ? <img src={imageUrl} className="avatar" /> : uploadButton}
                        </Upload>
                    </div>
                    <Input type={'email'} name={'email'} onChange={this.email} className="createEmail" placeholder="Email"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    <Input type={'username'} name={'username'} onChange={this.username} className="createUsername" placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    <Input type={'password'} name={'password'} onChange={this.password} className="createPassword" placeholder="Password" />
                    <p>Username & Password mustn't less than 8 characters.</p>
                    <button type="submit" className="create">CREATE ACCOUNT</button>
                </form>
                <style>{`
                .createEmail, .createUsername, .createPassword {
                    width: 100%;
                    margin-bottom: 26px;
                  }
                  .create, .create:hover {
                    width: 160px;
                    height: 35px;
                    background-color: #3d2e91 !important;
                    border: 0;
                    color: #fff !important;
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
                      overflow: hidden;
                      object-fit:cover;
                  }
                `}</style>
            </React.Fragment>
        );
    }
}