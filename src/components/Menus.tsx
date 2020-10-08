import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import 'antd/dist/antd.css';
import { Menu, Switch } from 'antd';
import { HomeOutlined, UnorderedListOutlined, LogoutOutlined, SettingFilled } from '@ant-design/icons';


interface Color {
    color: Colors | undefined
}

const listMenu: Array<Menus> = [
    {
        name: "Home",
        to: '/home',
        icon: <HomeOutlined />,
        exact: false
    },
    {
        name: 'Manager',
        to: '/manager',
        icon: <UnorderedListOutlined />,
        exact: false
    },
    {
        name: 'Register',
        to: '/register',
        icon: <SettingFilled/>,
        exact: false
    },
    {
        name: 'Logout',
        to: '/',
        icon: <LogoutOutlined />,
        exact: true
    }
];

const Menus = (props:any) => {
    const history = useHistory();

    const showMenu = () => {
        var result = null;
        if(listMenu.length > 0) { 
            result = listMenu.map((menu:Menus, index: number) => {
                return (
                    <Menu.Item key={menu.to} icon={menu.icon}>{menu.name}</Menu.Item>
                )
            });
        }
        return result;
    }

    const theme =  localStorage.getItem('bgColor') === 'dark' ? 'dark' : 'light';
    const initialColor: Color["color"] = {
        theme: theme,
        current: '1',
    }

    const [color, setColor] = useState(initialColor);
    const changeTheme = (value: any) => {
        props.onchangeBG(value ? 'light' : 'dark');
        setColor({
            ...color,
            theme: value ? 'light' : ''
        });
    };

    const handleClick = (e: any) => {
        if(e.key === '/') {
            localStorage.removeItem('checkLogin');
        }
        history.push(e.key);
        setColor({
            ...color,
            current: e.key,
        });
    };

    return (
            <>
            <Switch
                    style={{position:"fixed"}}
                    checked={color.theme === 'light'}
                    onChange={changeTheme}
                    checkedChildren="Light"
                    unCheckedChildren="Dark"
            />
            <br />
            <br />
            <Menu
                onClick={handleClick}
                style={{ width: 249 }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[color.current]}
                mode="inline"
                theme={color.theme === 'light' ? 'light' : 'dark'}
                className="menu"
            >
                {showMenu()}
            </Menu>
            </>

    );
}

export default Menus;