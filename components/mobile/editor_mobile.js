import React, { PureComponent } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { ImagePicker } from 'antd-mobile';
import { Icon, Select, notification } from 'antd'
export default class Editor_mobile extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            title: [],
            cover: [],
            content: [],
            preview: '/static/images/bg/uploadIcon.png',
            loading: false,
            multiFile: [],
            tags: [
                {
                    "id": 1,
                    "type": "blog"
                },
                {
                    "id": 2,
                    "type": "promotion"
                }
            ],
            selectedItems: []
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
        })
        let newCategory = [];
        for (let k = 0; k < this.state.selectedItems.length; k++) {
            let selected = (this.state.selectedItems[k], { category: this.state.selectedItems[k] });
            newCategory.push(selected);
        }
        for (let j = 0; j < newCategory.length; j++) {
            formData.append('category', newCategory[j].category)
        }
    }
    render() {
        const { multiFile, selectedItems } = this.state;
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
                        placeholder="Selected Content Category"
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
                            height: 220px;
                            background-color: #f5f5f5;
                            overflow: hidden;
                            background-size: cover;
                            background-repeat: no-repeat;
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
                    }
                `}</style>
            </React.Fragment >
        );
    }
}