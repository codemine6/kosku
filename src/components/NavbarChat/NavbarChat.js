import {useHistory} from 'react-router-dom'
import styles from './NavbarChat.module.css'

import {ChevronLeft, More} from 'Icons'

export default function NavChat({user, toggleMenu}) {
    let history = useHistory()

    return (
        <nav className={styles.navbar}>
            <i onClick={() => history.goBack()}><ChevronLeft/></i>
            <div className={styles.user}>
                <img src="https://placeimg.com/100/100/people" alt=""/>
                <div>
                    <p>{user?.username}</p>
                    <span>{user?.onlineStatus}</span>
                </div>
            </div>
            <i className={styles.more} onClick={toggleMenu}><More/></i>
        </nav>
    )
}