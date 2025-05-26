<script lang="ts">
	export let title = 'Blog Post';
	export let date = '';
	export let author = '';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<article class="prose">
	<header>
		<h1 class="text-3xl text-red-500">{title}</h1>
		{#if date || author}
			<div class="meta">
				{#if date}<time>{date.slice(0,10)}</time>{/if}
				{#if author}<span class="author">by {author}</span>{/if}
			</div>
		{/if}
	</header>

	<main>
		<slot />
	</main>
</article>

<style>
	.prose {
		max-width: 65ch;
		margin: 0 auto;
		padding: 2rem;
		line-height: 1.6;
	}

	header {
		margin-bottom: 2rem;
		border-bottom: 1px solid #eee;
		padding-bottom: 1rem;
	}

	h1 {
		color: #333;
		margin-bottom: 0.5rem;
	}

	.meta {
		color: #666;
		font-size: 0.9rem;
		display: flex;
		gap: 1rem;
	}

	.author::before {
		content: '• ';
	}
</style>
