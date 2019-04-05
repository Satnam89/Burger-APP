import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems'
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawToggle clicked={props.showToggle}/>
        <div className={classes.Logo}> <Logo/></div>
        <nav className={classes.DestopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;