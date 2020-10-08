import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {Form,Input,Button,Row, Col} from 'antd';
import './../Register/style.css';

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


const EditStaffForm = (props: any) => {
    const [form] = Form.useForm();

    const {staffEdit} = props;
    const onFinish = (value: any) => {
        console.log(staffEdit);
        props.onHandleEditStaff(staffEdit.id, value, false)
    };

    //set value for form
    if(staffEdit){
        form.setFieldsValue({
            email: staffEdit.email,
            name: staffEdit.name,
        })
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
                            label="email"
                            rules={[
                            {
                                type: 'email',
                                message: 'You must enter E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail',
                            },
                            ]}
                    >
                    <Input className="width" placeholder="Please input E-mail" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="name"
                        label="Name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your name',
                        },
                        ]}
                    >
                        <Input className="width" placeholder="Please input your name" />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                             Save
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default EditStaffForm; 