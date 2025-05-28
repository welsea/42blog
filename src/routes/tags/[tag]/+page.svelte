<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	export let data;
</script>

<PostList title={`TAG: ${data.tag}`} posts={data.posts}/>