import React, { useState } from 'react'
import { Input, Row, Col, Upload, Icon } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
const ProfileSetting = (props) => {
    const [loading, setLoad] = useState(false);
    // imageUrl use to preview image before upload
    const [imageUrl, setImageUrl] = useState(0);
    // send file image to server
    const [profileImage, setImageFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const upload = (info) => {
        if (info.file.status === 'uploading') {
            setLoad(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setImageUrl(imageUrl),
                setLoad(false),
                setImageFile(info.file.originFileObj),
                setFileName(info.file.name)
            );
        }
    };
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    const Update_email = (e)=> {
        setEmail(e.target.value)
    }
    const Update_username =(e)=> {
        setUsername(e.target.value)
    }
    const Update_password =(e)=> {
        setPassword(e.target.value)
    }
    const savedSetting = (e)=> {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('profileImage', profileImage);
        formData.append('image', fileName);
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const user = {
            username,
            password
        }
        let tokenId = jwt.sign(user, JSON.stringify(username));
        axios.put(`/register/${getToken.username}`, formData, config).then((res) => {
            localStorage.setItem('auth', btoa(tokenId));
            setTimeout(()=> {
                window.location.reload();
            }, 1300)
        });
    }
    return (
        <div>
            <div className="ProfileSettingContainer">
                <h2><strong>Profile Setting</strong></h2>
                <br />
                <form onSubmit={savedSetting}>
                    <div className="clearfix">
                        <div className="Edit_profile_Image_Container">
                            <Upload
                                listType="picture-card"
                                className="editProfileImage"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                onChange={upload}
                            >
                                {imageUrl ? <img src={imageUrl} className="Preview" /> : uploadButton}
                            </Upload>
                        </div>
                        <Row gutter={16}>
                            <Col span={7}>
                                <Input type="text" name="email" onChange={Update_email} className="ChangeEmail" placeholder="Change Email" />
                            </Col>
                            <Col span={7}>
                                <Input type="text" name="username" onChange={Update_username} className="ChangeUsername" placeholder="Change username" />
                            </Col>
                            <Col span={7}>
                                <Input type="password" name="password" onChange={Update_password} className="ChangePassword" placeholder="Change Password" />
                            </Col>
                            <button type="submit" className="savedSetting">
                                Update
                            </button>
                        </Row>
                    </div>
                </form>
            </div>
            <style>{`
                .clearfix {
                    clear:both;
                }
                .ProfileSettingContainer {
                    padding: 30px;
                    padding-left: 0;
                    padding-top: 16px;
                }
                .ChangeUsername, .ChangeEmail, .ChangePassword {
                    width: 100%;
                    margin-bottom: 30px;
                }
                .savedSetting {
                    float: left;
                    clear: both;
                    position: relative;
                    left: 7px;
                    width: 120px;
                    height: 35px;
                    font-size: 12px;
                    color: #fff;
                    border: 0;
                    border-radius: 4px;
                    background-color: #155086;
                    outline: none;
                    cursor: pointer;
                }
                .Edit_profile_Image_Container {
                    display:block;
                    margin-top: 20px;
                    margin-bottom: 33px;
                }
                .editProfileImage > .ant-upload {
                    width: 130px;
                    height: 130px;
                    overflow: hidden;
                }
                .Preview {
                    width: 100%;
                    height: 130px;
                    overflow: hidden;
                    object-fit: cover;
                }
            `}</style>
        </div>
    )
}
export default ProfileSetting;