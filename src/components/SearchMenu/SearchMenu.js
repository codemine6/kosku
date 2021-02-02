import {useState} from 'react'
import styles from './SearchMenu.module.css'

export default function SearchMenu() {
    const [selected, setSelected] = useState('kost')

    return (
        <div className={styles.menus}>
            {['kost', 'kontrakan', 'villa', 'penginapan', 'perumahan'].map((item, i) => (
                <button className={item === selected ? styles.selected : null} key={i} onClick={() => setSelected(item)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
            ))}
        </div>
    )
}