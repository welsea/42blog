<script lang="ts">
	export let data;

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<h1>Writing</h1>

<div>
	{#if data.posts.length > 0}
		<div class="posts-grid">
			{#each data.posts as post}
				<article class="post-card w-8/12 m-[auto]">
					<div class="post-content flex border-b border-purple-500 border-dashed ">
						{#if post.category}
							<div class="w-2/12 text-purple-800">{post.category}</div>
						{/if}
						<div class="w-8/12">
							<a href="/posts/{post.slug}">{post.title}</a>
							{#if post.tags}
								<div class="tags italic font-thin">
									{#each post.tags as tag}
										<span class="pr-2">#{tag}</span>
									{/each}
								</div>
							{/if}
						</div>

						<time class="w-2/12" datetime={post.date.toString()}>
							{formatDate(post.date.toString())}
						</time>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="no-posts">
			<h2>No posts yet</h2>
			<p>Check back later for new content!</p>
		</div>
	{/if}
</div>