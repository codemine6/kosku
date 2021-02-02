import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import styles from './Profile.module.css'

import Time from 'utils/Time'
import Navbar from 'components/Navbar/Navbar'

export default function Profile() {
    const {auth} = useAuthContext()
    let history = useHistory()

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.main}>
                    <img src={auth.profilePhoto ?? "https://placeimg.com/100/100/people"} alt=""/>
                    <div>
                        <h3>{auth.username}</h3>
                        <p>{auth.email}</p>
                        <button onClick={() => history.push('/edit-profile')}>Edit Profile</button>
                    </div>
                </div>
                <div className={styles.detail}>
                    <p>Status: <span>{auth.userType === 'owner' ? 'Pemilik kost' : 'Penyewa kost'}</span></p>
                    <p>Telepon: <span>{auth.phone}</span></p>
                    <p>Bergabung sejak {Time(auth.registerTime).toDate()}</p>
                </div>
            </div>
        </>
    )
}