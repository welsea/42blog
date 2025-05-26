<script lang="ts">
	import '../theme/prism-material-light.css';
	import '../app.css';

	let { children } = $props();
</script>

<nav class="w-full px-20 py-5 text-purple-900 flex justify-between items-end">
	<h1 class="text-left text-2xl"><a href="/" class="">42th window</a></h1>
	<div class="*:underline *:italic">
		<a href="/posts">Posts</a> / <a href="/photos">Photos</a>
	</div>
</nav>

<main>
	{@render children()}
</main>

<footer class="bg-gray-100 py-5 text-center text-gray-600">
	© 2025 welsea
</footer>
