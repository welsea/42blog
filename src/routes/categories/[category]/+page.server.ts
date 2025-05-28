import { getAllPosts } from "$lib/data";
export async function load({ params }: { params: { category: string } }) {
    const category = params.category
	const allPosts = await getAllPosts();
	const filtered = allPosts.filter((p) => p.category === category);
	return {
		category,
		posts: filtered,
	};
}
