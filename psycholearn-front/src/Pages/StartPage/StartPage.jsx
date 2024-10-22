import {React, useState} from 'react'
import Navbar from '../../Components/UI/Navbar/Navbar'
import classes from './StarPage.module.css'
import Button from '../../Components/Button/Button'
import ModalWindow from '../../Components/UI/ModalWindow/ModalWindow'
import Input from '../../Components/Input/Input'
import ValidationLine from '../../Components/ValidationLine/ValidationLine'
import { hasCapitalLetters, hasDigits, hasEnoughLength, hasLowerLetter, passwordAreTheSame } from '../../validation'


const StartPage = () => {
  const [active, setActive] = useState(false)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [firstPasswordEnter, setFirtsPasswordEnter] = useState(false);


  return (
    <div className={classes.firstBlock}>
        <ModalWindow active={active} setActive={setActive}>
          <div onClick={() => setActive(false)} className={classes.backCross}>
          </div>

          <div className={classes.signUpTitle}>
            Sign up
          </div>

          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></Input>
          <Input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)}></Input>
          <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
          {/* // вставить валидацию емайл */}
          <Input placeholder="Password" type="password" value={password} onChange={(e) => {setPassword(e.target.value); setFirtsPasswordEnter(true)}}></Input>
          <Input placeholder="Repeat password" type="password" value={repeatedPassword} onChange={(e) => setRepeatedPassword(e.target.value)}></Input>
          
          {firstPasswordEnter && 
          <div className={classes.validations}>
            <ValidationLine text={password} func={(text) => hasEnoughLength(6, text)}>Length have to be more than 6</ValidationLine>
            <ValidationLine text={password} func={(text) => hasDigits(text)}>Have to be at least 1 digit</ValidationLine>
            <ValidationLine text={password} func={(text) => hasLowerLetter(text)}>Have to be at least 1 low letter</ValidationLine>
            <ValidationLine text={password} func={(text) => hasCapitalLetters(text)}>Have to be at least 1 capital letter</ValidationLine>
            {password.length !== 0 && <ValidationLine text={repeatedPassword} func={(repeatedPassword) => passwordAreTheSame(password, repeatedPassword)}>Passwords don't match</ValidationLine>}          </div>}
          
          <Button disabled color={{'r': 149, 'g': 237, 'b': 219}}>Sign Up</Button>

        </ModalWindow>
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
              <Button color={{'r': 149, 'g': 237, 'b': 219}} onClick={() => setActive(true)}>Sign Up</Button>
            </div>

            <div className={classes.log_in_button}>
              <Button color={{'r': 255, 'g': 193, 'b': 194}} >Log in</Button>
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
                Join us freely if you:
            </div>

            <div className={classes.list}>
                1. Feel curious about learning psychology
                  <br></br>
                2. Want to know own inner world better or
                  <br></br>
                3. Trust your mental health in professional's arms 
            </div>

            <div onClick={() => window.scrollTo(0, 0)} className={classes.upRise}>
              I'm looking forward to!
            </div>

            <div className={classes.psylogo}>

            </div>
         </div>
    </div>
    
    
  )
}

export default StartPage