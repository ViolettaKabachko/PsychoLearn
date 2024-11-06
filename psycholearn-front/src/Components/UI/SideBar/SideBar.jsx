import React from 'react'
import classes from './SideBar.module.css'

const SideBar = ({children, ...props}) => {
  return (
    <div className={props.showMenu ? classes.backGround + " " + classes.active : classes.backGround}>
        <div className={classes.content}>
            {children}
        </div>
    </div>
  )
}

export default SideBar