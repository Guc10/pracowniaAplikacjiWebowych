import styles from "./Posts.module.scss";
import {useEffect, useState} from "react";
import type {Post} from "../../types/Post/Post.ts";
import {Link} from "react-router";

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((json: Post[]) => {
            setPosts(json)
        })
    }, [])

    return (
        <>
            <main className={styles.Main}>
                {posts.map(p => (
                    <div className={styles.PostsPost} key={p.id}>
                        <h5 className={styles.PostsPostTitle}>
                            {p.title.substring(0, 20)}...
                        </h5>
                        <p className={styles.PostsPostBody}>
                            {p.body.substring(0, 50)}...
                        </p>
                        <Link
                            className={styles.PostsPostLink}
                            to={"/post/" + p.id}
                        >
                            Przejdź do wpisu
                        </Link>
                    </div>
                ))}
            </main>
        </>
    )
}