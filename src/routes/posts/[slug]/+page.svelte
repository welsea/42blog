<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	export let data: {
		PostContent: typeof SvelteComponent;
	};
	const { PostContent: Post } = data;
</script>
<Post />
