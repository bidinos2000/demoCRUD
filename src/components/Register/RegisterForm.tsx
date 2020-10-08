import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {Form,Input,Checkbox,Button,Row, Col} from 'antd';
import './style.css';
import axiosClient from '../../untils/axiosClient';
import * as mss from './../../constants/message';
import { useHistory } from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const RegisterForm = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    const history = useHistory();
    const onFinish = (value: any) => {
        axiosClient.post('https://codes-crypto-express.herokuapp.com/api/register', 
        {email: value.email, password: value.password}).then((res: any) => {
            if(res.code === 200) {
                setSuccess(true);
                mss.RGT_SUCCESS();
            }else{
                mss.RGT_FAIL();
            }
        });

    };

    const onHandleLogin = () => {
        localStorage.removeItem('checkLogin');
        history.push('/');
    }

    return (
        <Row className="register">
            <Col span={12} offset={6}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
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
                    <Input className="width"/>
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
                    <Input.Password className="width"/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                    >
                    <Input.Password className="width"/>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                        I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <Button type="primary" disabled={!success} className="rgtLogin" onClick={onHandleLogin}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default RegisterForm;