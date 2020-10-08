import { Button } from 'antd';
import React, { useState } from 'react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import './style.css';

const StaffManager = (props: any) => {

    const { staff, index } = props;

    const onHandleDelete = () => {
        props.onDelete(staff);
    }

    const onHandleEdit = () => {
        const edit: boolean = true
        props.onEdit(edit, staff);
    }
    
    return (
        <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">{index}</h4>
            <p>NAME :{staff.name}</p>
            <hr/>
            <p className="mb-0">E-MAIL :{staff.email} </p>
            <div className="btn-gr">
                <Button icon={<DeleteOutlined/>} className='btnDelete' onClick={onHandleDelete}>DELETE</Button>
                <Button icon={<EditOutlined />} className='btnEdit' onClick={onHandleEdit}>EDIT</Button>
            </div>
        </div>  
    );
}

export default StaffManager;