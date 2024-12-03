import React, {useState} from 'react';
import classes from "./SignUpFrom.module.css";
import Input from "../../Input/Input";
import ValidationLine from "../../ValidationLine/ValidationLine";
import {
    hasCapitalLetters,
    hasDigits,
    hasEnoughLength,
    hasLowerLetter,
    passwordAreTheSame,
    validateEmail
} from "../../../validation";
import Button from "../../Button/Button";
import {useFetch} from "../../../Hooks/useFetch";
import {HttpGet, HttpPost} from "../../../requests";
import bcrypt from "bcryptjs";

const SignUpForm = ({...props}) => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [firstPasswordEnter, setFirtsPasswordEnter] = useState(false);
    const [registerFetch, loading1, error1] = useFetch(async () => {
            let salt = await HttpGet("/secure/get_salt")
            console.log(salt)
            let res = await HttpPost("/users", {
                name: name,
                surname: surname,
                email: email,
                password: await bcrypt.hash(password, salt.salt)
            })
            props.setResponse(Object.hasOwn(await res, "msg"));
            if (Object.hasOwn(await res, "msg")) {
                props.setAnswer((await res).msg)
                setName("")
                setSurname("")
                setEmail("")
                setPassword("")
                setRepeatedPassword("")
            }
            else {
                props.setAnswer((await res).err);
                setPassword("")
                setRepeatedPassword("")
            }
        }
    )
    
    return (
        <>
            <div
                onClick={() => {
                    props.setActive(false);
                    props.setAnswer("")
                }}
                className={classes.backCross}>
            </div>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></Input>
            <Input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)}></Input>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
            {email.length !== 0 &&
                <ValidationLine text={email} func={(text) => validateEmail(text)}>Correct email</ValidationLine>
            }
            <Input placeholder="Password" type="password" value={password} onChange={(e) => {
                setPassword(e.target.value);
                setFirtsPasswordEnter(true)
            }}></Input>
            <Input placeholder="Repeat password" type="password" value={repeatedPassword}
                   onChange={(e) => setRepeatedPassword(e.target.value)}></Input>

            {firstPasswordEnter && (password.length !== 0 || repeatedPassword.length !== 0) &&
                <div className={classes.validations}>
                    <ValidationLine text={password} func={(text) => hasEnoughLength(6, text)}>Length has to be more than
                        6</ValidationLine>
                    <ValidationLine text={password} func={(text) => hasDigits(text)}>Has to be at least 1
                        digit</ValidationLine>
                    <ValidationLine text={password} func={(text) => hasLowerLetter(text)}>Has to be at least 1 low
                        letter</ValidationLine>
                    <ValidationLine text={password} func={(text) => hasCapitalLetters(text)}>Has to be at least 1
                        capital letter</ValidationLine>
                    {(password.length !== 0 || repeatedPassword.length !== 0) && <ValidationLine text={repeatedPassword}
                                                                                                 func={(repeatedPassword) => passwordAreTheSame(password, repeatedPassword)}>Passwords
                        have to match</ValidationLine>}
                </div>}

            <Button
                disabled={[hasCapitalLetters(password),
                    hasDigits(password),
                    hasEnoughLength(6, password),
                    hasLowerLetter(password),
                    passwordAreTheSame(password, repeatedPassword),
                    validateEmail(email),
                    name.length > 1,
                    surname.length > 1]
                    .reduce((acc, cur) => {
                        return acc + cur
                    }, 0) !== 8}

                onClick={async () => await registerFetch()}
                color={{'r': 170, 'g': 218, 'b': 209}}>Sign Up
            </Button>
            {props.response !== undefined &&
                <ValidationLine func={() => props.response}>{props.answer}</ValidationLine>}
        </>
    );
};

export default SignUpForm;