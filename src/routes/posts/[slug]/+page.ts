export async function load({ params }) {
	const post = await import(`../../../posts/${params.slug}.md`);
	return {
		PostContent: post.default,
	};
}
