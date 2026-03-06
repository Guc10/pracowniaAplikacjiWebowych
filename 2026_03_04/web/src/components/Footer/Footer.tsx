import styles from  './Footer.module.scss'

export default function Footer(){
    return (
        <footer className={styles.Footer}>
            <p>© {new Date().getFullYear()} guc10</p>
        </footer>
    )
}