import {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useAuth, useDb} from 'services/Api'
import styles from './Verification.module.css'

import Button from 'components/Button/Button'

export default function Verification() {
    const [verified, setVerified] = useState(false)
    let history = useHistory()
    let location = useLocation()
    let actionCode = new URLSearchParams(useLocation().search).get('oobCode')

    useEffect(() => {
        if (actionCode) {
            useAuth.applyActionCode(actionCode).then(() => {
                useDb.collection('users').doc(useAuth.currentUser.uid).set({emailVerified: true}, {merge: true})
                setVerified(true)
            }).catch(() => {
                history.replace('/404')
            })
            setVerified(true)
        } else {
            useAuth.onAuthStateChanged(user => {
                if (user.emailVerified && location.state) {
                    setVerified(true)
                } else if (user.emailVerified) {
                    history.replace('/404')
                } else {
                    useAuth.currentUser.sendEmailVerification()
                }
            })
        }
    }, [actionCode, location, history])

    return (
        <div className={styles.center}>
            {verified ? <div>
                <h3>Verifikasi Berhasil</h3>
                <p>Akun berhasil diverifikasi. Silahkan klik lanjutkan untuk mulai menggunakan aplikasi.</p>
                <Button onClick={() => history.replace('/')}>Lanjutkan</Button>
            </div> : <div>
                <h3>Verifikasi Akun</h3>
                <p>Tautan verifikasi telah dikirim ke emailmu. Silahkan lakukan verifikasi untuk menyelesaikan pendaftaran.</p>
            </div>}
        </div>
    )
}