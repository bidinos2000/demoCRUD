import React from 'react';

const StaffItem = (props: any) => {

    const {staff, index} = props;
    return (
        <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">{index}</h4>
            <p>NAME :{staff.name}</p>
            <hr/>
            <p className="mb-0">E-MAIL :{staff.email}</p>
        </div>  
    );
}

export default StaffItem;