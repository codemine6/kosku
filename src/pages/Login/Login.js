import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from 'services/Api'
import styles from 'pages/Register/Register.module.css'

import {Facebook, GooglePLus} from 'Icons'
import TextInput from 'components/TextInput/TextInput'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    function handleLogin() {
        if (email && password) {
            setLoading(true)
            useAuth.signInWithEmailAndPassword(email, password)
            .catch(err => {
                setLoading(false)
                setMessage(err.message)
            })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                <h1>Masuk</h1>
                <label>Email Address</label>
                <TextInput type="email" onChange={setEmail}/>
                <label>Password</label>
                <TextInput type="password" onChange={setPassword}/>
                <p className={styles.forgot} onClick={() => history.push('/recovery')}>Lupa password?</p>
                <p className={styles.error}>{message}</p>

                <Button onClick={!loading && handleLogin}>Masuk</Button>

                <p>Atau masuk dengan</p>
                <div className={styles.social}>
                    <i><Facebook/></i>
                    <i><GooglePLus/></i>
                </div>
                <p>Belum Punya Akun? <b onClick={() => history.replace('/register')}>Daftar Disini</b></p>
            </div>
            {loading && <Loader/>}
        </div>
    )
}