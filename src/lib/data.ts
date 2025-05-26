interface Post {
	title: string;
	date: Date;
	category: string;
	tags: string[];
	slug: string;
}

export async function getAllPosts(): Promise<Post[]> {
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });
	const posts: Post[] = [];
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as any;
			const tags = Array.isArray(metadata.tags) ? [...metadata.tags] : [];
			const post = { ...metadata, tags,slug };
			posts.push(post);
		}
	}
	console.log(posts);
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export async function getTagsCategories() {
	const posts = await getAllPosts();

	const tmptags = new Set<string>();
	const tmpcategories = new Set<string>();

	for (const post of posts) {
		const { tags, category } = post;

		if (tags) {
			tags.forEach((tag: string) => tmptags.add(tag));
		}
		if (category) {
			tmpcategories.add(category);
		}
	}

	return {
		tags: Array.from(tmptags),
		categories: Array.from(tmpcategories)
	};
}
