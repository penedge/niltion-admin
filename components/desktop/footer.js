import React from 'react'
import { Row, Col, Card, Icon } from 'antd'
const Footer = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col className="footerContainer" md={{ span: 12 }}>
                    <Col md={{ span: 8 }}>
                        <Card>
                            <p style={{ color: '#fff', marginBottom: 20, fontWeight: 'bold' }}>CONTACT US</p>
                            <p style={{ color: '#fff', lineHeight: '25px' }}>Tel : 02-2371057-9 ,
                                02-2357106-7 , 02-2373166-8 ,
                                02-2373597-8 , 02-2366073 , 02-2354987-8
                                FAX : 02-22371066 , 02-6395560
                                Email : niltontravelcenter@gmail.com
                            </p>
                        </Card>
                    </Col>
                    <Col md={{ span: 8 }}>
                        <Card>
                            <p style={{ color: '#fff', marginBottom: 20, fontWeight: 'bold' }}>LOCATION</p>
                            <p style={{ color: '#fff', lineHeight: '25px' }}>Tel : 02-2371057-9 ,
                            27/24 Soi Charoengkrung Soi 30, Charoengkrung Rd, Bangkok 10500 Thailand
                            </p>
                            <p style={{ color: '#fff', marginBottom: 20, fontWeight: 'bold' }}>Follow Us</p>
                            <a href={'https://www.facebook.com/niltontravel/'} target={'_blank'}><Icon type="facebook" style={{fontSize: 36,color: '#fff',cursor:'pointer'}}/></a>
                        </Card>
                    </Col>
                </Col>
            </Row>
            <style>{`
                .footerContainer {
                    width: 100%;
                    height: auto;
                    background-color: #2b2766 !important;
                }
                .brand {
                    width: 300px;
                    margin-left: 20px;
                    object-fit: cover;
                }
                .footerContainer .ant-col-md-8 {
                    padding: 40px;
                }
                .footerContainer .ant-card {
                    background-color: #2b2766 !important;
                    border: 0;
                }
                .footerContainer .ant-card-head {
                    border-bottom: 0;
                }
            `}
            </style>
        </React.Fragment>
    )
}
export default Footer;