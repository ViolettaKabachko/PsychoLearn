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

export default SideBar;


{/* <SideBar showMenu={showMenu}>
                <div>
                    <a className={classes.anc} href="/">Read some articles</a>
                </div>
                <div>
                    <a className={classes.anc} href="/">Course progress</a>
                </div>
                <div>
                    <a className={classes.anc} href="/">Preferences</a>
                </div>
            </SideBar>
            
            <div className={classes.toggle}>
                <div onClick={() => {setShowMenu(!showMenu); setPointer(pointers[+showMenu])}} className={classes.toggleInner}>
                    {pointer}
                </div>
            </div> */}