import styles from "./Posts.module.scss";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../types/Post/Post.ts";
import { Link } from "react-router";

export default function Posts() {
    const { data: posts = [], isLoading, isError } = useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: () =>
            fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
                if (!res.ok) throw new Error("Failed to fetch posts");
                return res.json();
            }),
    });

    if (isLoading) {
        return (
            <main className={styles.Main}>
                <p>Loading...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main className={styles.Main}>
                <p>Error loading posts.</p>
            </main>
        );
    }

    return (
        <main className={styles.Main}>
            {posts.map((p) => (
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
    );
}