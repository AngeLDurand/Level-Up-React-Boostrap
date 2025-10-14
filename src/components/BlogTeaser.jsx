import { Link } from "react-router";
import { POSTS } from "../services/blog";
import BlogCard from "./BlogCard";


export default function BlogTeaser() {
    const top = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);
    return (
        <section id="blog" className="py-5 bg-dark text-light border-top border-warning" aria-labelledby="blog-h">
            <div className="container">
                <h2 id="blog-h" className="display-6 text-center text-warning fw-bold mb-4">Blog y noticias</h2>
                <div className="row g-3">
                    {top.map(p => (
                        <div className="col-md-6" key={p.id}>
                            <BlogCard post={p} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
