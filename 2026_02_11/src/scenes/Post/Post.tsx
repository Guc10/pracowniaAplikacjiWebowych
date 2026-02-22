import styles from "./Post.module.scss";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../types/Post/Post";
import type { Comment } from "../../types/Comments/Comment";
import { useParams } from "react-router";

export default function Post() {
    const { id } = useParams<{ id: string }>();

    const {
        data: post,
        isLoading: postLoading,
        isError: postError,
    } = useQuery<Post>({
        queryKey: ["post", id],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
                if (!res.ok) throw new Error("Post not found");
                return res.json();
            }),
        enabled: !!id,
    });

    const {
        data: comments = [],
        isLoading: commentsLoading,
        isError: commentsError,
    } = useQuery<Comment[]>({
        queryKey: ["comments", id],
        queryFn: () =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then((res) => {
                if (!res.ok) throw new Error("Comments error");
                return res.json();
            }),
        enabled: !!id,
    });

    const loading = postLoading || commentsLoading;
    const error = postError || commentsError;

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
                <p>Error loading data.</p>
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