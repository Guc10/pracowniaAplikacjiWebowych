import styles from "./Post.module.scss";
import { useEffect, useState } from "react";
import type { Post } from "../../types/Post/Post";
import type { Comment } from "../../types/Comments/Comment";
import { useParams } from "react-router";

const API = 'http://localhost:3000';

export default function Post() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // comment form state
    const [commText, setCommText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    function fetchComments() {
        fetch(`${API}/komentarz/get/post/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load comments');
                return res.json();
            })
            .then((json: Comment[]) => setComments(json))
            .catch(() => { /* comments failing shouldn't block the post */ });
    }

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);

        fetch(`${API}/wpis/get/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Post not found');
                return res.json();
            })
            .then((json: Post) => {
                setPost(json);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

        fetchComments();
    }, [id]);

    async function handleAddComment() {
        if (!commText.trim()) {
            setFormError('Comment cannot be empty');
            return;
        }
        setFormError(null);
        setSubmitting(true);
        try {
            const res = await fetch(`${API}/komentarz/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comm: commText, wpisId: id }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? 'Failed to add comment');
            }
            setCommText('');
            fetchComments();
        } catch (err: any) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <main className={styles.Main}><p>Loading...</p></main>;
    }

    if (error) {
        return <main className={styles.Main}><p className={styles.Error}>Error: {error}</p></main>;
    }

    if (!post) {
        return <main className={styles.Main}><p>Post not found</p></main>;
    }

    return (
        <main className={styles.Main}>
            <div className={styles.PostContent}>
                <h1>{post.Title}</h1>
                <p>{post.Body}</p>
            </div>

            <div className={styles.CommentsSection}>
                <h2>Comments ({comments.length})</h2>

                <div className={styles.CommentForm}>
                    <textarea
                        className={styles.Textarea}
                        placeholder="Write a comment..."
                        rows={3}
                        value={commText}
                        onChange={e => setCommText(e.target.value)}
                    />
                    {formError && <p className={styles.Error}>{formError}</p>}
                    <button
                        className={styles.Button}
                        onClick={handleAddComment}
                        disabled={submitting}
                    >
                        {submitting ? 'Posting...' : 'Add Comment'}
                    </button>
                </div>

                {comments.length === 0 ? (
                    <p className={styles.NoComments}>No comments yet</p>
                ) : (
                    <div className={styles.CommentsList}>
                        {comments.map(comment => (
                            <div key={comment.id} className={styles.Comment}>
                                <p className={styles.CommentBody}>{comment.Komentarz}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}