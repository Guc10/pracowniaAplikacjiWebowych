import styles from "./Posts.module.scss";
import { useEffect, useState } from "react";
import type { Post } from "../../types/Post/Post";
import { Link } from "react-router";

const API = 'http://localhost:3000';

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // form state
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [katId, setKatId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    function fetchPosts() {
        setLoading(true);
        fetch(`${API}/wpis/get`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load posts');
                return res.json();
            })
            .then((json: Post[]) => {
                setPosts(json);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    async function handleSubmit() {
        if (!title.trim() || !body.trim() || !katId.trim()) {
            setFormError('All fields are required');
            return;
        }
        setFormError(null);
        setSubmitting(true);
        try {
            const res = await fetch(`${API}/wpis/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, body, KatId: katId }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? 'Failed to create post');
            }
            setTitle('');
            setBody('');
            setKatId('');
            fetchPosts();
        } catch (err: any) {
            setFormError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className={styles.Main}>
            <section className={styles.NewPost}>
                <h2>New Post</h2>
                {formError && <p className={styles.Error}>{formError}</p>}
                <div className={styles.Form}>
                    <input
                        className={styles.Input}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        className={styles.Textarea}
                        placeholder="Body"
                        rows={4}
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                    <input
                        className={styles.Input}
                        type="number"
                        placeholder="Category ID"
                        value={katId}
                        onChange={e => setKatId(e.target.value)}
                    />
                    <button
                        className={styles.Button}
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? 'Saving...' : 'Add Post'}
                    </button>
                </div>
            </section>

            <section className={styles.PostsList}>
                <h2>All Posts</h2>
                {loading && <p>Loading...</p>}
                {error && <p className={styles.Error}>Error: {error}</p>}
                {!loading && !error && posts.length === 0 && <p>No posts yet.</p>}
                {posts.map(p => (
                    <div className={styles.PostsPost} key={p.id}>
                        <h5 className={styles.PostsPostTitle}>
                            {p.Title.length > 40 ? p.Title.substring(0, 40) + '...' : p.Title}
                        </h5>
                        <p className={styles.PostsPostBody}>
                            {p.Body.length > 80 ? p.Body.substring(0, 80) + '...' : p.Body}
                        </p>
                        <Link className={styles.PostsPostLink} to={"/post/" + p.id}>
                            Przejdź do wpisu
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    );
}