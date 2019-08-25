import React, {PureComponent} from 'react'
import { Input, Icon } from 'antd'
import axios from 'axios'
import jwt from 'jsonwebtoken'
export default class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            username: null,
            password: null,
            checked: []
        }
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
    loginForm = (e) => {
        e.preventDefault();
        axios.post(`/login`).then(res => {
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            let tokenId = jwt.sign(user, JSON.stringify(this.state.username));
            localStorage.setItem('auth', btoa(tokenId));
            if (localStorage.getItem('auth')=== null) {
                location.href='admin'
            }
            else {
                location.href='dashboard'
            }
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.loginForm}>
                    <Input type={'username'} onChange={this.username} name={'username'} className="usernameLogin" placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    <Input type={'password'} onChange={this.password} name={'password'} className="passwordLogin" placeholder="Password" />
                    <br />
                    <button type="submit" className="loginButton">Login to System</button>
                    <style>{`
                        .loginButton, loginButton:hover {
                            width: 150px;
                            padding:10px;
                            background-color: #f26522 !important;
                            color: #fff !important;
                            border-radius: 4px !important;
                            border: 0 !important;
                            cursor: pointer;
                            margin-bottom: 20px;
                        }
                    `}</style>
                </form>
            </div>
        );
    }
};