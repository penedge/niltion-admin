import React from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Input, Layout, Icon, Tabs, Upload, message, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
const { TabPane } = Tabs;
const { Option } = Select;
export default class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: [],
            textStyle: '',
            content: [],
            tabPosition: 'top',
            preview: null,
            cover: [],
            tags: [
                {
                    "id": 1,
                    "type": "adventure"
                },
                {
                    "id": 2,
                    "type": "action"
                },
                {
                    "id": 3,
                    "type": "fiction"
                },
                {
                    "id": 4,
                    "type": "news"
                },
                {
                    "id": 5,
                    "type": "romantic"
                },
                {
                    "id": 6,
                    "type": "fantasy"
                },
                {
                    "id": 7,
                    "type": "detective"
                },
                {
                    "id": 8,
                    "type": "movies"
                },
                {
                    "id": 9,
                    "type": "technology"
                },
                {
                    "id": 10,
                    "type": "animation"
                },
                {
                    "id": 11,
                    "type": "cartoon"
                },
                {
                    "id": 12,
                    "type": "games"
                },
                {
                    "id": 13,
                    "type": "travel"
                },
                {
                    "id": 14,
                    "type": "food"
                },
                {
                    "id": 15,
                    "type": "erotic"
                }
            ],
            selectedItems: [],
            hashtag: null,
            category: []
        }
    }
    title = (e) => {
        this.setState({
            title: e.target.value,
            textStyle: 'bold'
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
                    cover: info.file.originFileObj
                }),
            );
        }
    }
    // select category
    category = (category)=> {
        this.setState({
            category
        })
    }
    // select hashtag
    hashtag = (selectedItems) => {
        this.setState({
            selectedItems
        })
    };
    // submit form
    submit = (e) => {
        e.preventDefault();
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        const formData = new FormData();
        formData.append('cover', this.state.cover);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('author', getToken.username);
        formData.append('tags', this.state.selectedItems);
        formData.append('category', this.state.category);
        axios.post('/blog', formData, config).then((res) => {
            console.log(res.data);
        })
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

    }
    render() {
        const uploadButton = (
            <div>
                <Icon style={{ marginBottom: 14, fontSize: 33 }} type={this.state.loading ? 'loading' : 'picture'} />
                <div className="ant-upload-text">Add Cover</div>
            </div>
        );
        const { preview } = this.state;
        const { selectedItems } = this.state;
        return (
            <div>
                <br />
                <form onSubmit={this.submit}>
                    <input style={{ marginBottom: 21 }} type="text" onChange={this.title} name="title" className="title" placeholder={'Story Title: '} />
                    <button type="submit" className="publish">Save & Publish</button>
                    <div className="storyForm clearfix">
                        <Tabs tabPosition={this.state.tabPosition}>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}><Icon type="read" />Story Cover Image</span>} key="1">
                                <div className="mainFormUpload">
                                    <Upload
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        onChange={this.upload}
                                    >
                                        {preview ? <img src={preview} style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                    <h1 style={{ fontFamily: 'sukhumvit set', fontWeight: 'bold', marginTop: 23 }}>ข้อแนะนำ</h1>
                                    <p>
                                        ไฟล์ที่อัพโหลดต้องถูกต้องลิขสิทธิ์เท่านั้น และ ไฟล์ต้องไม่ติดลิขสิทธิ์ใดๆ จากเว็บอื่นๆ หรือ ไฟล์ที่ละเมิดลิขสิทธิ์มา
                                    </p>
                                    <p>
                                        ตัวอย่างเว็บไซด์แจกไฟล์ภาพถูกต้องลิขสิทธิ์ ฟรี เช่น <a style={{ fontWeight: 'bold' }} href="https://unsplash.com/" target="_blank">https://unsplash.com/</a>
                                    </p>
                                    <br />

                                </div>
                            </TabPane>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}><Icon type="form" />Write Story</span>} key="2">
                                <textarea type="text" name="content" onChange={this.content} className="content"
                                    placeholder="Add your story...">
                                </textarea>
                            </TabPane>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}>
                                <Icon type="align-left" /> Tags
                            </span>} key="3">
                                <br />
                                <h3>Select Category</h3>
                                <br />
                                <div className="clearfix">
                                    <Select
                                        placeholder="Story Category"
                                        style={{ width: 150 }}
                                        showArrow={false}
                                        onChange={this.category}
                                    >
                                        {
                                            this.state.tags.map((category) => (
                                                <Option key={category.id} value={category.type}>
                                                    {category.type}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                <br />
                                <h3>Select Tags</h3>
                                <br />
                                <div className="Category">
                                    <Select
                                        className="selectCategory"
                                        mode="multiple"
                                        placeholder="Selected Stories Tags"
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
                                </div>
                                <br />
                            </TabPane>
                            <TabPane tab={<span style={{ fontSize: 18, marginRight: 13 }}><Icon type="plus" />Photo / Video albums</span>} key="4">
                                4
                            </TabPane>
                        </Tabs>

                    </div>
                </form>
                <style>{`
                    .clearfix {
                        clear:both;
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
                        background-color: #f26522;
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
                        height: 800px !important;
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
                        margin: 20px;
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
                    .Category {
                        margin-bottom: 10px;
                    }
                    .selectCategory {
                        width: 76% !important;
                        margin-bottom: 26px;
                    }
                    .ant-select-dropdown-menu-item {
                        text-transform: capitalize !important;
                    }
                 `}
                </style>
            </div>
        );
    }
}