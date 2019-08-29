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
          <title>Penedge Admin</title>
          <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.3/antd.min.css"/>
        </Head>
        <Layout>
          <Content className="loginContainer">
            <Col span={10} className="register_form">
              <Card>
                <div className="brandLogo">
                  <img src={`/static/logo/penedgeLogo.png`} />
                </div>
                <Login/>
                <span style={{ fontFamily: 'sukhumvit set' }}>ถ้ายังไม่มีบัญชี Admin สร้างบัญชี
                    <span onClick={this.modal} style={{ fontWeight: 'bold', marginLeft: 10, cursor: 'pointer', color: '#f26522' }}>
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
            background-color: #383535;
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
         `}</style>
      </React.Fragment>
    );
  }
}