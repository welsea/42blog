import { getAllPosts } from '$lib/data';
export async function load() {
    const posts = await getAllPosts();
    return {
        posts
    };
}
