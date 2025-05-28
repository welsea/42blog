<script lang="ts">
	export let title = 'Blog Post';
	export let date = '';
</script>

<!-- <svelte:head>
	<title>{title}</title>
</svelte:head> -->

<article class="prose">
	<header>
		<h1 class="text-3xl">{title}</h1>
		{#if date}
			<div class="meta">
				{#if date}<time>{date.slice(0,10)}</time>{/if}
			</div>
		{/if}
	</header>

	<main class="text-base/7">
		<slot />
	</main>
</article>
