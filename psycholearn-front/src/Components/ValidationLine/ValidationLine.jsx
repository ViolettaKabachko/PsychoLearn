import React from 'react'
import classes from './ValidationLine.module.css'

const ValidationLine = ({children, text, func}) => {
  return (
    <div className={func(text) ? classes.validation + ' ' + classes.success : classes.validation + ' ' + classes.failure}>
        {children}
    </div>
  )
}

export default ValidationLine