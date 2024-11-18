import { api } from "~/trpc/server";
import Link from "next/link";

export default async function NewPost() {
    const posts = await api.samplePost.getAll();
    if (!posts) {
        return <div>No posts found</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-5xl font-bold">New Post</h1>
            <ul className="grid grid-cols-3 gap-4 w-full max-w-6xl">
                {posts.map((post) => (
                    <div key={post.id} className="border border-white/40 rounded-lg p-4">
                        <h2>{post.text}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </ul>
            <form>
                <button type="submit" className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
                    Create Post
                </button>
            </form>
            <Link href="/" className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
                戻る
            </Link>
        </div>
    );
}
