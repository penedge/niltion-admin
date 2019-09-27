import React, { PureComponent } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Icon, Tabs, Upload, Select, Card, Col, Row, Skeleton, notification } from 'antd'
const { TabPane } = Tabs;
const { Option, OptGroup } = Select;
export default class Editor extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: [],
            content: [],
            tabPosition: 'top',
            preview: null,
            cover: [],
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
            service: [],
            hashtag: null,
            multiFile: [],
            percent: 0
        }
    }
    title = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    content = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    upload = (info) => {
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
                    preview: URL.createObjectURL(info.file.originFileObj),
                    cover: info.file.originFileObj,
                    percent: info.file.percent
                }),
            );
        }
    }
    // select category
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
    //
    upload_albums = (info) => {
        this.setState({
            multiFile: info.fileList,
            albumsLoad: info.file.percent
        })
    }
    // submit form
    submit = (e) => {
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
        const times = (date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear());
        formData.append('date', times);
        formData.append('airlines', this.state.selectedItems);
        formData.append('service', this.state.service);
        let newAlbums = [];
        for (let i = 0; i < this.state.multiFile.length; i++) {
            const file = this.state.multiFile[i].originFileObj;
            formData.append('multiFile', file);
            const file_name = (this.state.multiFile[i], { photo: this.state.multiFile[i].name });
            //const json = JSON.stringify(file_name);
            newAlbums.push(file_name);
        }
        //formData.append('albums', newAlbums);
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
                description: 'You publishing successful',
                icon: <Icon type="read" />,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1100)
        })

    }
    render() {
        const uploadButton = (
            <div>
                <Icon style={{ marginBottom: 14, fontSize: 33 }} type={this.state.loading ? 'loading' : 'picture'} />
                <div className="ant-upload-text">Add Cover</div>
            </div>
        );
        const albumsButton = (
            <div>
                <Icon style={{ marginBottom: 14, fontSize: 33 }}
                    type="picture" />
                <div className="ant-upload-text">picture</div>
            </div>
        )
        const { preview } = this.state;
        const { selectedItems, multiFile, service } = this.state;
        return (
            <React.Fragment>
                <br />
                <form onSubmit={this.submit}>
                    <input style={{ marginBottom: 21 }} type="text" onChange={this.title} name="title" className="title" placeholder={'Title: '} />
                    <button type="submit" className="publish">Save & Publish</button>
                    <div className="storyForm clearfix">
                        <Tabs tabPosition={this.state.tabPosition}>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}><Icon type="read" />Cover Image</span>} key="1">
                                <div className="mainFormUpload">
                                    <Col span={8}>
                                        <Upload
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            onChange={this.upload}
                                        >
                                            {preview ? <img src={preview} style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                        <Skeleton />
                                    </Col>
                                    <Col span={8}>
                                        <h1 style={{ fontFamily: 'sukhumvit set', fontWeight: 'bold', marginTop: 23 }}>ข้อแนะนำ</h1>
                                        <p>
                                            ไฟล์ที่อัพโหลดต้องถูกต้องลิขสิทธิ์เท่านั้น และ ไฟล์ต้องไม่ติดลิขสิทธิ์ใดๆ จากเว็บอื่นๆ หรือ ไฟล์ที่ละเมิดลิขสิทธิ์มา
                                        </p>
                                        <p>
                                            ตัวอย่างเว็บไซด์แจกไฟล์ภาพถูกต้องลิขสิทธิ์ ฟรี เช่น <a style={{ fontWeight: 'bold' }} href="https://unsplash.com/" target="_blank">https://unsplash.com/</a>
                                        </p>
                                    </Col>
                                </div>
                            </TabPane>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}><Icon type="form" />Write Content</span>} key="2">
                                <textarea type="text" name="content" onChange={this.content} className="content"
                                    placeholder="Add your content...">
                                </textarea>
                            </TabPane>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}><Icon type="plus" />Albums</span>} key="3">
                                <div className="mainFormUpload">
                                    <Upload
                                        multiple={true}
                                        className="UploadAlbums"
                                        action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                                        listType="picture-card"
                                        onChange={this.upload_albums}
                                    >
                                        {multiFile.length >= 8 ? null : albumsButton}
                                    </Upload>
                                </div>
                                <h1 style={{ fontFamily: 'sukhumvit set', fontWeight: 'bold', marginTop: 23 }}>ข้อแนะนำ</h1>
                                <p>
                                    ไฟล์ที่อัพโหลดต้องถูกต้องลิขสิทธิ์เท่านั้น และ ไฟล์ต้องไม่ติดลิขสิทธิ์ใดๆ จากเว็บอื่นๆ หรือ ไฟล์ที่ละเมิดลิขสิทธิ์มา
                                    </p>
                                <p>
                                    ตัวอย่างเว็บไซด์แจกไฟล์ภาพถูกต้องลิขสิทธิ์ ฟรี เช่น <a style={{ fontWeight: 'bold' }} href="https://unsplash.com/" target="_blank">https://unsplash.com/</a>
                                </p>
                                <br />
                            </TabPane>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}>
                                <Icon type="align-left" /> Tags
                            </span>} key="4">
                                <br />
                                <h3>Add Airline</h3>
                                <div className="Category">
                                    <Select
                                        className="selectCategory"
                                        placeholder="Selected Airlines"
                                        mode={'default'}
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
                                    <h3>Add Service</h3>
                                    <Select mode={'default'} className="selectService" value={service} onChange={this.serviceAPI} placeholder="Selected Service">
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
                                </div>
                                <br />
                            </TabPane>
                        </Tabs>

                    </div>
                </form>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    li {
                        text-transform: capitalize;
                    }
                    .title {
                        width: 84%;
                        margin-left: 10px;
                        height: auto;
                        border: 0 !important;
                        font-weight: bold;
                        color:#000 !important;
                        outline: none !important;
                        box-shadow: none !important;
                        overflow: hidden;
                        font-size: 26px;
                        float:left;
                        text-transform: capitalize;
                    }
                    input {
                        color: #000 !important;
                    }
                    .publish {
                        margin-left: 10px;
                        background-color: #3d2e91;
                        border: 0;
                        border-radius: 4px;
                        padding: 10px;
                        outline: none;
                        cursor: pointer;
                        color: #fff;
                        font-weight: bold;
                        margin-top: 0;
                    }
                    .storyForm {
                        margin-top: 13px;
                        padding-right: 30px;
                    }
                    .content {
                        width: 100%;
                        height: 765px !important;
                        overflow-y:auto;
                        border: 0;
                        color: #000;
                        outline: none !important;
                        box-shadow: none !important;
                        padding: 10px !important;
                        font-size: 17px;
                    }
                    .ant-tabs-ink-bar {
                        background-color:transparent;
                    }
                    .mainFormUpload {
                        margin-top: 20px;
                    }
                    .previewUpload {
                        width: 100%;
                        height: 543px;
                        overflow: hidden;
                        background-size: cover;
                    }
                    .avatar-uploader > .ant-upload {
                        width: 260px;
                        height: 180px;
                        margin-bottom: 20px;
                    }
                    .anticon-eye-o {
                        display: none;
                    }
                    .anticon-delete {
                        font-size: 26px !important;
                    }
                    .UploadAlbums > .ant-upload, .ant-upload-list-picture-card .ant-upload-list-item {
                        width: 210px;
                        height: 160px;
                        margin-bottom: 20px;
                    }
                    .Category {
                        margin-bottom: 10px;
                    }
                    .selectCategory, .selectService {
                        width: 300px !important;
                        margin-bottom: 26px;
                        margin-right: 26px;
                        text-transform: capitalize;
                    }
                    .ant-select-dropdown-menu-item {
                        text-transform: capitalize !important;
                    }
                    .imageLoad {
                        width: 200px;
                    }
                 `}
                </style>
            </React.Fragment>
        );
    }
}