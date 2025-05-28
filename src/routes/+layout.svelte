<script lang="ts">
	import '../theme/prism-material-light.css';
	import '../app.css';

	let { children } = $props();
</script>
<svelte:head>
	<title>42th Window</title>
</svelte:head>

<nav class="w-full md:w-10/12 m-[auto] py-5 px-10 mb-10 md:px-20 md:mb-20 text-purple-900 flex justify-between items-end flex-wrap">
	<h1 class="text-left text-2xl"><a href="/" class="">42th window</a></h1>
	<div class="*:underline *:italic">
		<a href="/posts">Posts</a> / <a href="/photos">Photos</a>
	</div>
</nav>

<div class="min-h-[80vh] w-10/12 md:w-8/12 m-[auto]">
	{@render children()}
</div>

<footer class="bg-gray-100 py-5 text-center text-gray-600">
	© 2025 welsea
</footer>
