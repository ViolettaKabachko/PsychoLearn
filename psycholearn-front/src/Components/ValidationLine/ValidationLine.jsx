import React from 'react'
import classes from './ValidationLine.module.css'

const ValidationLine = ({children, ...props}) => {
    let func_res = props.func(props.text);
    return (
      <div className={func_res ? classes.validation + ' ' + classes.success : classes.validation + ' ' + classes.failure}>
          {children}
      </div>
    )
}

export default ValidationLine