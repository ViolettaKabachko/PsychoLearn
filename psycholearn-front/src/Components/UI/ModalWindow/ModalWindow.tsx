import React from 'react'
import classes from './ModalWindow.module.css'

const ModalWindow = ({children, active}) => {
  return (
    <div className={active ? classes.modal + ` ` + classes.active : classes.modal}>
        <div className={classes.modal_content}>
            {children}
        </div>
    </div>
  )
}

export default ModalWindow