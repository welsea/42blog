import { getAllPosts, getTagsCategories } from '$lib/data';
export async function load() {
	const posts = await getAllPosts();
	// const { tags, categories } = await getTagsCategories();
	return {
		posts
	};
}
