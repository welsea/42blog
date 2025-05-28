<script lang="ts">
	import { formatDate } from '$lib/utils.js';
	export let title:string;
    export let posts:any
    export let desc:string ='';
</script>

<h1 class="pb-10 text-center">{title}</h1>

{#if desc!==''}
<div class="text-center mb-10 italic">{desc}</div>
{/if}

<div>
	{#if posts.length > 0}
		<div>
			{#each posts as post}
				<article class="post-card md:w-10/12 m-[auto]">
					<div class="post-content py-2 my-5 flex flex-wrap flex-col md:flex-row border-b border-purple-700 border-dashed *:py-1 md:py-0">
						{#if post.category}
							<div class="w-full md:w-2/12 text-color-heavy text-sm hover:underline hover:underline-offset-2">
                                <a href={`/categories/${post.category}`}>{post.category}</a>
                            </div>
						{/if}
						<div class="w-full md:w-8/12">
							<a href={`/posts/${post.slug}`}>{post.title}</a>
							{#if post.tags}
								<div class="text-color-light italic font-thin text-sm">
									{#each post.tags as tag}
										<span class="pr-2 hover:underline">#<a href={`/tags/${tag}`}>{tag}</a></span>
									{/each}
								</div>
							{/if}
						</div>

						<time class="w-full text-right md:text-center md:w-2/12 text-sm text-color-light" datetime={post.date.toString()}>
							{formatDate(post.date.toString())}
						</time>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="no-posts">
			<h2>No posts yet</h2>
		</div>
	{/if}
</div>