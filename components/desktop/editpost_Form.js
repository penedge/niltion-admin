import React, { PureComponent } from 'react';
import { Upload, Icon, Select, notification } from 'antd'
import axios from 'axios'
const { Option, OptGroup } = Select;
export default class Edit_post extends PureComponent {
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
            hashtag: null,
            albums: [],
            multiFile: [],
            selectedItems: [],
            service: []
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
        formData.append('cover', info.file.originFileObj);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.put(`/ChangeCoverBlog/${this.props.id}`, formData, config).then((res) => {
            notification.open({
                message: 'congrats',
                description: 'saved Successful',
                icon: <Icon type="picture" />,
            });
        });
    }
    hashtag = (selectedItems) => {
        this.setState({
            selectedItems
        })
    };
    serviceAPI = (service)=> {
        this.setState({
            service
        })
    }
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
        for (let j = 0; j < this.state.multiFile.length; j++) {
            var { percent } = this.state.multiFile[j];
        }
        axios.put(`/ChangeAlbumsBlog/${this.props.id}`, formData, config).then((res) => {
            setTimeout(() => {
                if (percent === 100) {
                    notification.open({
                        message: 'congrats',
                        description: 'saved Successful',
                        icon: <Icon type="picture" />,
                    });
                }
            }, 500)
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
        const Add_new_airlines = {
            airlines: (this.state.selectedItems)
        }
        axios.put(`/ChangeCategoryBlog/${this.props.id}`, Add_new_airlines).then((res) => {

        });
        const Add_new_service = {
            service: (this.state.service)
        }
        axios.put(`/ChangeServiceBlog/${this.props.id}`, Add_new_service).then((res) => {

        });
        notification.open({
            message: 'congrats',
            description: 'Edit you blog successful',
            icon: <Icon type="form" />,
        });
        setTimeout(() => {
            window.location.reload();
        }, 500);
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
                <Icon style={{ marginBottom: 14, fontSize: 43 }}
                    type="picture" />
                <div className="ant-upload-text">Albums</div>
            </div>
        );
        const { preview } = this.state;
        const { selectedItems, multiFile, service } = this.state;
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
                            className="EditAlbums"
                            action={'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                            listType="picture-card"
                            onChange={this.upload_albums}
                        >
                            {multiFile.length >= 8 ? null : albumsButton}
                        </Upload>
                        <br />
                        <Select
                            style={{ width: '100%', marginBottom: 20 }}
                            mode="default"
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
                        <button className="PublishSaved" type="submit">Publish</button>
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
                        line-height: 22px;
                        white-space: normal;
                        word-spacing: normal;
                        outline: none !important;
                    }
                    .editCoverImage > .ant-upload {
                        width: 100%;
                        height: 180px;
                    }
                    .PublishSaved {
                        margin-top:20px;
                        width: 136px;
                        font-size: 11.3px;
                        height: 35px;
                        border: 0;
                        border-radius: 4px;
                        background-color: #f26522;
                        color: #fff;
                        cursor: pointer;
                    }
                    .EditAlbums > .ant-upload {
                        width: 210px;
                        height: 160px;
                        margin-bottom: 20px;
                    }
                 `}</style>
            </div>
        );
    }
}