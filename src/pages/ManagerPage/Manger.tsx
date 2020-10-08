import React, { useState } from 'react';
import { Row, Col, Drawer } from 'antd';
import Menus from '../../components/Menus';
import StaffManager from '../../components/MangerComponent/StaffManager';
import { connect } from 'react-redux';
import EditStaffForm from '../../components/MangerComponent/EditStaff';
import * as actions from './../../actions/index';

const Managers = (props: any) => {
    const initialColor = localStorage.getItem('bgColor') === 'dark' ? 'dark' : 'light';
    const [bgColor, setBgColor] = useState(initialColor)
    const handleChangeBG = (value:string) => {
        localStorage.setItem('bgColor', value);
        setBgColor(value);
    }

    //load staff manager
    const {staffs} = props;
    const showStaffManger = () => {
        var result = null;
        result = staffs.map((staff:any, index: number) => {
            return (
                <StaffManager
                    key={staff.id}
                    staff= {staff}
                    index={index + 1}
                    onEdit={onEditStaff}
                    onDelete={onDeleteStaff}
                />
            )
        })
        return result;
    }

    //edit staff
    const [visible, setVisible] = useState(false);
    const [staffEdit, setStaffEdit] = useState({
        id: '',
        name: '',
        email: '',
    });

    const onEditStaff = (checkEdit: boolean, staff: Staff) => {
        setVisible(checkEdit);
        setStaffEdit(staff)
    }

    const onDeleteStaff = (staff: Staff) => {
        props.onDeleteStaffs(staff);
    }

    const onClose = () => {
        setVisible(false);
    };

    const onHandleEditStaff = (id: string, value: Staff, checkSave: boolean) => {
        let staff: Staff  = {
            id: id,
            name: value.name,
            email : value.email,
        };
        setVisible(checkSave);
        props.onEditStaffs(staff);
    }

    return (
        <Row>
            <Col span={4} className={bgColor}>
                <Menus onchangeBG={handleChangeBG}/>
            </Col>
            <Col span={20} className={bgColor}>
                <div className="container">
                    {showStaffManger()}
                </div>
            </Col>
            <Drawer
                    title="EDIT STAFF"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width={650}
                >
                <EditStaffForm staffEdit={staffEdit} onHandleEditStaff={onHandleEditStaff}/>
            </Drawer>
        </Row>
    );
}

const mapStateToProps = (state : any) => {
    return {
        staffs: state.staffs
    }
}

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        onEditStaffs : (staff: Staff) => {
            dispatch(actions.editStaff(staff));
        },
        onDeleteStaffs: (staff: Staff) => {
            dispatch(actions.deleteStaff(staff));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Managers);