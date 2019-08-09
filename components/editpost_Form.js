import React from 'react';
import { Upload, Icon, Select } from 'antd'
import jwt from 'jsonwebtoken'
import axios from 'axios'
export default class Edit_post extends React.Component {
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
            multiFile: []
        };
    }
    componentDidMount() {
        const { title, content } = this.props.edit;
        this.setState({
            title,
            content
        })
    }
    // editCover
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
    hashtag = (selectedItems) => {
        this.setState({
            selectedItems
        })
    };
    upload_albums = (info) => {
        this.setState({
            multiFile: info.fileList
        })
    }
    edit_Title = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    edit_Content = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    saved = (e) => {
        e.preventDefault();
        const decode = localStorage.getItem('auth');
        const getToken = jwt.decode(atob(decode));
        const formData = new FormData();
        formData.append('cover', this.state.cover);
        formData.append('image', this.state.cover.name);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('author', getToken.username);
        formData.append('category', this.state.selectedItems);
        const date = new Date();
        const times = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        formData.append('date', times);
        let newAlbums = [];
        for (let i = 0; i < this.state.multiFile.length; i++) {
            const file = this.state.multiFile[i].originFileObj;
            formData.append('multiFile', file);
            const file_name = (this.state.multiFile[i], { photo: this.state.multiFile[i].name });
            //const json = JSON.stringify(file_name);
            newAlbums.push(file_name);
        }
        //formData.append('albums', newAlbums);
        for (let j = 0; j < newAlbums.length; j++) {
            formData.append('albums', newAlbums[j].photo)
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.put(`/blog/${this.props.id}`, formData, config).then((res) => {
            console.log(res.data);
        })
        
    }
    render() {
        const uploadButton = (
            <div>
                <Icon style={{ marginBottom: 14, fontSize: 43 }} type={this.state.loading ? 'loading' : 'picture'} />
                <div className="ant-upload-text">Add Cover</div>
            </div>
        );
        const albumsButton = (
            <div>
                <Icon style={{ marginBottom: 14, fontSize: 43, marginRight: 20 }}
                    type="picture" />
                <Icon style={{ marginBottom: 14, fontSize: 43 }}
                    type="play-square" />
                <div className="ant-upload-text">picture / video</div>
            </div>
        );
        const { preview } = this.state;
        const { selectedItems, multiFile } = this.state;
        return (
            <div>
                <form onSubmit={this.saved}>
                    <div className="clearfix">
                        <Upload
                            listType="picture-card"
                            className="editCoverImage"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            onChange={this.upload}
                        >
                            {preview ? <img src={preview} style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                        <input className="editStory" value={this.state.title} type="text" onChange={this.edit_Title} />
                        <textarea className="editContent" value={this.state.content} type="text" onChange={this.edit_Content}>
                        </textarea>
                        <br />
                        <Upload
                            multiple={true}
                            className="UploadAlbums"
                            action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                            listType="picture-card"
                            onChange={this.upload_albums}
                        >
                            {multiFile.length >= 8 ? null : albumsButton}
                        </Upload>
                        <br />
                        <Select
                            style={{width: '100%',marginBottom:20}}
                            mode="multiple"
                            placeholder="Selected Stories Category"
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
                        <button type={'submit'}>saved</button>
                    </div>
                </form>
                <style>{`
                    .clearfix {
                        clear:both;
                    }
                    .editStory {
                        width: 100%;
                        margin-bottom: 20px;
                        border: 0;
                        text-transform: capitalize;
                        font-weight: bold;
                        font-size: 20px;
                    }
                    .editContent {
                        font-size: 12px;
                        width: 100%;
                        height: 310px;
                        overflow-y: auto;
                        margin-bottom: 20px;
                        border: 0;
                        line-height: 28px;
                        white-space: normal;
                        word-spacing: normal;
                        outline: none !important;
                    }
                    .editCoverImage > .ant-upload {
                        width: 100%;
                        height: 180px;
                        margin-bottom: 20px
                    }
                 `}</style>
            </div>
        );
    }
}