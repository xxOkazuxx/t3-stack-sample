"use server";

/**
 * 新規投稿に関するServer Actions
 * フォームの送信処理とデータベースへの保存を担当
 */
import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";

/**
 * 新規投稿を作成するServer Action
 * @param formData - フォームから送信されたデータ
 * @throws {Error} タイトルまたは内容が空の場合、または投稿作成に失敗した場合
 */
export async function createPost(formData: FormData) {

    const text = formData.get("text") as string;
    const content = formData.get("content") as string;

    if (!text || !content) {
        throw new Error("タイトルと内容は必須です");
    }

    try {
        await api.samplePost.addPost({
            text,
            content,
        });

        // 投稿作成後にページを再検証
        revalidatePath("/new-post");
    } catch (error) {
        console.error("投稿作成エラー:", error);
        throw new Error("投稿の作成に失敗しました");
    }
} 