import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import {useDb} from 'services/Api'
import styles from './EditProfile.module.css'

import {Camera} from 'Icons'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function EditProfile() {
    const {auth} = useAuthContext()
    const [profilePhoto, setProfilePhoto] = useState(auth.profilePhoto)
    const [username, setUsername] = useState(auth.username)
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    function changeImage(e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = img => setProfilePhoto(img.target.result)
    }

    function saveProfile() {
        setLoading(true)
        useDb.collection('users').doc(auth.id).set({profilePhoto, username}, {merge: true}).then(() => {
            history.goBack()
        })
    }

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.image}>
                        <img src={profilePhoto ?? "https://placeimg.com/100/100/people"} alt=""/>
                        <label htmlFor="input"><Camera/></label>
                        <input id="input" type="file" accept="image/*" onChange={changeImage}/>
                    </div>
                    <div className={styles.detail}>
                        <input value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                </div>
                <Button onClick={saveProfile}>Simpan</Button>
            </div>
            {loading && <Loader/>}
        </>
    )
}