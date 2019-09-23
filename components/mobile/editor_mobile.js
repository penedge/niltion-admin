import React, { PureComponent } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { ImagePicker } from 'antd-mobile';
import { Icon, Select, notification } from 'antd'
const { Option, OptGroup } = Select;
export default class Editor_mobile extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title: [],
            cover: [],
            content: [],
            preview: '/static/images/bg/uploadIcon.svg',
            loading: false,
            multiFile: [],
            tags: [
                {
                    "id": 1,
                    "type": "singapore airlines"
                },
                {
                    "id": 2,
                    "type": "china southern airlines"
                },
                {
                    "id": 3,
                    "type": "cathay pacific"
                },
                {
                    "id": 4,
                    "type": "juneyao airlines"
                },
                {
                    "id": 5,
                    "type": "qantas airways"
                },
                {
                    "id": 6,
                    "type": "hainan airlines"
                },
                {
                    "id": 7,
                    "type": "srilankan airlines"
                },
                {
                    "id": 8,
                    "type": "sichuan airlines"
                },
                {
                    "id": 9,
                    "type": "xiamen airlines"
                },
                {
                    "id": 10,
                    "type": "silk air"
                },
                {
                    "id": 11,
                    "type": "ana airline"
                },
                {
                    "id": 12,
                    "type": "jetstar"
                },
                {
                    "id": 13,
                    "type": "kuwait airways"
                },
                {
                    "id": 14,
                    "type": "vietnam airlines"
                },
                {
                    "id": 15,
                    "type": "philippine airlines"
                },
                {
                    "id": 16,
                    "type": "american airlines"
                },
                {
                    "id": 17,
                    "type": "air india"
                },
                {
                    "id": 18,
                    "type": "nokscoot"
                },
                {
                    "id": 19,
                    "type": "china eastern airlines"
                },
                {
                    "id": 20,
                    "type": "air new zealand"
                },
                {
                    "id": 21,
                    "type": "eva air"
                },
                {
                    "id": 22,
                    "type": "china airlines"
                },
                {
                    "id": 23,
                    "type": "thai airways"
                }
            ],
            selectService: [
                {
                    "id": 1,
                    "serviceType": "sight seeing tours"
                },
                {
                    "id": 2,
                    "serviceType": "package tours thailand"
                },
                {
                    "id": 3,
                    "serviceType": "air tickets"
                }
            ],
            selectedItems: [],
            service: []
        }
    }
    storyName = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    detail = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    coverUpload = (e) => {
        this.setState({
            cover: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0])
        })
    }
    UploadMulti = (e) => {
        this.setState({
            multiFile: e
        })
    }
    hashtag = (selectedItems) => {
        this.setState({
            selectedItems
        })
    };
    serviceAPI = (service) => {
        this.setState({
            service
        })
    }
    saved = (e) => {
        e.preventDefault();
        e.target.reset();
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        const formData = new FormData();
        formData.append('cover', this.state.cover);
        formData.append('image', this.state.cover.name);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('author', getToken.username);
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const times = (date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear());
        formData.append('date', times);
        formData.append('airlines', this.state.selectedItems);
        formData.append('service', this.state.service);
        let newAlbums = [];
        for (let i = 0; i < this.state.multiFile.length; i++) {
            const file = this.state.multiFile[i].file;
            formData.append('multiFile', file);
            const file_name = (this.state.multiFile[i], { photo: file.name });
            //const json = JSON.stringify(file_name);
            newAlbums.push(file_name);
        }
        for (let j = 0; j < newAlbums.length; j++) {
            formData.append('albums', newAlbums[j].photo)
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/blog', formData, config).then((res) => {
            notification.open({
                message: 'congrats',
                description: 'You publishing successful',
                icon: <Icon type="read" />,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1100)
        });
    }
    render() {
        const { multiFile, selectedItems, service } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.saved}>
                    <input className="storyNameMobile" placeholder="Title : " onChange={this.storyName} />
                    <br />
                    <div className="Cover_mobile" style={{ backgroundImage: `url(${this.state.preview})` }}>
                        <input type="file" onChange={this.coverUpload.bind(this)} />
                    </div>
                    <textarea className="content_mobile" placeholder="Add your Content..." onChange={this.detail}></textarea>
                    <ImagePicker
                        files={multiFile}
                        onChange={this.UploadMulti}
                        multiple={this.state.multiFile} className="UploadMulti" />
                    <Select
                        className="selectCategory"
                        mode="multiple"
                        placeholder="Selected Airlines"
                        value={selectedItems}
                        onChange={this.hashtag}
                        showArrow={false}>
                        {
                            Object.values(this.state.tags).map((item) => (
                                <Select.Option key={item.id} value={item.type}>
                                    {item.type}
                                </Select.Option>
                            ))
                        }
                    </Select>
                    <Select mode={'default'} className="list_Service" value={service} onChange={this.serviceAPI} placeholder="Selected Service">
                        <OptGroup label="Service">
                            {
                                Object.values(this.state.selectService).map((item) => (
                                    <Select.Option key={item.id} value={item.serviceType}>
                                        {item.serviceType}
                                    </Select.Option>
                                ))
                            }
                        </OptGroup>
                    </Select>
                    <div className="clearfix">
                        <button type="submit" className="savePost" size={'small'}>Save & Publish</button>
                    </div>
                </form>
                <style>{`
                    @media screen and (min-width: 320px) and (max-width: 420px) {
                        .clearfix {
                            clear:both;
                        }
                        .custom-header {
                            padding: 0;
                            padding-left: 20px;
                            padding-top: 0;
                        }
                        .custom-header {
                            overflow: hidden;
                            height: 60px;
                            background-color: #fff;
                        }
                        .tabIcon {
                            font-size: 18px;
                        }
                        .storyNameMobile {
                            width:100%;
                            text-transform: capitalize;
                            font-weight: bold;
                            color: #000;
                            padding: 20px;
                            font-size: 23px;
                            cursor: pointer;
                        }
                        .Cover_mobile {
                            width: 100%;
                            height: 210px;
                            background-color: #f5f5f5;
                            overflow: hidden;
                            background-size: cover;
                            background-repeat: no-repeat;
                            border-top: 8px solid #fff;
                            border-bottom: 8px solid #fff;
                        }
                        .Cover_mobile input {
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                            cursor: pointer;
                            opacity: 0;
                        }
                        .savePost {
                            width: 150px;
                            height: 38px;
                            font-size: 15px;
                            margin-top: 30px;
                            margin-left: 20px;
                            margin-bottom: 20px;
                            color: #fff;
                            background-color: #3d2e91;
                            border: 0;
                            border-radius: 4px;
                        }
                        .content_mobile {
                            width: 100%;
                            height: 250px;
                            line-height: 23px;
                            overflow-y: auto;
                            border: 0;
                            padding: 20px;
                            padding-bottom: 0;
                        }
                        .UploadMulti {
                            margin-left: 11px;
                        }
                        .selectCategory {
                            width: 100%;
                            padding: 20px;
                            padding-bottom: 0;
                        }
                        .list_Service {
                            width: 90% !important;
                            margin: 20px auto;
                            display: block;
                            margin-bottom: 0;
                        }
                    }
                `}</style>
            </React.Fragment >
        );
    }
}