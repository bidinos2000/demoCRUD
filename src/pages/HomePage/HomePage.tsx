import { Row, Col, Button , Drawer} from 'antd';
import React, { useState } from 'react';
import StaffItem from '../../components/HomComponent/StaffItem';
import Menus from '../../components/Menus';
import './style.css';
import { connect } from 'react-redux';
import { UserAddOutlined } from '@ant-design/icons';
import AddStaffForm from '../../components/HomComponent/AddStaffForm';
import * as action from './../../actions/index';

const HomePage = (props: any) => {
    const initialColor = localStorage.getItem('bgColor') === 'dark' ? 'dark' : 'light';
    const [bgColor, setBgColor] = useState(initialColor)
    const handleChangeBG = (value:string) => {
        localStorage.setItem('bgColor', value);
        setBgColor(value);
    }

    const showStaff = () => {
        const {staffs} = props;
        var result = null;
        result = staffs.map((staff:any, index: number) => {
            return (
                <StaffItem  key={staff.id} staff= {staff} index={index + 1}/>
            )
        })
        return result;
    }

    //load form add staff
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    //add staff
    const staffAdd = (value: any) => {
        props.onAddStaff(value)
    }

    return (
        <Row className="rd">
            <Col span={4}  className={bgColor}>
                <Menus  onchangeBG={handleChangeBG}/>
            </Col>
            <Col span={20} className={bgColor}>
                <Button type="primary" icon={<UserAddOutlined />} size='large' onClick={showDrawer} className="btnAddStaff">
                        Add Staff
                </Button>
                <div className="container">
                    {showStaff()}
                </div>
                <Drawer
                    title="ADD STAFF"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width={650}
                >
                    <AddStaffForm staffAdd={staffAdd}/>
                </Drawer>
            </Col>
        </Row>
    );
}

const mapStateToProps = (state:any) => {
    return { 
        staffs: state.staffs
    }
};

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        onAddStaff : (staff: Staff) => {
            console.log(staff);
            dispatch(action.addStaff(staff));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);