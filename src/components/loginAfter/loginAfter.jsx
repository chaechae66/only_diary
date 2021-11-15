import React from 'react';
import styles from './loginAfter.module.css'
import Menu from '../menu/menu';
import UserMenu from '../userMenu/userMenu';
import AlertMenu from '../alertMenu/alertMenu';

const LoginAfter = () => {
    return (
        <div className={styles.loginUser}>
          <AlertMenu />
          <UserMenu />
          <Menu />
        </div>
    )
}

export default LoginAfter
