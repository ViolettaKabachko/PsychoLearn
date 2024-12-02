import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/UI/Navbar/Navbar";
import classes from "./StarPage.module.css";
import Button from "../../Components/Button/Button";
import ModalWindow from "../../Components/UI/ModalWindow/ModalWindow";
import SignUpForm from "../../Components/Forms/SignUpForm/SignUpForm";
import LogInForm from "../../Components/Forms/LogInForm/LogInForm";

const StartPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [activeLogIn, setActiveLogIn] = useState(false);
  const [response, setResponse] = useState();
  const [answer, setAnswer] = useState("");

  return (
    <div className={classes.firstBlock}>
      <ModalWindow active={active} setActive={setActive}>
        <SignUpForm
          setActive={setActive}
          answer={answer}
          response={response}
          setResponse={setResponse}
          setAnswer={setAnswer}
        />
      </ModalWindow>

      <ModalWindow active={activeLogIn} setActive={setActiveLogIn}>
        <LogInForm
          response={response}
          setActiveLogIn={setActiveLogIn}
          setResponse={setResponse}
        />
      </ModalWindow>

      <div className={classes.startpage}>
        <div className={classes.navbar}>
          <Navbar
            onLogoFunc={() =>
              localStorage.getItem("access_token)") === undefined
                ? setActiveLogIn(true)
                : navigate(`../users/${localStorage.getItem("id")}`, {
                    relative: "path",
                  })
            }
          ></Navbar>
        </div>

        <div className={classes.title}>
          <div className={classes.main_title}>Let's get started:</div>
        </div>

        <div className={classes.sign_up_button}>
          <Button
            disabled={false}
            color={{ r: 149, g: 237, b: 219 }}
            onClick={() => setActive(true)}
          >
            Sign Up
          </Button>
        </div>

        <div className={classes.log_in_button}>
          <Button
            disabled={false}
            onClick={() => setActiveLogIn(true)}
            color={{ r: 255, g: 193, b: 194 }}
          >
            Log in
          </Button>
        </div>

        <div className={classes.leftPicture}></div>

        <div className={classes.rightPicture}></div>
      </div>

      <div className={classes.secondBlock}>
        <div className={classes.downPicutre}></div>

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

        <div className={classes.psylogo}></div>
      </div>
    </div>
  );
};

export default StartPage;
