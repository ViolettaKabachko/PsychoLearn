import React from 'react'
import classes from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={classes.not_found}>
      <div>{"Page is not found, check the url"}</div>
      <div>
        <span>Return to the <a href="/start">home page</a></span>
      </div>
    </div>
  )
}

export default NotFound