import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { HttpGet } from '../../requests';



const Profile = () => {
    const {id} = useParams();
    const [name, setName] = useState("")
    const [surname, setSurame] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState(1)

    useEffect(async () => {
        let res = await HttpGet("/users/" + id, {"Authorization": `Bearer ${localStorage.getItem("access_token")}`})
        setName(res.username)
        setSurame(res.surname)
        if (res.uid === parseInt(localStorage.getItem("id"))) {
            setEmail(res.email)
            setRole(res.userrole)
        }
        else {
            setEmail(undefined)
            setRole(undefined)
        }
    }, [])

    console.log(id)
    return (
        <button onClick={async () => {
            console.log(name)
            console.log(surname)
            console.log(email)
            console.log(role)
        }}>
        </button>
    )
}

export default Profile