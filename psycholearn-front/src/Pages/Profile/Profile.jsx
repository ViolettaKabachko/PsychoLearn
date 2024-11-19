import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { HttpGet, HttpGetFile, HttpPost, HttpPostFile } from '../../requests';
import Navbar from '../../Components/UI/Navbar/Navbar'
import classes from './Profile.module.css'
import Button from '../../Components/Button/Button';
import phot from '../../Images/default.svg'
import { useFetch } from '../../Hooks/useFetch';
import Input from '../../Components/Input/Input.jsx'

const Profile = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [photo, setPhoto] = useState(phot)
    const [newPhoto, setNewPhoto] = useState();
    const [photoChanged, setPhotoChanged] = useState(false)
    const [uid, setUid] = useState("")
    const [name, setName] = useState("")
    const [isPageOwner, setIsPageOwner] = useState(false)
    const [surname, setSurame] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState(1)
    const [about, setAbout] = useState("")
    const [isChanging, setIsChanging] = useState(false)

    const [updatePhoto, loading, error] = useFetch(async () => {
        let data = new FormData();
        let file = await fetch(newPhoto).then(r => r.blob()).then(blobFile => new File([blobFile], `user_${id}.jpeg`, { type: "image/jpeg" }))
        data.append(`users_photo`, file, `user_${id}.jpeg`)
        let res = await HttpPostFile(`/users/${id}/update_photo`, data, {"Authorization": `Bearer ${localStorage.getItem("access_token")}`})
        console.log(res);
        setPhoto(newPhoto);
        setPhotoChanged(false); 
        setNewPhoto(undefined);
    });

    const roles = {
        1: "Reader",
        2: "Psychologist",
        3: "Admin"
    }

    useEffect(() => {
                HttpGet("/users/" + id, {"Authorization": `Bearer ${localStorage.getItem("access_token")}`}).then(res => {
                    console.log(res)
                    if (res.err === undefined) {
                        setName(res.username)
                        setSurame(res.surname)
                        setEmail(res.email)
                        setRole(res.userrole)
                        setUid(res.uid)
                        setIsPageOwner(res.is_page_owner)
                        if (res.access_token !== undefined)
                            localStorage.setItem("access_token", res.access_token)
                        
                        HttpGetFile(`/users/${id}/photo`, {"Authorization": `Bearer ${localStorage.getItem("access_token")}`}).then(res => {
                            res.blob().then(r => setPhoto(URL.createObjectURL(r)))
                        })
                    }
                    else {
                        localStorage.clear();
                        navigate("/start");
                    }
                })
        }, []
    )
    
    useEffect(() => {
        console.log(newPhoto);
    }, [newPhoto])

    return (
        <div className={classes.wrap}>
            <div className={classes.profile}>
                <div className={classes.navbar}>
                    <Navbar onLogoFunc={() => {navigate("/users/" + localStorage.getItem("id")); navigate(0)}}></Navbar>
                </div>

                <div className={classes.mainBlock}>
                    <div style={{'--photo-url': `url(${newPhoto === undefined ? photo : newPhoto})`}} className={isPageOwner ? classes.profilePhoto + ' ' + classes.owned : classes.profilePhoto}>
                        <input
                         accept="image/jpeg" 
                         onChange={(e) => {
                            if (e.target.files[0]) {
                                console.log(e.target.files[0])
                                setNewPhoto(URL.createObjectURL(e.target.files[0]))
                                setPhotoChanged(true)
                            }
                            else
                                console.log("No file choosen")
                            e.target.value = "";

                         }}  className={isPageOwner ? classes.fileInput + ' ' + classes.owned : classes.fileInput} type='file'></input>
                    </div>

                    {photoChanged && <div className={classes.acceptLine}>
                        <div style={{color: "green"}}>
                            <span onClick={async () => {await updatePhoto()}} className={classes.confirmBtn}> 
                                {"✔"}
                            </span>
                        </div>
                        <div onClick={() => {setPhotoChanged(false); setNewPhoto(undefined)}} style={{color: "red"}}>
                            <span className={classes.confirmBtn}>
                                {"✖"}
                            </span>
                        </div>
                    </div>}

                    <div className={classes.userInfo}>
                        <div style={{fontSize: "40px"}}>
                            {isChanging ? 
                                <Input style={{fontSize: "40px"}} value={name}></Input> : 
                                <div>
                                    {`${name} ${surname}`}
                                </div>
                            }
                        </div>
                        
                        <div style={{fontSize: "40px"}}>
                            {isChanging ? 
                                <Input style={{fontSize: "32px"}} value={email}></Input> :
                                <div style={{fontSize: "32px"}}>
                                    {email}
                                </div>
                            }
                        </div>
                        
                        <div style={{fontSize: "32px"}}>
                            {isChanging ? 
                                <Input style={{fontSize: "32px"}} value={roles[role]}></Input> :
                                <div style={{fontSize: "32px"}}>
                                    {roles[role]}
                                </div>
                            }
                        </div>
                        {/* {сделать текстареа} */}
                        <div style={{fontSize: "32px", display: "flex", "flexDirection": "row"}}>
                                <div style={{fontSize: "32px"}}>
                                    {`About: ${about}`}
                                </div>
                                {isChanging ? <Input style={{fontSize: "32px"}} value={about}></Input> : ""}
                        </div>
                    </div>

                    {isPageOwner && <div className={classes.editButton}>
                        <Button onClick={() => setIsChanging(!isChanging)} disabled={false} color={{'r': 149, 'g': 237, 'b': 219}}>{isChanging ? "Confirm changes" : "Edit profile"}</Button>
                    </div>}
                </div>
            </div>
            

            <div className={classes.statsBlock}>
                {isPageOwner && <div onClick={
                    () => 
                    HttpGet(`/users/${id}/logout`, {"Authorization": `Bearer ${localStorage.getItem("access_token")}`})
                    .then(r => {if (r["err"] === undefined) {
                        localStorage.clear()
                        document.cookie = "refresh_token" + "=1;expires=Thu, 01 Jan 1970 00:00:00 GMT';"
                        navigate("/start")
                    }
                    })} className={classes.logout}>
                </div>}
            </div>
        </div>
    )
}
export default Profile;
