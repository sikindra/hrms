import React from 'react'
import AuthUser from './AuthUser';

const Logout = () => {
    const {token,logout} = AuthUser();
    const name  = sessionStorage.getItem('userName');
    return (
        logout(name)
    );
}

export default Logout
