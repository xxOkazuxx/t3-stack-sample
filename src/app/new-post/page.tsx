import { api } from "~/trpc/server";
import Link from "next/link";
import { createPost, deletePost } from "./actions";

/**
 * 新規投稿ページコンポーネント
 * 投稿の一覧表示と新規作成機能を提供します
 */
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
                    <Link href={`new-post/posts/${post.id}`} key={post.id}>
                        <div key={post.id} className="border border-white/40 rounded-lg p-4">
                            <h2>{post.text}</h2>
                            <p>{post.content}</p>
                        </div>
                    </Link>
                ))}
            </ul>
            <div className="flex flex-col gap-4 w-full max-w-xl">
                <form action={createPost} className="flex flex-col gap-4 w-full max-w-xl">
                    <input
                        type="text"
                        name="text"
                        placeholder="タイトル"
                        className="rounded-lg bg-white/10 px-4 py-2"
                        required
                    />
                    <textarea
                        name="content"
                        placeholder="内容"
                        className="rounded-lg bg-white/10 px-4 py-2 min-h-[100px]"
                        required
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                    >
                        Create Post
                    </button>
                </form>
                <form action={deletePost} className="flex flex-col gap-4 w-full max-w-xl">
                    <input type="hidden" name="id" value={posts[0]?.id} />
                    <button
                        type="submit"
                        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
                    >
                        Delete Post
                    </button>
                </form>
            </div>
            <Link href="/" className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
                戻る
            </Link>
        </div>
    );
}    
