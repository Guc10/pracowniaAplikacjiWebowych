import styles from "./Header.module.scss";

export default function Header() {
    return (
        <header className={styles.Header}>
            <a href={"/"}>_home</a>
            <a href={"/posts"}>_posts</a>
        </header>
    )
}