import React from 'react'
import Navbar from '../../Components/UI/Navbar/Navbar'
import classes from './StarPage.module.css'
import Button from '../../Components/Button/Button'

const StartPage = () => {
  return (
    <div className={classes.firstBlock}>
        <div className={classes.startpage}>
            <div className={classes.navbar}>
                <Navbar></Navbar>
            </div>

            <div className={classes.title}>
              <div className={classes.main_title}>
                Let's get started:
              </div>
            </div>

            <div className={classes.sign_up_button}>
              <Button color={{'r': 149, 'g': 237, 'b': 219}}>Sign Up</Button>
            </div>

            <div className={classes.log_in_button}>
              <Button color={{'r': 255, 'g': 193, 'b': 194}}>Log in</Button>
            </div>

            <div className={classes.leftPicture}>
            </div>

            <div className={classes.rightPicture}>
            </div>
         </div>

         <div className={classes.secondBlock}>
            <div className={classes.downPicutre}>
            </div>

            <div className={classes.downTitle}>
                This is psycho-community. <br></br>
                You can join us freely if you:
            </div>

            <div className={classes.list}>
                1. Feel curious about learning psychology
                  <br></br>
                2. Want to know own inner world better or
                  <br></br>
                3. Trust your mental health in professional's arms 
            </div>

            <div onClick={() => window.scrollTo(0, 0)} className={classes.upRise}>
              Can't looking forward to!
            </div>

            <div className={classes.psylogo}>

            </div>
         </div>
    </div>
    
    
  )
}

export default StartPage