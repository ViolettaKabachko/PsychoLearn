import React from 'react'
import classes from './Button.module.css'

const Button = ({children, ...props}) => {
  let colorObj = {};

  ['r', 'g', 'b'].forEach(x => {
    colorObj[`--${x}-color`] = props.color[x]
  });
  if (!props.disabled) {
    return (
      <button disabled
      style={colorObj} 
      className={classes.button} {...props}>{children}</button>
)
  }
  return (
        <button 
        style={colorObj} 
        className={classes.button} {...props}>{children}</button>
  )
}

export default Button;