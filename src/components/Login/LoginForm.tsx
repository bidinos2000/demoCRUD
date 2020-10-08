import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Row, Col, message} from 'antd';
import './style.css';
import {Link, Redirect } from 'react-router-dom';
import axiosClient from '../../untils/axiosClient';
import * as mss from  './../../constants/message';
const LoginForm = () => {
    const initialCheck: boolean = localStorage.getItem('checkLogin') === '1' ? true : false;
    const [check, setCheck] = useState(initialCheck);

    const onFinish = (value: any) => {
        axiosClient.post('https://codes-crypto-express.herokuapp.com/api/login',{email: value.email,password: value.password}).then((res:any) => {
            if(res.code === 200 ) {
                localStorage.setItem('checkLogin', '1');
                setCheck(true);
            }else{
                mss.ERROR();
            }
        });
    }

    
    if(check) {
        return <Redirect to='/home'/>
    }

    return (
        <Row>
            <Col span={12} offset={6}>
                <Form
                    name="normal_login"
                    className="login-form lgForm"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        label="Account"
                        rules={[
                        {
                            type: 'email',
                            message: 'Account must is E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your Account',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button  btnLogin">
                            Log in
                        </Button>
                        Or <Link to='/register'> register now!</Link>
                            
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginForm;