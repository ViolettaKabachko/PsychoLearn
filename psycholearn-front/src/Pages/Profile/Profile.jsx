import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { HttpGet, HttpGetFile, HttpPost, HttpPostFile } from '../../requests';
import Navbar from '../../Components/UI/Navbar/Navbar'
import classes from './Profile.module.css'
import Button from '../../Components/Button/Button';
import phot from '../../Images/default.svg'
import { useFetch } from '../../Hooks/useFetch';

const Profile = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [photo, setPhoto] = useState(phot)
    const [newPhoto, setNewPhoto] = useState();
    const [photoChanged, setPhotoChanged] = useState(false)
    const [uid, setUid] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurame] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState(1)
    const [about, setAbout] = useState("")

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
                        if (res.uid === parseInt(localStorage.getItem("id"))) {
                            setEmail(res.email)
                            setRole(res.userrole)
                            setUid(res.uid)
                        }
                        else {
                            setEmail(undefined)
                            setRole(undefined)
                        }
                        HttpGetFile(`/users/${id}/photo`).then(res => {
                            console.log(res.blob().then(r => setPhoto(URL.createObjectURL(r))))
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
                    <Navbar onLogoFunc={() => navigate("/users/" + localStorage.getItem("id"))}></Navbar>
                </div>

                <div className={classes.mainBlock}>
                    <div style={{'--photo-url': `url(${newPhoto === undefined ? photo : newPhoto})`}} className={classes.profilePhoto}>
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

                         }}  className={classes.fileInput} type='file'></input>
                    </div>
                    {/* "request to update photo";  */}
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
                            {`${name} ${surname}`}
                        </div>
                        
                        <div style={{fontSize: "32px"}}>
                            {email}
                        </div>

                        <div style={{fontSize: "32px"}}>
                            {roles[role]}
                        </div>

                        <div style={{fontSize: "32px"}}>
                            {`About: ${about}`}
                        </div>
                    </div>

                    <div className={classes.editButton}>
                        <Button disabled={false} color={{'r': 149, 'g': 237, 'b': 219}}>Edit profile</Button>
                    </div>
                </div>
            </div>
            

            <div className={classes.statsBlock}>

            </div>
        </div>
        
    )
}
export default Profile;
