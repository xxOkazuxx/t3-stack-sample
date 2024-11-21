import { api } from "~/trpc/server";
import { updatePost } from "../../actions";

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await api.samplePost.getPostById({ id: params.id });
    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <>
            <div className="flex gap-4">
                <form action={updatePost} className="flex flex-col gap-4">
                    {/* <input type="text" name="text" value={post.text} className="rounded-lg bg-white/10 px-4 py-2 mb-4" />
                    <input type="text" name="content" value={post.content} className="rounded-lg bg-white/10 px-4 py-2 mb-4" /> */}
                    <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">編集</button>
                    <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">削除</button>
                </form>
            </div>
        </>
    );
}
