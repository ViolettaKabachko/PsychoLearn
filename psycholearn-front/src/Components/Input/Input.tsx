import React from 'react'
import classes from './Input.module.css'

const Input = ({children, ...props}) => {
  return (
      <input className={classes.input} {...props}>{children}</input>
  )
}

export default Input