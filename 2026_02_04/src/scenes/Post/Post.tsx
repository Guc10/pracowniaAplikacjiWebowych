import styles from "./Post.module.scss";
import {useEffect, useState} from "react";
import type {Post} from "../../types/Post/Post";
import type {Comment} from "../../types/Comments/Comment"
import {useParams} from "react-router";

export default function Post() {
    const { id } = useParams<{id: string}>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                return response.json();
            })
            .then((json: Post) => {
                setPost(json);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Comments error')
                }
                return response.json();
            })
            .then((json: Comment) => {
                setComments(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
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
            <div className={styles.PostContent}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>

            <div className={styles.CommentsSection}>
                <h2>Comments ({comments.length})</h2>
                {comments.length === 0 ? (
                    <p className={styles.NoComments}>No comments yet</p>
                ) : (
                    <div className={styles.CommentsList}>
                        {comments.map((comment) => (
                            <div key={comment.id} className={styles.Comment}>
                                <div className={styles.CommentHeader}>
                                    <strong>{comment.name}</strong>
                                    <span className={styles.CommentEmail}>{comment.email}</span>
                                </div>
                                <p className={styles.CommentBody}>{comment.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}