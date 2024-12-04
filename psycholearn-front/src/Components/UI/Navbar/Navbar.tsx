import React from 'react'
import classes from './Navbar.module.css'
import logo from '../../../Images/logo.svg'

const Navbar = ({...props}) => {
  return (
    <div className={classes.navbar}>
        <div className={classes.logo}>
          <a href='/'><img alt="pct" src={logo}/></a>
        </div>

        <div className={classes.inner_link}>
          <a href='/'>Essential psychology course</a>
        </div>

        <div className={classes.inner_link}>
          <a href='/'>Find your specialist</a>
        </div>

        <div className={classes.inner_link}>
          <a href='/'>More psycho articles</a>
        </div>

        <div onClick={() => props.onLogoFunc()} className={classes.log_in_logo}>
          <div>
            
          </div>
        </div>
    </div>
  )
}

export default Navbar