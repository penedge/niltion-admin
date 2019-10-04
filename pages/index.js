// package
import React, {PureComponent} from 'react';
// antd components
import { Layout, Card, Col, Modal } from 'antd';
import Head from 'next/head';
// import components
import dynamic from 'next/dynamic'
const RegisterAccount = dynamic(import('../components/desktop/registerAccount'), {ssr: false})
const Login = dynamic(import('../components/desktop/login'), {ssr: false})
// custom components
const { Content } = Layout;
export default class Index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }
  closeModal = () => {
    this.setState({
      modal: false
    })
  }
  modal = () => {
    this.setState({
      modal: true
    })
  }
  cancelRegister = () => {
    this.setState({
      modal: false
    })
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Nilton Travel Admin</title>
          <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.3/antd.min.css"/>
        </Head>
        <Layout>
          <Content className="loginContainer">
            <Col md={{span: 10}} className="register_form">
              <Card>
                <div className="brandLogo">
                  <img src={`https://nilton.sgp1.digitaloceanspaces.com/static/logo/logo-nilton.png`} />
                </div>
                <Login/>
                <span style={{ fontFamily: 'sukhumvit set' }}>ถ้ายังไม่มีบัญชี Admin สร้างบัญชี
                    <span onClick={this.modal} style={{ fontWeight: 'bold', marginLeft: 10, cursor: 'pointer', color: '#3d2e91' }}>
                    Admin ได้ที่นี่
                    </span>
                </span>
                <Modal title={<span style={{ fontFamily: 'sukhumvit set' }}>สร้างบัญชี Admin</span>}
                  visible={this.state.modal}
                  footer={null}
                  onCancel={this.closeModal}>
                    <RegisterAccount />
                </Modal>
              </Card>
            </Col>
          </Content>
        </Layout>
        <style>{`
          body {
            background-color: #f0f2f5;
          }
          .loginContainer {
            padding: 50px;
          }
          .register_form {
            float: none;
            display: block;
            margin: auto;
          }
          .brandLogo {
            width: 100%;
            height: 176px;
            overflow:hidden;
            margin-bottom:26px;
          }
          .brandLogo img {
            object-fit: contain;
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding: 30px;
          }
          .usernameLogin, .passwordLogin {
            width: 100%;
            margin-bottom: 20px;
          }
          @media screen and (min-width: 320px) and (max-width: 420px) {
            .loginContainer {
              padding: 30px;
              padding-top: 130px;
            }
            .brandLogo {
              height: 110px;
              margin-bottom: 0;
            }
            .brandLogo img {
              padding: 0;
            }
          }
         `}</style>
      </React.Fragment>
    );
  }
}