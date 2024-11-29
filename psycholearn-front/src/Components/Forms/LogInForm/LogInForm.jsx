import React, {useState} from 'react';
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import {validateEmail} from "../../../validation";
import ValidationLine from "../../ValidationLine/ValidationLine";
import {useFetch} from "../../../Hooks/useFetch";
import {HttpPost} from "../../../requests";
import classes from "./LogInForm.module.css";
import {useNavigate} from "react-router-dom";

const LogInForm = ({...props}) => {
    const navigate = useNavigate();
    const [logInEmail, setLogInEmail] = useState("")
    const [logInPassword, setLogInPassword] = useState("")
    const [fetching, loading, error] = useFetch(async () => {
            let res = await HttpPost("/auth/login", {
                email: logInEmail,
                password: logInPassword
            })
            if (Object.hasOwn(res, "err"))
                props.setResponse(res.err)
            else {
                localStorage.setItem("access_token", res.access_token)
                localStorage.setItem("id", res.id)
                navigate("/users/" + res.id)
            }
            console.log(res)
        }
    )

    return (
        <>
            <div onClick={() => {
                props.setActiveLogIn(false);
                setLogInPassword("");
                setLogInEmail("")
                props.setResponse("")
            }} className={classes.backCross}>
            </div>

            <div className={classes.signUpTitle}>
                Log in
            </div>
            <Input placeholder="Email" value={logInEmail} onChange={
                (e) => {
                    setLogInEmail(e.target.value);
                    props.setResponse("")
                }
            }></Input>
            <Input type="password" placeholder="Password" value={logInPassword} onChange={(e) => {
                setLogInPassword(e.target.value);
                props.setResponse("")
            }}></Input>
            <Button
                disabled={!(validateEmail(logInEmail) && logInPassword.length > 1)}
                color={{'r': 149, 'g': 237, 'b': 219}}
                onClick={async () => await fetching()}>Sign Up</Button>

            {props.response !== undefined && <ValidationLine func={() => false}>{props.response}</ValidationLine>}
        </>
    );
};

export default LogInForm;