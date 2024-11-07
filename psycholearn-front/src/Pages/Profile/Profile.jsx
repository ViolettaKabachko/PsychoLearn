import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { HttpGet } from '../../requests';
import SideBar from '../../Components/UI/SideBar/SideBar';
import Navbar from '../../Components/UI/Navbar/Navbar'
import classes from './Profile.module.css'

const Profile = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const [uid, setUid] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurame] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState(1)
    const pointers = ["<", ">"]
    const [pointer, setPointer] = useState(pointers[1])

    useEffect(() => {
                HttpGet("/users/" + id, {"Authorization": `Bearer ${localStorage.getItem("access_token")}`}).then(res => {
                    console.log(res)
                    if (res.err === undefined) {
                        setName(res.username)
                        setSurame(res.surname)
                        if (res.uid === parseInt(localStorage.getItem("id"))) {
                            setEmail(res.email)
                            setRole(res.userrole)
                            setUid(res.uid)
                        }
                        else {
                            setEmail(undefined)
                            setRole(undefined)
                        }
                    }
                    else {
                        localStorage.clear();
                        navigate("/start");
                    }
                })
        }, []
    )

    return (
        <div className={classes.profile}>
            <div className={classes.navbar}>
                <Navbar onLogoFunc={() => navigate("/users/" + localStorage.getItem("id"))}></Navbar>
            </div>

            <SideBar showMenu={showMenu}>
                <div>
                    <a className={classes.anc} href="/">Read some articles</a>
                </div>
                <div>
                    <a className={classes.anc} href="/">Course progress</a>
                </div>
                <div>
                    <a className={classes.anc} href="/">Preferences</a>
                </div>
            </SideBar>
            
            <div className={classes.toggle}>
                <div onClick={() => {setShowMenu(!showMenu); setPointer(pointers[+showMenu])}} className={classes.toggleInner}>
                    {pointer}
                </div>
            </div>
        </div>
    )
}
export default Profile