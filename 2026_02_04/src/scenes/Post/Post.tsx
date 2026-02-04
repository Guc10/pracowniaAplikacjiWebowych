import styles from "./Post.module.scss";
import {useEffect, useState} from "react";
import type {Post} from "../../types/Post/Post.ts";
import {useParams} from "react-router";

export default function Post() {
    const { id } = useParams<{id: string}>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                return response.json();
            })
            .then((json: Post) => {
                setPost(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <main className={styles.Main}>
                <p>Loading...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles.Main}>
                <p>Error: {error}</p>
            </main>
        );
    }

    if (!post) {
        return (
            <main className={styles.Main}>
                <p>Post not found</p>
            </main>
        );
    }

    return (
        <main className={styles.Main}>
            <div>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
        </main>
    );
}