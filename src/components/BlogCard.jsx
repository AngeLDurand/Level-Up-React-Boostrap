import { Link } from "react-router";
import { formatDate, readingTime } from "../services/blog";


export default function BlogCard({ post }) {
    return (
        <div className="card bg-black border border-secondary h-100">
            {post.cover && (
                <img src={post.cover} alt={post.title} className="card-img-top" style={{ objectFit: "cover", height: 180 }} />
            )}
            <div className="card-body d-flex flex-column">
                <div className="d-flex gap-2 small mb-2">
                    <span className="badge text-bg-warning">{post.category}</span>
                    <span className="text-secondary">{formatDate(post.date)}</span>
                    <span className="text-secondary">• {readingTime(post.content)}</span>
                </div>
                <h5 className="card-title text-light">{post.title}</h5>
                <p className="card-text text-secondary flex-grow-1">{post.excerpt}</p>
                <div className="d-flex gap-1 flex-wrap mb-2">
                    {post.tags?.map(t => <span key={t} className="badge bg-secondary-subtle text-secondary-emphasis">{t}</span>)}
                </div>

            </div>
        </div>
    );
}
