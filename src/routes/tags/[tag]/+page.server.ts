import { getAllPosts } from "$lib/data";
export async function load({ params }: { params: { tag: string } }) {
    const tag = params.tag
    const allPosts = await getAllPosts();
    const filtered = allPosts.filter((p) => p.tags.includes(tag));
    return {
        tag,
        posts: filtered,
    };
}
