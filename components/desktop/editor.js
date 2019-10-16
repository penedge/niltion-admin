import React, { PureComponent } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Icon, Tabs, Upload, Select, Progress, Col, Row, Skeleton, notification, Input } from 'antd'
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
                    "type": "AEROFLOT RUSSIAN AIRLINES"
                },
                {
                    "id": 2,
                    "type": "AIR ASIA"
                },
                {
                    "id": 3,
                    "type": "AIR AUSTRAL"
                },
                {
                    "id": 4,
                    "type": "AIR CHINA"
                },
                {
                    "id": 5,
                    "type": "AIR FRANCE"
                },
                {
                    "id": 6,
                    "type": "AIR INDIA"
                },
                {
                    "id": 7,
                    "type": "AIR KBZ"
                },
                {
                    "id": 8,
                    "type": "AIR MACAU"
                },
                {
                    "id": 9,
                    "type": "AIR MANDALAY"
                },
                {
                    "id": 10,
                    "type": "ALITALIA"
                },
                {
                    "id": 11,
                    "type": "ALL NIPPON AIRWAYS"
                },
                {
                    "id": 12,
                    "type": "ASIANA AIRLINES"
                },
                {
                    "id": 13,
                    "type": "AUSTRIAN AIRLINES"
                },
                {
                    "id": 14,
                    "type": "BANGKOK AIRWAYS"
                },
                {
                    "id": 15,
                    "type": "BIMAN BANGLADESH AIRLINES"
                },
                {
                    "id": 16,
                    "type": "BHUTAN AIRLINES"
                },
                {
                    "id": 17,
                    "type": "BRITISH AIRWAYS"
                },
                {
                    "id": 18,
                    "type": "CAMBODIA ANGKOR AIR"
                },
                {
                    "id": 19,
                    "type": "CEBU PACIFIC AIR"
                },
                {
                    "id": 20,
                    "type": "CATHAY PACIFIC AIRWAYS"
                },
                {
                    "id": 21,
                    "type": "CHINA AIRLINES"
                },
                {
                    "id": 22,
                    "type": "CHINA EASTERN"
                },
                {
                    "id": 23,
                    "type": "CHINA SOUTHERN AIRLINES"
                },
                {
                    "id": 24,
                    "type": "DELTA AIRLINES"
                },
                {
                    "id": 25,
                    "type": "DRUK AIR"
                },
                {
                    "id": 26,
                    "type": "EGYPT AIR"
                },
                {
                    "id": 27,
                    "type": "EL AL ISRAEL AIRLINES"
                },
                {
                    "id": 28,
                    "type": "EMIRATES"
                },
                {
                    "id": 29,
                    "type": "ETIHAD AIRWAYS"
                }
                ,
                {
                    "id": 30,
                    "type": "ETHIOPIAN AIRLINES"
                }
                ,
                {
                    "id": 31,
                    "type": "EVA AIRWAYS"
                },
                {
                    "id": 32,
                    "type": "FINNAIR"
                },
                {
                    "id": 33,
                    "type": "FIREFLY AIRLINES"
                },
                {
                    "id": 34,
                    "type": "GARUDA INDONESIA"
                }
                ,
                {
                    "id": 35,
                    "type": "GOAIR"
                },
                {
                    "id": 36,
                    "type": "GULF AIR"
                },
                {
                    "id": 37,
                    "type": "HAINAN AIRLINES"
                },
                {
                    "id": 38,
                    "type": "HONGKONG AIRLINES"
                },
                {
                    "id": 39,
                    "type": "HONGKONG EXPRESS AIRWAYS"
                },
                {
                    "id": 40,
                    "type": "HUNNU AIR"
                },
                {
                    "id": 41,
                    "type": "INDIGO AIRLINES"
                },
                {
                    "id": 42,
                    "type": "JAPAN AIRLINES"
                },
                {
                    "id": 43,
                    "type": "JC (Cambodia) International Airlines"
                },
                {
                    "id": 44,
                    "type": "JEJU AIR"
                },
                {
                    "id": 45,
                    "type": "JET AIRWAYS"
                },
                {
                    "id": 46,
                    "type": "JETSTAR AIRWAYS"
                },
                {
                    "id": 47,
                    "type": "JINAIR"
                },
                {
                    "id": 48,
                    "type": "KLM ROYAL DUTCH AIRLINES"
                },
                {
                    "id": 49,
                    "type": "KENYA AIRWAYS"
                },
                {
                    "id": 50,
                    "type": "KOREAN AIR"
                },
                {
                    "id": 51,
                    "type": "KUWAIT AIRWAYS"
                },
                {
                    "id": 52,
                    "type": "LAO AIRLINES"
                },
                {
                    "id": 53,
                    "type": "LUFTHANSA GERMAN AIRLINES"
                },
                {
                    "id": 54,
                    "type": "MALAYSIA AIRLINES"
                },
                {
                    "id": 55,
                    "type": "MAHAN AIR"
                },
                {
                    "id": 56,
                    "type": "MONGOLIAN AIRLINES"
                },
                {
                    "id": 57,
                    "type": "NEPAL AIRLINES"
                },
                {
                    "id": 58,
                    "type": "NEW GEN AIRWAYS"
                },
                {
                    "id": 59,
                    "type": "NOK AIR"
                },
                {
                    "id": 60,
                    "type": "NOK SCOOT"
                },
                {
                    "id": 61,
                    "type": "NORWEGIAN AIR"
                },
                {
                    "id": 62,
                    "type": "OMAN AIR"
                },
                {
                    "id": 63,
                    "type": "ORIENT THAI AIRLINES"
                },
                {
                    "id": 64,
                    "type": "PAKISTAN AIRLINES"
                },
                {
                    "id": 65,
                    "type": "PHILIPPINE AIRLINES"
                },
                {
                    "id": 66,
                    "type": "QANTAS AIRWAYS"
                },
                {
                    "id": 67,
                    "type": "QATAR AIRWAYS"
                },
                {
                    "id": 68,
                    "type": "REGENT AIRWAYS"
                },
                {
                    "id": 69,
                    "type": "ROYAL BRUNEI AIRLINES"
                },
                {
                    "id": 70,
                    "type": "ROYAL JORDANIAN"
                },
                {
                    "id": 71,
                    "type": "SCANDINAVIAN AIRLINES"
                },
                {
                    "id": 72,
                    "type": "SCOOT AIRLINES"
                },
                {
                    "id": 73,
                    "type": "SHANGHAI AIRLINES"
                },
                {
                    "id": 74,
                    "type": "SILK AIR"
                },
                {
                    "id": 75,
                    "type": "SINGAPORE AIRLINES"
                },
                {
                    "id": 76,
                    "type": "SPICEJET"
                },
                {
                    "id": 77,
                    "type": "SPRING AIRLINES"
                },
                {
                    "id": 78,
                    "type": "SRI LANKAN AIRLINES"
                },
                {
                    "id": 79,
                    "type": "SWISS INTERNATIONAL AIRLINES LTD"
                },
                {
                    "id": 80,
                    "type": "THAI AIR ASIA"
                },
                {
                    "id": 81,
                    "type": "THAI AIRWAYS INTERNATIONAL"
                },
                {
                    "id": 82,
                    "type": "THAI LION AIR"
                },
                {
                    "id": 83,
                    "type": "MALINDO AIR"
                },
                {
                    "id": 84,
                    "type": "TIGERAIR"
                },
                {
                    "id": 85,
                    "type": "TIGERAIR TAIWAN"
                },
                {
                    "id": 86,
                    "type": "TURKISH AIRLINES"
                },
                {
                    "id": 87,
                    "type": "TURKMENISTAN AIRLINES"
                },
                {
                    "id": 88,
                    "type": "T WAY AIR"
                },
                {
                    "id": 89,
                    "type": "UKRAINE INTERNATIONAL AIRLINES"
                },
                {
                    "id": 90,
                    "type": "UNITED AIRLINES"
                },
                {
                    "id": 91,
                    "type": "UZBEKISTAN AIRWAYS"
                },
                {
                    "id": 92,
                    "type": "VIETJET AIR"
                },
                {
                    "id": 93,
                    "type": "THAI VIETJET AIR"
                },
                {
                    "id": 94,
                    "type": "VIETNAM AIRLINES"
                },
                {
                    "id": 95,
                    "type": "XIAMEN AIRLINES"
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
            otherService: [],
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
    // add other service
    insertOtherService = (e) => {
        this.setState({
            otherService: e.target.value
        });
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
        formData.append('otherService', this.state.otherService);
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
            setTimeout(() => {
                window.location.reload();
            }, 130)
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
            <div>
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
                                            multiple={false}
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
                                    <h3>Add Other Service/Airlines</h3>
                                    <input className="insertOtherService" placeholder={'Other Service/Airlines'} onChange={this.insertOtherService} />
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
                    .insertOtherService {
                        width: 300px;
                        height: 30px;
                        padding: 15px;
                        border-radius: 4px;
                        border: 1px solid #ddd;
                        margin-bottom: 25px;
                    }
                 `}
                </style>
            </div>
        );
    }
}