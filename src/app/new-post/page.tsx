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
                <button type="submit" className="rounded-lg bg-blue-500 px-10 py-3 mt-3 transition hover:bg-blue-600">
                    Create Post
                </button>
            </form>
            <Link href="/" className="border border-white/40 bg-white/50 rounded-lg px-6 py-2 mt-3 text-black">
                戻る
            </Link>
        </div>
    );
}
