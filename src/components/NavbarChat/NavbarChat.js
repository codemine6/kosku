import {useHistory} from 'react-router-dom'
import styles from './NavbarChat.module.css'

import {ChevronLeft, More} from 'Icons'

export default function NavChat({user, toggleMenu}) {
    let history = useHistory()
    console.log(user)

    return (
        <nav className={styles.navbar}>
            <i onClick={() => history.goBack()}><ChevronLeft/></i>
            {user && <div className={styles.user}>
                <img src={user.profilePhoto ?? "https://placeimg.com/100/100/people"} alt="" onClick={() => history.push(`/user/${user.id}`)}/>
                <div>
                    <p>{user.username}</p>
                    <span>{user.onlineStatus}</span>
                </div>
            </div>}
            <i className={styles.more} onClick={toggleMenu}><More/></i>
        </nav>
    )
}