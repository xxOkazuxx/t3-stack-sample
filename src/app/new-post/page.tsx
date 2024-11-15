import { api } from "~/trpc/server";

export default async function NewPost() {
    const posts = await api.samplePost.getAll();
    if (!posts) {
        return <div>No posts found</div>;
    }

    return (
        <div>
            <h1>New Post</h1>
            <ul>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h2>{post.text}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}
