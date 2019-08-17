import React from 'react';
import { Upload, Icon, Select, notification } from 'antd'
import jwt from 'jsonwebtoken'
import axios from 'axios'
export default class Edit_post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: [],
            image: [],
            content: [],
            tabPosition: 'top',
            preview: null,
            cover: undefined,
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
            hashtag: null,
            albums: [],
            multiFile: [],
            selectedItems: []
        };
    }
    componentDidMount() {
        const { title, content, albums, image } = this.props.edit;
        this.setState({
            title, content, albums, image
        });
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
                    loading: true,
                    preview: URL.createObjectURL(info.file.originFileObj),
                    cover: info.file.originFileObj
                }),
            );
            const formData = new FormData();
            formData.append('image', info.file.originFileObj.name);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.put(`/ChangeCoverBlog/${this.props.id}`, formData, config).then((res) => {
                notification.open({
                    message: 'congrats',
                    description: 'Edit Cover Successful',
                    icon: <Icon type="picture" />,
                });
            });
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
        const formData = new FormData();
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
        axios.put(`/ChangeAlbumsBlog/${this.props.id}`, formData, config).then((res) => {
            notification.open({
                message: 'congrats',
                description: 'Edit Albums Successful',
                icon: <Icon type="picture" />,
            });
        });
    }
    edit_Title = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    edit_Content = (e) => {
        this.setState({
            content: e.target.value
        });
    }
    publish = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content
        }
        //Change Title
        axios.put(`/ChangeTitleBlog/${this.props.id}`, data).then((res) => {
            
        });
        //Change Content
        axios.put(`/ChangeContentBlog/${this.props.id}`, data).then((res) => {

        });
        // Change category
        const select = {
            category: (this.state.selectedItems)
        }
        axios.put(`/ChangeCategoryBlog/${this.props.id}`, select).then((res) => {

        });
        notification.open({
            message: 'congrats',
            description: 'Edit you blog successful',
            icon: <Icon type="form" />,
        });
        setTimeout(()=> {
            window.location.reload();
        },1100);
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
                <form onSubmit={this.publish}>
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
                        <input className="editStory" value={this.state.title} placeholder="Story Title" type="text" onChange={this.edit_Title} />
                        <textarea className="editContent" value={this.state.content} placeholder="Add Content here" type="text" onChange={this.edit_Content}>
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
                            style={{ width: '100%', marginBottom: 20 }}
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
                        <button className="closeButton" type="submit">Publish</button>
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
                    }
                 `}</style>
            </div>
        );
    }
}